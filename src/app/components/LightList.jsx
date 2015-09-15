'use strict';

import React from 'react';
import Reflux from 'reflux';
import HeaderBar from './HeaderBar.jsx';
import LightListUl from './LightListUl.jsx';

import ScrollMixin from '../mixins/ScrollMixin.js';
import ListAction from '../actions/ListAction';
import ListStore from '../stores/ListStore';

const LightList = React.createClass({

  mixins: [ ScrollMixin, Reflux.connect(ListStore, 'list'), Reflux.listenTo(ListStore, 'onStatusChange')],

  getInitialState() {
    return {
      cname: null,
      bid: null,
      page: 1,
      list: []
    };
  },
  componentDidMount() {
    ListAction.getAll(this.props.params.cid);
  },
  render() {
    return (
      <div id="lightlist" className="full-height">
        <HeaderBar cname={ this.state.cname } />
        <LightListUl list={ this.state.list } />
      </div>
    );
  },
  getMoreData() {
    let _this = this;
    let _page = ++this.state.page;
    let newslist = this.state.list;

    ListAction.getMore(this.props.params.cid, _page, this.state.list);

  },
  onStatusChange(data, cname, page, isLock) {
    this.setState({
      isLock: isLock,
      cname: cname,
      list: data,
      page: page
    });
  },

});

export default LightList;