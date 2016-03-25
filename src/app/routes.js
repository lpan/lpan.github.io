import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import Home from './pages/home/Home';

const routes = (
  <Route path="/" component={App} >
    <IndexRoute component={Home} />
  </Route>
);

export default routes;
