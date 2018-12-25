---
layout: post
title:  "A front-end developer's fantasy"
date:   2017-06-11
comments: true
categories: programming
---

# A bit of background

It has been a while since I posted my last blog article. Work, gym and side
projects were keeping me busy.

Anyway, I was walking back home earlier today and for some reason (possibly
divine intervention), I started to ponder what is the proper way to design a
front end application so that when it scales, it does not break conceptually
(fancy phrase for 'tech debt' :wink:).


# Real stuffs

You want your users to have a good experience so you decided to build (or
migrate to) a SPA instead of rendering HTML pages on the server. As a trade off,
you now have to deal with data fetching and caching (inb4 graphql), bundle size
optimization (code splitting), SEO optimization, state management and more.
Since many other peeps are scratching their head the same way as you are, many
good, benevolent and not creepy people on the Internet developed cool libraries
to make everyone's life easier. As someone who is sane, you (and many
others) started to use those libraries in your code base.

As a consequence, a typical front end stack went from simply jQuery and CSS to
React (map data to DOM with minimum effort), Redux ('finite' state machine), Webpack
(module bundler, so you can actually test your code), Babel (JavaScript
transpiler thanks to IE and Windows 7 on your grandma's computer), Yarn (inb4
npm 5.0) and many many more.

With the overwhelming number of libraries, it is hard to find experienced
developers (you can't find someone with 5 years of React.js experience when
React.js was released 6 months ago) which makes it extremely easy to make design
mistakes.

Here is the 'ideal' way of structuring/designing a front end application that is
scalable and testable in my dream.


#### React

* Functional components only.
* For local UI state, use `withState` from `recompose`. One state at a time
* Do not derive new props in `render`, everything should be done with selectors
* Take advantage of the high order components pattern

#### Redux

* Redux is a state management lib not a rest api cache management lib!
* Avoid nested reducers.
* Maximize the use of selectors

#### Reselect

* Use Reselect plez so you won't design terrible looking reducers
* Group the selectors according to the reducers they are involved
  * eg. selectors in the `user` directory does not mess with `todoReducer`
  * If a selector touches multiple reducers, think hard. Then put it in
  `rootReducers` directory

#### Data fetching

I am still reading up on graphql :P, please don't judge. I actually did a small
[experiment](https://github.com/lpan/trading-api) on graphql yesterday.

* Keep track of the state of a request
* Make sure each entity has an ID you can refer to
* Relationships
  * REST: `join` the entities then throw it into the cache
  * Graphql: huehuehue you just throw it into the cache I guess


# Conclusion

Thanks for reading! I hope you learnt something and had fun. On a side note, for
those of you who studied electrical/computer engineering, I feel a front end SPA
is literally a digital circuit. Side effects from the DOM that triggers state
transitions are the `inputs`, `Redux` is the finite state machine,
selectors/getters + React are the `combinational logic` that produces the output
(UI) according to the current state.
