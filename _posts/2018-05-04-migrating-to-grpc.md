---
layout: post
title:  "All aboard the gRPC train"
date:   2018-05-22
comments: true
categories: programming
---

# Introduction

During my internship at Datadog this past winter, I took ownership of a critical
service which serves around 40,000 requests per second as of April 2018.

To improve its reliability and fault tolerance, I migrated the service’s
inter-process communication (IPC) layer from Datadog’s homegrown remote
procedure call (RPC) framework to gRPC, an open-source RPC framework made by
Google.

In this post, I will discuss why it was worth the effort to migrate to gRPC and
how gRPC increases fault tolerance.

# Context

Datadog’s infrastructure consists of numerous single-purpose services. Each
service can be scaled horizontally to increase its throughput and the instances
of the services are tied together by inter-process communication (IPC)
protocols.

The service I will be discussing is deployed on more than 200 instances and it
is consumed by approximately 500 other instances. It comes with a client
library. Consumers of this service can simply use this client library to issue
RPCs without worrying about service discovery, (client-side) load balancing,
generating stub, error handling, etc.

# The Old Framework

Originally, consumers communicate with the service using an in-house RPC
framework. It was built on top of the Redis protocol for its rich ecosystem and
mature tooling. This made sense when sense years ago when Datadog’s
infrastructure was not as complex or extensive.

However, the framework is not optimized for large-scale distributed systems. In
a distributed system, network is never reliable and nodes can fail unpredictably
and independently due to hardware faults or human errors. Reliable software
tolerates faults. The in-house RPC framework, however, does not provide any
mechanism to make the inter-process communication more reliable.

# Unreliable Health Check

A service registry is essentially an *eventually consistent* snapshot of the
current state of the system. It should absolutely not be regarded as the *only*
source of truth.

For example, when a node suddenly becomes unresponsive (the process gets `pkill
-9`'ed, running out of file descriptors, etc), assuming the service registry
performs Time to Live (TTL) health checks, the registry has to wait for the TTL
timeout to expire, which can take seconds, before marking the node as dead, and
eventually propagating the change to its consumers. The system can be in
an inconsistent state.

When a consumer of a service retrieves a list of "healthy" nodes from the
registry, the list could contain false-positive, already-dead nodes. The
question then arises: how to ensure RPCs to only be sent to actually healthy
nodes?

# Transient Errors vs Fatal Errors

This is where the legacy RPC framework falls short. The framework is unable to
identify the type of the fault that caused the RPC to fail. The fault could be
transient, which means that if the client waits a bit and retries, the RPC will
succeed. On the other hand, the failing RPC can also be caused by a *fatal
error*. This signifies that the destination node may be dead. When a fatal error
is identified, the client should send the RPC to another node, instead of
retrying on the same node.

Fatal failures include server resource exhaustion (a server instance being
overloaded so we might want to retry on a different node), node failures, etc.

Just to add a side note here: a resource exhaustion can also be a transient
failure. For example, let's say your server owns the database resource. If the
replica (a resource) it has been talking to fails, the server will retry on a
different replica. Although it is a fatal failure for the server, from the
client's perspective, it is a transient failure. Clients can still send requests
to the same server.

# Poor Error Handling

Now, let's go back to the old framework. Since it was not built for distributed
systems, being able to identify the cause of a RPC failure and handle it
accordingly are very difficult. (That's why people say programming distributed
systems is hard! This problem would be trivial if everything happens in memory)

As a result, the legacy RPC framework simply sends the failed RPC to another
random node from the (eventual consistent) service registry with no specific
error handling.

This approach can lead to many problems. For example, client can run out of
server-wide retry budget quickly. We use consistent-hashing as the client-side
load balancing algorithm. If a node fails (regardless the error is fatal or
transient), all the RPCs that are hashed to that node will fail on the first
attempt, and then retry.

In addition, if there are more than one false-positive nodes returned from the
service registry (eg. when doing a rolling restart), the second attempt (the
retry) may fail as well.

# Fault Tolerance

Let's say the service registry returns `n` "healthy" nodes, and among them,
there are `x` false-positive nodes. Assume we use the old
*retry-on-a-different-node* error handling algorithm and assume that we balance
the load randomly. The probability of the client to send a RPC to a bad node is
`x / m`.

The client will then retry on a different node. Now, the probability to hit
another bad node becomes `(x - 1) / (m - 1)`. On `k`th retry, the probability
becomes `(x - k) / (m - k)`.

If you are good at math, you will quickly see that if our retry budget is
greater than `x` (assume `x < m`), we can guarantee that all the RPCs will
eventually succeed.

In other words, our system's fault tolerance is linearly dependent on the retry
budget––the total number of failed node the system can tolerate literally is
*equalled* to the retry budget. This is clearly not scalable because retries are
expensive.

Having an aggressive retry strategy can result in server resource exhaustion
which can then leads to [cascading
failures](http://landing.google.com/sre/book/chapters/addressing-cascading-failures.html).
On the other hand, conservative retries can exhaust client's resource (because
of back-offs and jitters) which limit the throughput per instance.

A fault tolerant system does not only minimize errors but also minimize
retries.

# Node Outages

A node can fail (become Unresponsive) in many different ways: it can be shut
down by the administrator for system maintenance; it can be exhausted of system
resources (memory, file descriptors).

Another complexity introduced by distributed systems. When a node fails, its
consumers will only see it as *unresponsive*, until the health check service
thinks it is dead (through TTL, health endpoint checking, etc).

This makes node outage one of the trickiest cases to handle. For example, after
the TCP handshake has been completed and the client has sent the request payload
to the server, if the server node suddenly fails before it can respond to the
RPC, the client may hang indefinitely. Although the server is dead, from the
client’s perspective, the server may be processing a time-consuming query. In
other words, there is no way for the client to identify the cause of an
unresponsive node.

One of the common solutions is to set a RPC deadline based on the expected
response time, which is typically estimated from the size of the request
payload. If the deadline is exceeded, we can be confident to assume that the
server is faulty. This distinguishes infrastructure faults from application
faults. However, it is impossible to implement this functionality in the old RPC
framework.

# gRPC Comes to the Rescue

gRPC is a remote procedure call framework developed at Google. It has been
adopted at many organizations including Netflix and Square.

Similar to the homegrown RPC framework, it exposes an API to generate stubs,
integrate with the existing service discovery system, etc. But different from
the legacy framework, gRPC is optimized for large-scale distributed systems. It
has a huge emphasis on reliability and fault tolerance.

# Connection Management

Instead of treating the service registry as the absolute source of truth, the
gRPC client library implements a connection state manager to maintain a pool of
guaranteed healthy connections (sorta like a circuit breaker).

On initialization, the gRPC client library instantiates a state machine for each
node returned from the service registry. The initial state for all the nodes is
`IDLE`. If the gRPC client successfully establishes an connection (completes the
TCP handshake** to the target node, it will transition the connection state to
“READY”. If the connection request is rejected or the connection is detected to
be faulty, the connection state will be transitioned to `TRANSIENT FAILURE`.
When a `TRANSIENT_FAILURE` connection is reestablished, it will be transitioned
back to `READY`.

Source: [gRPC Connectivity Semantics and
API](https://github.com/grpc/grpc/blob/master/doc/connectivity-semantics-and-api.md)

This way, especially with consistent hashing, when the gRPC client detects that
a node is in `TRANSIENT_FAILURE` (even though service registry says it's
healthy, but it is unresponsive in real life), gRPC will remove the node from
the list of "buckets". With the presence of failed nodes, this would
significantly reduce the number of retries and even the RPC error rate.

# RPC Deadlines

[Deadlines and timeouts are pretty much the
same...](https://grpc.io/blog/deadlines)

With gRPC, it is also possible to dynamically set a deadline for individual
RPCs. Setting a deadline allows the client to specify how long it is willing to
wait for the server to process its request. This can effectively distinguish
between fatal failures and long running queries.

We can estimate the maximum response time for a particular type of query with a
certain payload size. Then we can derive the timeout (max time the client is
willing to wait for the server) from it. Thus, when a RPC failed because the
timeout is exceeded (or deadline is expired), we are confident (98% sure) to say
that the server is faulty (overloaded or dead) and we may want to retry on a
different server node.

# Application-Level Keepalive

In addition to the configurable RPC deadlines. gRPC also implements a
application-wide keepalive protocol, which further increases the fault tolerance
to failed or unresponsive nodes.

For example, if the server appears to be unresponsive for a certain length of
time, the application-level keepalive, also known as the gRPC keepalive, will be
activated. The gRPC client will send a keepalive ping to the server. If the
server does not respond on time, the client will terminate the connection and
transition the state of that connection to “TRANSIENT_FAILURE” to remove it from
the healthy connection pool.

This distinguishes infrastructure faults from application faults. In the case of
a long-running RPC, the server will be able to reply to the keepalive ping so
the client may wait longer. On the other hand, if the server is dead, the client
can be confident to terminate the TCP connection and retry the RPC on a
different node.

# Gains

It is hard to measure resiliency gains (can't really say I increase the
resiliency by `34.5%` or decrease the number of future outages by `(45 - 4i)%`
it is a complex number because it is in the future?). However, there is in fact
one notable gain, faster deployment!

# Faster Deployment

Deploying a service typically requires all its instances to be restarted with a
new binary. However, depending on how stateful is that service, a restart can
result its instances to be unavailable for a length of time. For zero downtime
deploys, instances are typically restarted in batches, so that at a given time,
there are always enough instances that are available to serve requests.

Before gRPC is introduced, the number of node failures, which the system could
tolerate, could not exceed the RPC retry budget. As a result, to minimize
errors, many services had to be restarted one at a time. This is not scalable
because a service’s deployment time becomes linearly dependent on the number of
instances of that service! As for the service I owned at Datadog, with
approximately 200 instances and a 10-second warm-up time, it sometimes can take
more than 30 minutes to deploy!

With the migration to gRPC and the increase in fault tolerance, instances can be
restarted in larger batches, which *significantly* speeds up the deployment time.

# Conclusion

Thanks so much for reading! I talked a bunch about resiliency, fault tolerance,
and the problems with distributed systems! This is also my first distributed
systems post! Previously I have been blogging about UI programming.

Recently I have been reading Martin Kleppmann's [Designing Data-Intensive
Applications](http://dataintensive.net/) and I was fascinated by the distributed
data section. I love learning about the replication algorithms, consistency
models, consensus protocols... Hopefully I can work on another distributed
system for my next internship. And maybe get exposure in distributed data!
