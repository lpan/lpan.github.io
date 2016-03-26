import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import Home from './pages/home/Home';
import Portfolio from './pages/portfolio/Portfolio';
import Resume from './pages/resume/Resume';

import AboutIndex from './pages/about/index';
import About from './pages/about/About/About';
import ShortBio from './pages/about/ShortBio/ShortBio';
import FunFacts from './pages/about/FunFacts/FunFacts';

const routes = (
  <Route path="/" component={App} >
    <IndexRoute component={Home} />
    <Route path="About" component={AboutIndex}>
      <IndexRoute component={About} />
      <Route path="Bio" component={ShortBio} />
      <Route path="Fun" component={FunFacts} />
    </Route>
    <Route path="Portfolio" component={Portfolio} />
    <Route path="Resume" component={Resume} />
  </Route>
);

export default routes;
