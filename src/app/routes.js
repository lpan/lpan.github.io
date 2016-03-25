import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import App from './App';
import Home from './pages/home/Home';
import About from './pages/about/About';

const routes = (
  <Route path="/" component={App} >
    <IndexRoute component={Home} />
    <Route path="about" component={About} />
    <Redirect from="home" to="/" />
  </Route>
);

export default routes;
