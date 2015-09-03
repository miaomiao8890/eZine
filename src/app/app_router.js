'use strict';

import React from 'react';
import { Router, Route } from 'react-router';
import { history } from 'react-router/lib/HashHistory';

import App from './components/app.jsx';

export default (
  <Router history={history}>
    <Route path="/" component={App}></Route>
  </Router>
);