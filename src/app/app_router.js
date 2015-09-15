'use strict';

import React from 'react';
import { Router, Route, Link } from 'react-router';
import { history } from 'react-router/lib/HashHistory';

import App from './components/App.jsx';
import List from './components/List.jsx';
import Beauty from './components/Beauty.jsx';
import LightList from './components/LightList.jsx';
import ListDetail from './components/ListDetail.jsx';

export default (
  <Router history={ history }>
    <Route name="app" path="/" component={App}></Route>
    <Route name="news" path="/news/:cid" component={List}></Route>
    <Route name="waterfall" path="/waterfall/:cid" component={Beauty}></Route>
    <Route name="light" path="/light/:cid" component={LightList}></Route>
    <Route name="detail" path="/detail/" component={ListDetail}></Route>
  </Router>
);