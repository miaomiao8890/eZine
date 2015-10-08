'use strict';

import React from 'react';
import Reflux from 'reflux';
import { Link } from 'react-router';
import HeaderBar from './HeaderBar.jsx';
import LightListUl from './LightListUl.jsx';

import StorageMixin from '../mixins/StorageMixin.js';
import ScrollMixin from '../mixins/ScrollMixin.js';
import ListAction from '../actions/ListAction';
import ListStore from '../stores/ListStore';

const LightList = React.createClass({

  mixins: [ StorageMixin, ScrollMixin, Reflux.connect(ListStore, 'list'), Reflux.listenTo(ListStore, 'onStatusChange')],

  getInitialState() {
    return {
      cname: null,
      bid: null,
      page: 1,
      newslist: [],
      navlist: [],
      morestyle: {
        display: 'none'
      },
      style: {
        display: 'none'
      }
    };
  },
  componentDidMount() {
    let _data = {};
    let storage = this.getData();
    if(storage && this.props.params.cid == storage.cid) {
      _data.newslist = storage.list;
      _data.cname = storage.cname;
      _data.bid = storage.bid;
      _data.page = storage.page;
      _data.isLock = false;
      _data.navlist = storage.navlist;
      _data.style = {display: 'block'};
      this.setState(_data);
      setTimeout(function() {
        scroll(0, storage.position);
      },10);
    } else {
      localStorage.setItem("data", "");
      ListAction.getAll(this.props.params.cid);
    }
  },
  componentWillReceiveProps(nextProps) {
    let oldCid = this.props.params.cid;
    let newCid = nextProps.params.cid;

    if (oldCid !== newCid) {
      ListAction.getAll(newCid);
    }
  },
  render() {
    return (
      <div id="lightlist" className="full-height" style={this.state.style}>
        <HeaderBar cname={this.state.cname} />
        <nav className="light-nav clearfix">
          <ul className="clearfix">
            {this.getNav()}
          </ul>
        </nav>
        <div className="light-box">
          <LightListUl 
            list={ this.state.newslist } 
            cid={this.props.params.cid} 
            bid={this.state.bid}
          />
        </div>
        <div className="more" style={this.state.morestyle}>页面加载中...</div>
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
    let newslist = this.state.newslist;

    ListAction.getMore(this.props.params.cid, _page, this.state.newslist);
  },
  onStatusChange(data, subChannel, cname, bid, page, isLock) {
    if (data) {
      if (this.isMounted()) {
        this.setState({
          isLock: isLock,
          cname: cname,
          bid: bid,
          newslist: data,
          page: page,
          navlist: subChannel,
          morestyle: {
            display: 'none'
          },
          style: {
            display: 'block'
          }
        });
      }
    } else {
      this.setState({
        morestyle: {
          display: 'none'
        }
      });
    }
  },

});

export default LightList;