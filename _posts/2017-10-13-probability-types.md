---
layout: post
title:  "Probability and Types"
date:   2017-10-13
comments: true
categories: math
---

# Introduction

In this blog post, I will explain the concept of a `Random Variable` from a
software developer's perspective.

# Definitions

Before we dive in, I want to define a few terminologies, for those of you who
are new to probability and statistics. Feel free to skip this section if you
think you are too cool for this.

#### Experiment

An *experiment* is an experiment... What would you do if you are asked to test
if a coin is fair? I would flip the coin 1000 times and see if the counts of
*head* and *tails* are equal. If *head* occurs only 300 times and *tail* occurs
700 times, you probably can conclude that the coin is not fair!

So what is an experiment? In the context of the example described above,
`flipping the coin 1000 times` is an `Experiment`.

#### Trial

A trial is one coin flip. The coin-flip experiment above consists of 1000
trials!

#### Outcome

An `outcome` is one possible outcome of a `trial`. As for the coin-flip
experiment, the outcome of the trial is either *head* or *tail*.

#### Sample space

A `sample space` is a [set](https://en.wikipedia.org/wiki/Set_(mathematics)) of
all possible `outcomes` of the experiment. Assume we only perform 3 trials for
our coin-flip experiment. The `sample space` will be `{ HHH, HHT, HTH, HTT, THH,
THT, TTH, TTT }`, where `H` denotes *head* and `T` denotes *tail*.

# Cool stuffs

So, I learnt about a thing called `Random Variable` this week in an introductory
statistics course I am taking at the moment. According to the lecture note, a
`random variable` is both a function and a variable. It can be assigned to a
value and it also defines the mapping of an `outcome` in the `sample space` to a
value.

For example, let's consider the coin-flip example. We can define a `Random
Variable` *X* to be a function that takes an outcome of the **experiment** and
returns the count of *heads*.

eg.
```
X(HHH) = 3
X(HTH) = 2
X(THH) = 2
X(TTT) = 0
```

Now, let's define another term called `Range`. The `Range` of a `Random
Variable` function is a set that contains all possible outputs of the function.
Let's go back to our coin-flip experiment that consists of only three trials.
The `Range` of the `Random Variable` *X* we defined above will be `0, 1, 2, 3`.
It cannot be larger than three since there are only 3 trials and it cannot be
negative because monkeys like bananas.

If you understand static typing, the following snippet may be helpful. If you
don't, TOO BAD!

```
type Outcome = Head | Tail;
type ExperimentOutcome: (Outcome, Outcome, Outcome)
type Range = 0 | 1 | 2 | 3 | 4
type myRandomVar = (Outcome) => (Range)
val sampleSpace: Array[ExperimentOutcome] = { ... }
```

What if you want to select a subset of the `sample space` that satisfies a value
of our random variable?

For example, how do you select a subset of the sample space such that the subset
contains only outcomes that contain exactly two heads.

You can just do

```
sampleSpace.filter (event) => X(event) == 2
```

Isn't it neat?

Thanks for reading LOL
