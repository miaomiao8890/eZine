'use strict';

import React from 'react';
import { Router, Route, Link } from 'react-router';
import { history } from 'react-router/lib/HashHistory';

import App from './components/App.jsx';
import List from './components/List.jsx';
import Small from './components/Small.jsx';
import Beauty from './components/Beauty.jsx';
import LightList from './components/LightList.jsx';
import Detail from './components/Detail.jsx';
import CopyRight from './components/CopyRight.jsx';
import Feedback from './components/Feedback.jsx';

export default (
  <Router history={ history }>
    <Route name="app" path="/" component={App}></Route>
    <Route name="news" path="/news/:cid" component={List}></Route>
    <Route name="small" path="/small/:cid" component={Small}></Route>
    <Route name="waterfall" path="/waterfall/:cid" component={Beauty}></Route>
    <Route name="light" path="/light/:cid" component={LightList}></Route>
    <Route name="detail" path="/detail/" component={Detail}></Route>
    <Route name="copyright" path="/copyright" component={CopyRight}></Route>
    <Route name="feedback" path="/feedback" component={Feedback}></Route>
  </Router>
);