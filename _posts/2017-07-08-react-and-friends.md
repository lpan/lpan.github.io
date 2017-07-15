---
layout: post
title:  "Thoughts on React and friends"
date:   2017-07-08
comments: true
categories: programming
---

# Introduction
React truly revolutionized modern UI development. Instead of imperially mutating
the View based on the newly arrived data, React enables us to declare the View
as a function of state `V = f(state)`. In React terms, we call those functions
*components* and thanks to the nature of *functions*, we are able to compose
them and eventually structure our complex UI as a Tree.  Additionally, we can do
neat things such as high order functions on our components (remember, components
are functions!!), react-redux's `connect` is a perfect example.

# React
React claims itself to be a library but not a framework. I agree with this claim
as all it does is providing an unopinionated API so that we can declare our View
as as a function of State. However, it also comes with a state management API
`setState` which, in my opinion, is an opinionated way of managing the
application state.

It is totally feasible to build a relatively complex application without a
*state management* library in React.

Let's say we are making a task management application. We have a list of users
and each user has a list of tasks. Using the above approach, we will store the
entire state (root state) in the root component. Then, we pass the lists of
tasks along with users to `User` components. Afterwards, we pass each individual
task data to `Task` components. Task components will be the leaf nodes in our UI
tree in this case.

There are a few problems with this approach. First of all, due to React's
functional nature, data flows in one direction. The root component needs to pass
mutation functions down to their children. This will result in boilerplate and
obfuscated code. Most importantly, **the shape of your state tree has to match
the shape of your UI tree**. This constraint makes it difficult to model your
application state. But our state is not always a tree, it is most likely a graph
in real life. As for our task management application, let's say we want to
introduce an admin user who can delete other users' tasks. We want to render a
`x` next to a task if the current signed-in user is an admin. With React's state
management API, you will end up passing `isAdmin` down to every single `Task`
component!

# Redux
The biggest problem Redux (and many Flux libraries) solved is that you can model
your application state tree independently from your UI tree. With
`mapStateToProps` and selectors, you can `connect` a node or multiple nodes of
the state tree to a node on your UI tree. In addition to that, Redux enforces a
few rules which introduces a bunch of boilerplate but makes your app easier to
reason about. To name a few,

* `Managed mutations`: All mutations must be requested and it is applied one
  at a time. -> consistent

* `Reducers`: New state is produced by a pure factory function. -> Predictable
  state -> no invalid state.

* `Immutability` -> cool development tools

# Relay/Apollo-client
Redux is cool but it does not provide a solution to handle the data
fetching/caching layer. Developers usually have to develop a custom solution. It
is pretty fun to check out how [different people implement data fetching with
React and Redux](https://github.com/jeromedalbert/real-world-react).

Graphql not only enables us to write descriptive queries but also unlocks the
ability to compose smaller queries (through `fragments`). This allows individual
components to declare the data it needs and Relay will automatically aggregate
them into a single query so that we can fetch the data with one single network
request. This seems to be unrelated to the state management problems Redux is
trying to solve. But if you look at it closely, Relay allows us to not declare
our state data tree **explicitly**. Relay is gonna figure out what does your
state tree look like according to the queries declared by each of your
components. That is pretty neat!


# Conclusion
Single page apps make our users happy but our lives hard. I hope you enjoyed my
two cents on the React ecosystem in 2017. Currently, I am fiddling with Datomic
and om-next. IMO om-next's query language is much simpler than Graphql (familiar
data structure vs a DSL). I am planning to build a side project using those two
technologies and hopefully I will be able to write a blog article about them in
the near future.
