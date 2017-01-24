---
layout: post
title:  "Asynchronous JavaScript"
date:   2017-01-22
comments: true
categories: programming
---

Asynchronous programming is always a pain in the butt for front end developers.
We hate it but we have to use it. In this article, I will give you a high level
overview of asynchronous programming in JavaScript.

# **Before we start**

**Q: Why asynchronous?**

A: Certain operations tend to take seconds to complete (eg. network requests,
disk I/O). Since we don't want to block the main thread while performing those
tasks, we need to execute them in a different thread (make them asynchronous).

**Q: Why is it a pain in the butt?**

A: When your program contains asynchronous code, it becomes vulnerable to
problems such as race conditions(accessing the same variable from different
threads), unreadable code, etc.

One more thing I want to address before we start is that asynchronous
programming can be more tedious without JavaScript's **single-threaded** event
loop design. We should thank Brendan Eich for that.

# **Solutions**

#### **Callbacks**

Passing callbacks to asynchronous functions is pretty straightforward until...

```javascript
// for simplicity sake, this piece of code is not bulletproof
const addOption = (myOption) => (base + '?' + 'option=' + myOption);
const getInfo = (rawData) => rawData.data.info;

const myFirstURL = 'http://example.com/lol'
const mySecondURL = 'http://example.com/lmao'

request(myFirstURL, function (err, data) {
  if (err) {
    // handle error
  }
  const info = getInfo(data);

  // the second request depends on the payload from the first request
  request(addOption(mySecondURL, info), function (err, data) {
    if (err) {
      // handle error
    }
    // ....
  });
});
```

Callbacks are simple and intuitive. However, the async code you write with
callbacks is not. Especially when you are executing a sequence of asynchronous
tasks such that **the next one depends on the result of the previous one** (as
shown above), you get a `callback hell`. Go to
[http://callbackhell.com/](http://callbackhell.com/) for more info ;).

#### **Promises**

That's why people invented a high level API called `Promise`. Promise itself is
less intuitive than callbacks but it greatly improves the readability of your
code. A typical implementation of a sequence of asynchronous operations with
promises looks like this:

```javascript
// for simplicity sake, this piece of code is not bulletproof
const addOption = (myOption) => (base + '?' + 'option=' + myOption);
const getInfo = (rawData) => rawData.data.info;

const requestWithPromise = (url) => new Promise((fulfill, reject) => {
  request(url, (err, data) => {
    if (err) {
      reject(err.message);
    }
    try {
      fulfill(JSON.parse(data));
    } catch (e) {
      reject(e.message);
    }
  });
});

const myFirstURL = 'http://example.com/lol'
const mySecondURL = 'http://example.com/lmao'

requestWithPromise(myFirstURL)
  // Promises can be chained
  .then(data => requestWithPromise(addOption(mySecondURL, getInfo(data))))
  .then(console.log)
  .catch(handleError);
```

Promises provide a more abstract API which may result in a slightly steeper
learning curve for some people, but they definitely make your code much cleaner.

You can also execute multiple async tasks at once with `Promise.all` or
`Promise.race`.  Read up on them at
[MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise)

#### **Generators**

ES6 did not only give us `Promise` but also `Generators`. You can read more
about generators
[here](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/function*).

In short, generators are functions that can be *paused* and *resumed*. When a
generator function is called, instead of executing the body of the function, it
returns a `generator object`. If you come from a functional programming
background, you may find that `generator` provides an excellent API to implement
`lazy evaluation`! In fact, we also can take advantage of its pause-and-play
nature to perform async operations. However, it may not be as intuitive at
first.

There are many different approaches to implement async with generators. Here is
a naive one:

```javascript
const addOption = (myOption) => (base + '?' + 'option=' + myOption);
const getInfo = (rawData) => rawData.data.info;

function requestWithGenerator(url) {
  request(url, (err, data) => {
    gen.next(JSON.parse(data));
  });
};

const myFirstURL = 'http://example.com/lol'
const mySecondURL = 'http://example.com/lmao'

function* myGen() {
  const result = yield requestWithGenerator(myFirstURL);
  const finalResult = yield requestWithGenerator(
    addOption(mySecondURL, getInfo(data))
  );

  console.log(finalResult);
}

const gen = myGen();
gen.next();
```

There are a couple of things you should know to understand what is happening:

* Generator functions pause at the statements that contain `yield`;
* When you call `gen.next()`, the generator object will evaluate the current
  `yield` statement and returns the *yielded* value. It will continue evaluating
  until it encounters the next `yield` statement.
* **we can pass information in and out of the generator** using *next()*.

For example,

```javascript
// passing info in
function* myGen() {
  const myVar = yield;
  console.log(myVar);
}

const gen = myGen();
gen.next('hello!'); // wlil print 'hello!' to stdin.
```

```javascript
// passing info out
function* myGen() {
  yield 'hello!';
}

const gen = myGen();
console.log(gen.next().value); // will print 'hello!' to stdin.
```

* Calling `.next(undefined)` on `yield undefined` does **not** resume the
  generator function!

eg.

```javascript
function genA() {
  yield undefined;
  console.log('I will never be evaluated :(');
}

const a = genA();
a.next(undefined); // {value: undefined, done: false}
a.next(undefined); // {value: undefined, done: false}
a.next(undefined); // {value: undefined, done: false}
// ...
```


Now we go back to the async generator implementation. We first initialize a
generator object by calling the generator function `myGen`. Then, we call
`.next()` to evaluate the `yield` statement and make our first request. Since
`requestWithGenerator` returns *undefined*, our generator is still paused.  When
our first request is done, it passes the request payload back into the generator
function by calling `next()` and tells our generator to resume (That's also why
I say this is a *naive* example since we introduced a *circular require* here).
Then we are able to make our second request with the payload from the first one!
Similarly, our function is paused until the second request is done.

Although, generators are even more obfuscated than Promise, one huge advantage
of using it over Promise is that, async code written with generators looks like
**synchronous code**.

And that's why people proposed `async` and `await` to be added in `ES7`.


#### **async & await**

The purpose of this article is to give you a high level overview of asynchronous
programming in JavaScript. Thus, I won't go too much in depth. However, *async &
await* are so interesting that I want to write a blog article dedicated to them
alone!

*async & await* have the simplicity of `Promises` and the synchronous look of
`generators`. Currently, *async & await* is still an experimental feature.  You
need to enable them by passing a harmony flag `--harmony-async-await` to node.

eg. `node --harmony-async-await app.js`

Our Callback hell alternative implementation with *async* & await will look like
this:

```javascript
const addOption = (myOption) => (base + '?' + 'option=' + myOption);
const getInfo = (rawData) => rawData.data.info;

const requestWithPromise = (url) => new Promise((fulfill, reject) => {
  request(url, (err, data) => {
    if (err) {
      reject(err.message);
    }
    try {
      fulfill(JSON.parse(data));
    } catch (e) {
      reject(e.message);
    }
  });
});

const myFirstURL = 'http://example.com/lol'
const mySecondURL = 'http://example.com/lmao'

async function main() {
  let data, result;
  try {
    data = await requestWithPromise(myFirstURL);
    result = await requestWithPromise(addOption(mySecondURL, getInfo(data)));
  } catch (e) {
    console.error(e.message);
  }

  console.log(result);
}
```

That's it! Our code is intuitive, synchronous-looking and boilerplateless! One
interesting observation is that you still need to use `Promise` as we *await* on
them. In other words, *async & await* in JavaScript is built on top of Promises.
This leads to an even more interesting observation. I am not a Pythonista but I
learnt that *async & await* also exist in Python and their purpose is to
simplify the API of the *asyncio* library. In Python, *asyncio* is built on top
of generators! So how *async & await* in Python different from the ones in
JavaScript? In my next article, I will be comparing and contrasting *async &
await* in the two languages.

There are also many other cool ways of writing async code in JavaScript. One of
the most well-known ones that I have not covered is *Observables* from
*ReactiveX*. They are similar to `Promises` but much much more powerful. You
definitely should [read up on
it](http://reactivex.io/rxjs/manual/overview.html#introduction) if you are
interested!

Thanks for reading :)
