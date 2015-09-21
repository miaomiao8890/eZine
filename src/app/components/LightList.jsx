'use strict';

import React from 'react';
import Reflux from 'reflux';
import { Link } from 'react-router';
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
      list: [],
      navlist: []
    };
  },
  componentDidMount() {
    ListAction.getAll(this.props.params.cid);
  },
  componentWillReceiveProps(nextProps) {
    let oldCid = this.props.params.cid;
    let newCid = nextProps.params.cid;

    if (oldCid !== newCid) {
      window.location.reload();
    }
  },
  render() {
    return (
      <div id="lightlist" className="full-height">
        <HeaderBar cname={this.state.cname} />
        <nav className="light-nav clearfix">
          <ul className="clearfix">
            {this.getNav()}
          </ul>
        </nav>
        <LightListUl 
          list={ this.state.list } 
          cid={this.props.params.cid} 
          bid={this.state.bid}
        />
      </div>
    );
  },
  getNav() {
    if (this.state.navlist.length > 0) {
      return this.state.navlist.map(nav => {
        let className = nav.id == this.props.params.cid ? "on" : "";
        return (
          <li key={nav.id} className={ className }>
            <Link to={`/light/${nav.id}`}>{ nav.name }</Link>
          </li>
        );
      });
    }
  },
  getMoreData() {
    let _this = this;
    let _page = ++this.state.page;
    let newslist = this.state.list;

    ListAction.getMore(this.props.params.cid, _page, this.state.list);

  },
  onStatusChange(data, subChannel, cname, bid, page, isLock) {
    if (this.isMounted()) {
      this.setState({
        isLock: isLock,
        cname: cname,
        bid: bid,
        list: data,
        page: page,
        navlist: subChannel
      });
    }
  },

});

export default LightList;