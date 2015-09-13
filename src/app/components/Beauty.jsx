'use strict';

import React from 'react';
import { Link } from 'react-router';

import HeaderBar from './HeaderBar.jsx';
import BeautyList from './BeautyList.jsx';
import Gallery from './Gallery.jsx';

import AjaxMixin from '../mixins/AjaxMixin.js';
import ScrollMixin from '../mixins/ScrollMixin.js';
import ajaxConfig from '../util/ajaxConfig.js';
import navConfig from '../util/navConfig.js';

const Beauty = React.createClass({
  
  mixins: [AjaxMixin, ScrollMixin],

  getInitialState() {
    return {
      bid: null,
      cid: null,
      page: 1,
      beautylist: [],
    };
  },
  componentDidMount() {
    let _this = this;
    this.getAjaxData(
      ajaxConfig.list, 
      { cid: this.props.params.cid, p: this.state.page },
      function(result) {
        if (_this.isMounted()) {
          _this.setState({
            cname: result.cname,
            cid: result.cid,
            bid: result.bid,
            beautylist: result.data 
          });
        }
      }
    );
  },
  componentWillReceiveProps(nextProps) {
    let oldCid = this.props.params.cid;
    let newCid = nextProps.params.cid;

    if (oldCid !== newCid) {
      window.location.reload();
    }
  },
  render() {
    let navNode = this.navComponent(navConfig.waterfallNav);
    return (
      <div id="beauty" className="full-height">
        <HeaderBar cname={ this.state.cname } />
        <nav className="beauty-nav clearfix">
          <ul className="clearfix">
            { navNode }
          </ul>
        </nav>
        <Gallery ref="Gallery" elements={ this.state.beautylist } />
      </div>
    );
  },
  navComponent(navs) {
    return navs.map(nav => {
      let className = nav.cid == this.props.params.cid ? "on" : "";
      return (
        <li key={nav.cid} className={ className }>
          <Link to={`/waterfall/${nav.cid}`}>{ nav.cname }</Link>
        </li>
      );
    });
  },
  getMoreData() {
    let _this = this;
    let _page = ++this.state.page;
    let beautylist = this.state.beautylist;
    this.getAjaxData(
      ajaxConfig.list, 
      { cid: this.state.cid, p: _page },
      function(result) {
        if (_this.isMounted()) {
          _this.setState({
            isLock: false,
            page: _page,
            beautylist: beautylist.concat(result.data)
          });
        }
      }
    );
  }
});

export default Beauty;