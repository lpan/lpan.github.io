---
layout: post
title:  "All aboard the gRPC train"
date:   2018-05-04
comments: true
categories: programming
---

**WIP: this post is not production ready yet.**

## Introduction

During my internship at Datadog this past winter, I took ownership of a critical
service which serves around 40,000 requests per second as of April 2018.

To improve the reliability and fault tolerance of that service, I migrated the
service’s inter-process communication (IPC) layer from Datadog’s homegrown
remote procedure call (RPC) framework to gRPC, an open-source RPC framework made
by Google.

In this post, I will discuss why it was worth the effort to migrate to gRPC and
how gRPC improves the reliability and availability of that service.

## Context
Datadog’s infrastructure consists of numerous single-purpose services. Each
service can be scaled horizontally to increase its throughput and the instances
of the services are tied together by inter-process communication (IPC)
protocols.

The service I owned is deployed on more than 200 instances and it is consumed by
approximately 500 other instances. It comes with a client library. Consumers of
this service can simply use this client library to issue RPCs without worrying
about service discovery, load balancing, generating stub, error handling, etc.

## Problems

Originally, consumers communicate with the proxy-caching service via an in-house
RPC protocol. It was built on top of the Redis protocol for convenience reasons.
Because of the rich ecosystem around Redis, developers could use open-source
Redis client libraries and tooling instead of reinventing the wheel. This made
sense years ago when Datadog’s infrastructure was not as complex or extensive.

However, this framework is not optimized for large-scale distributed systems. In
a distributed system, the network is never reliable and nodes can fail
unpredictably and independently due to hardware faults or human errors. A
reliable software needs to tolerate faults. The in-house RPC framework, however,
does not provide any mechanism to make the inter-process communication more
reliable.

### Unreliable Health Check

A service registry is essentially an *eventually consistent* snapshot of the
current state of the system. It should absolutely not regarded as the only
source of truth.

For example, when a node suddenly becomes unresponsive (the process is `pkill
-9`'ed, or the VM is shut down), assuming the service registry performs Time to
Live (TTL) health checks, the registry has to wait for the TTL to expire, which
can take seconds, before marking the node as dead. Thus, the system can be in an
inconsistent state.

When a consumer of a service retrieves a list of "healthy" nodes from the
registry, it is possible that there exists already dead nodes in that list. How
to ensure RPCs to only be sent to actually healthy nodes?

This is where the legacy RPC framework falls short. The framework is unable to
identify the type of the fault that caused the RPC to fail. As a result, when an
RPC fails, the legacy RPC framework simply sends the RPC to another random node
from the list with no specific error handling.

This approach is problematic for many reasons. For instance, on an RPC retry,
the probability of the client picking another false-positive node is `(m - 1) /
n`. To avoid RPC failures, m has to be less than the RPC-wide retry budget and
the fault tolerance of the system ends up depending on the RPC-wide retry
budget, which is not scalable.

### Node Outages

A node can fail in many different ways: it can be shut down by the administrator
for system maintenance; it can be exhausted of system resources (memory, file
descriptors).

Node outage is also one of the trickiest cases to handle. For example, after the
TCP handshake has been completed and the client has sent the request payload to
the server, if the server node suddenly fails before it can respond to the RPC,
the client may hang indefinitely. Although the server is dead, from the client’s
perspective, the server may be processing a time-consuming query. In other
words, there is no way for the client to identify the cause of an unresponsive
node.

One of the common solutions is to set a RPC deadline based on the expected
response time, which is typically estimated from the size of the request
payload. If the deadline is exceeded, we can be confident to assume that the
server is faulty. This distinguishes infrastructure faults from application
faults. However, it is impossible to implement this functionality in the old RPC
framework.

## gRPC comes to the rescue

gRPC is a remote procedure call framework developed at Google. It is used
internally at Google and it has been adopted at many organizations including
Netflix and Square.

Similar to the homegrown RPC framework, it exposes an API to generate stubs,
configure service discovery, etc. But different from the legacy framework, gRPC
is optimized for large-scale distributed systems. It has a huge emphasis on
reliability.

### Connection Management

Instead of treating the service registry as the absolute source of truth, the
gRPC client library implements a connection state manager to maintain a pool of
guaranteed healthy connections.

On initialization, the gRPC client library instantiates a state machine for each
node returned from the service registry. The initial state for all the nodes is
“IDLE”. If the gRPC client successfully establishes an connection (completes the
TCP handshake** to the target node, it will transition the connection state to
“READY”. If the connection request is rejected or the connection is detected to
be faulty, the connection state will be transitioned to “TRANSIENT FAILURE”.
When a “TRANSIENT FAILURE” connection is reestablished, it will be transitioned
back to “READY”.

**TODO add a state machine diagram**

### RPC Deadlines

With gRPC, it is also possible to dynamically set a deadline for individual
RPCs. Setting a deadline allows the client to specify how long it is willing to
wait for the server to process its request. This feature enables the system to
tolerate individual node outages by protecting the client from hanging
indefinitely and running out of resources.

### Application-Level Keepalive

In addition to the configurable RPC deadlines. gRPC also implements a keepalive
protocol, which further increases the fault tolerance against failed or
unresponsive nodes.

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

## Results

### Faster Deployments

Deploying a service typically requires all its instances to be restarted with
the new binary. However, depending on how stateful is that service, a restart
can result its instances to be unavailable for a length of time. For zero
downtime deploys, instances are typically restarted in batches, so that at a
given time, there are always enough instances that are available to serve requests.

Before gRPC is introduced, the number of node failures, which the system could
tolerate, could not exceed the RPC retry budget. As a result, to minimize
errors, many services, including the proxy-caching service, had to be restarted
one at a time. This is not scalable because a service’s deployment time becomes
linearly dependent on the number of instances of that service. As for the
proxy-caching service, it has approximately 200 instances and it needs 10
seconds to be warmed up, its deployment sometimes could take more than 30
minutes.

With the migration to gRPC and the increase in fault tolerance, instances can be
restarted in larger batches, which significantly speeds up the deployment time.

# Conclusion

gRPC is designed for distributed systems and it treats fault tolerance as a
first class requirement. Migrating Datadog’s legacy RPC framework to gRPC
unlocked many resiliency patterns and improved the reliability of the overall
system.

This post covered how gRPC’s connection state manager, configurable RPC
timeouts, and application-level keepalive help the proxy-caching service
tolerate unreliable service discovery and independent node outages, without
compromising the existing constraints.
