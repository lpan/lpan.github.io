---
layout: post
title:  "What I learnt from coding a text editor in C"
date:   2017-08-19
comments: true
categories: programming
---

# Background

As a modern JavaScript developer, I have worked on numerous single page
applications with various technology stacks.  I know enough of those
technologies to be productive. I learned the best practices and learned when to apply
them. I tried to stay on the cutting-edge and adopt new programming patterns
early.  However, I was never confident to say that I understand `[insert state
mangement library name here]`. I know how to use them but I did not know why to
use them. Until I started to work on `viw`.

For those of you who have never heard of `viw`, make sure to check it out,
[github.com/lpan/viw](https://github.com/lpan/viw). It is a VI-like,
terminal-based text editor written in C. I implemented `Undo & Redo` with an
event-sourcing inspired algorithm and I applied the data-driven programming
pattern. Feel free to read the source. A star would be greatly appreciated as
well. :)

In this blog post, I want to discuss the lessons I learnt from implementing
`viw` and how are they related to modern front end development. I also want to
briefly talk about the `Unidirectional UI` pattern.

<br />
# Introduction

It is all about working with constraints. In C, it is hard to find recipes for
stuff that you want to do. Libraries and frameworks like Redux that force you
to employ a particular design pattern simply do not exist.  As a result, when I
was working on `viw`, I was forced to make many seemingly trivial decisions on
my own: `when do I trigger an update to the UI?`, `how should I categorize those
functions?`, `how should I name this file?`. As I am adding more features to the
project, I have to constantly refactor, change internal APIs and move stuff
around.

Here are two big refactorings I have done:
* [Improve function reusability](https://github.com/lpan/viw/pull/5)
* [Model mutations as commands for Redo & Undo](https://github.com/lpan/viw/pull/9/).

Interestingly, as the project grows bigger and as I make more incremental
adjustments, the application architecture ends up becoming something that is
very similar to the modern `unidirectional UI architecture`. The app has an
infinite loop that captures all the keyboard events.  Depending on the current
state of the editor, these keyboard events are mapped to a series of functions
(I call them mutations) that make changes to the application state—the single
source of truth. After all the mutations are done, It recalculates all the
`computed properties` (eg. cursor position) based on the new state, and pass them
to ncurses to render the new output on the terminal.  Then, the application
waits for the next keyboard event.  Recently I added `Undo & Redo`
functionality. Inspired by `event sourcing`, I refactored `mutations` such that
each of them is modelled as a `command` that can be stored in a log. I can pop
the log to accomplish `undo` and re-add the command back to the log to
accomplish `redo` (the actual implementation is slightly more complex).

`viw` helped me understand what UI development is really about. It is not like
programming a compiler which "simply" takes an input and spits out an output.
When you are programming an UI, your app has to **react** to `events`. The
events can be initiated from a user, a websocket subscription or a returning
AJAX request.  Then, according to the event as well as the current state of the
UI, your app will produce a series of resulting effects to address the incoming
event.  In other words, UI programming is about **mapping incoming events to a
series of effects**.

<br />
# A Simple Example

Sounds confusing? Let's walk through a concrete example.

Consider a simple Todo application. Our user is able to see a list of all the
active todo entries as well as their total **count**. In addition, she is able
to **add** new entries.

![og todo app](/assets/img/2017-08-19-todoapp.png)

As front end developers, the first thing we should do when given a problem like
this is to identify what the **incoming events** are.

1. User **clicks** on the "add todo" button.
2. User **enters** a character into the input field

Now we have identified all the incoming events, what's next?

Remember
> UI programming is about mapping incoming events to a series of effects.

To implement this simple Todo app, our goal is to map `#1` and `#2` to
**a series of effects that responds** to them!

According to the specifications of our todo app, `#1` should be mapped to

*if the body of the input field is not empty*
* increment the total todo count.
* draw the new todo entry on the UI.

*if the body of the input field is empty*
* draw "PLEASE AT LEAST ENTER SOMETHING" with an angry emoji in red right below
  the input box.

See the conditional statement ;)? This is why I said
> According to the event **as well as** the current state of the UI...


<br />

`#2` should be mapped to

*if the key pressed is a backspace and the input field is not empty*
* erase the last character in the input field

*if the key pressed is a backspace and the input field is empty*
* do nothing

*if the key pressed is a valid character*
* draw the character on the input field

As long as you have those two mappings implemented, you will get a working todo
application.

<br />
# What About the Unidirectional UI Pattern?

If you want to implement the todo app with imperative programming, you will
model each of the *programmatic effects* as an impure function. In pseudo code,
it will look something like this:

```
function handleAddTodo(todoText: String) {
  if (!todoText) {
    renderError!
  }
  
  else {
    incrementCounter!
    renderNewTodo!(todoText)
  }
}

function handleKeyboardEvent(c: char) {
  if (c == backspace) {
    deleteChar!
  }

  else {
    renderChar!(c)
  }
}
```

This is bad because:

* Multiple sources of truth => will result in invalid UI states.
* Hard to implement `computed properties`.
* Hard to test (functions are not pure).

Unidirectional UI pattern is an attempt of **data-driven programming** in the UI
world. Instead of making a series of effects right away in respond to the incoming
events, we do data transformation first. Then we emit all the effects based on
the newly transformed data (push effects to the edges). In other words, instead
of *do incrementCounter!* and then *do renderNewTodo!*, we "mutate" a data
structure (let's call it the *application state*), then according to the new
state, we emit all the effects.

```
// without a persistent data structure

state = {
  todos: ['eat pizza', 'drink water']
  error: nil
  newTodoField: 'I am a new todo'
}

function handleAddTodo(state) {
  if (!newTodoField) {
    state.error = 'Empty field!'
  }

  state.todos.push(state.newTodoField)
  state.newTodoField = nil

  return state;
}

function handleKeyboardEvent(state, c: char) {
  if (c == backspace) {
    if (!state.newTodoField) {
      return
    }
    state.newTodoField.pop()
  }

  else {
    state.newTodoField.push(c)
  }

  return state;
}

// effects
renderTodo!(state) {
  renderCount!(state.todos.length)
  renderTodos!(state.todos) // react is gonna take care of it LOL
  renderError!(state.error)
}

while (true) {
  event = getEvent // blocking
  if (event.type == AddTodoButtonClicked) {
    state = handleAddTodo(state)
  }

  else if (event.type == KeyPressed) {
    state = handleKeyboardEvent(state, event.payload)
  }

  renderTodo!(state)
}
```

With this pattern, we get the benefits of functional programming:
* Pure functions (with persistent data structures) => easy unit tests.
* Predictable states.
* And more!

<br />
# Conclusion
Unidirectional UI is an attempt to bring data-driven programming to the UI
world. Disagree with me? Feel free to leave a comment below!

**Edit 2017-08-29:** This article has been discussed on [Hacker
News](https://news.ycombinator.com/item?id=15115874) and
[r/programming](https://www.reddit.com/r/programming/comments/6w9qxj/what_i_learnt_from_coding_a_text_editor_in_c/).
Thanks to @mxstbr and @wowamit for submitting it. :)
