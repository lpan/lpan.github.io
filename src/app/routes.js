import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import Home from './pages/home/Home';
import AboutIndex from './pages/about/index';
import About from './pages/about/About/About';
import Boring from './pages/about/Boring/Boring';
import Portfolio from './pages/portfolio/Portfolio';
import Resume from './pages/resume/Resume';

const routes = (
  <Route path="/" component={App} >
    <IndexRoute component={Home} />
    <Route path="About" component={AboutIndex}>
      <IndexRoute component={About} />
      <Route path="Boring" component={Boring} />
    </Route>
    <Route path="Portfolio" component={Portfolio} />
    <Route path="Resume" component={Resume} />
  </Route>
);

export default routes;
