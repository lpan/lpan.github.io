import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Portfolio from './pages/portfolio/Portfolio';
import Resume from './pages/resume/Resume';

const routes = (
  <Route path="/" component={App} >
    <IndexRoute component={Home} />
    <Route path="About" component={About} />
    <Route path="Portfolio" component={Portfolio} />
    <Route path="Resume" component={Resume} />
  </Route>
);

export default routes;
