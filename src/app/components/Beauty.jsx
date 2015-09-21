'use strict';

import React from 'react';
import { Link } from 'react-router';

import HeaderBar from './HeaderBar.jsx';
import Gallery from './Gallery.jsx';
import BeautyImg from './BeautyImg.jsx';

import AjaxMixin from '../mixins/AjaxMixin.js';
import ScrollMixin from '../mixins/ScrollMixin.js';
import ajaxConfig from '../util/ajaxConfig.js';
import slideImg from '../util/slideImg.js';

const Beauty = React.createClass({
  
  mixins: [AjaxMixin, ScrollMixin],

  getInitialState() {
    return {
      bid: null,
      cid: null,
      page: 1,
      beautylist: [],
      navlist: [],
    };
  },
  componentDidMount() {
    let _this = this;
    this.getAjaxDataByEasy(
      ajaxConfig.list, 
      { cid: this.props.params.cid, p: this.state.page },
      function(result) {
        if (_this.isMounted()) {
          _this.setState({
            cname: result.cname,
            cid: result.cid,
            bid: result.bid,
            beautylist: result.data.content,
            navlist: result.data.subChannel
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
    return (
      <div id="beauty" className="full-height">
        <HeaderBar cname={this.state.cname} />
        <nav className="beauty-nav clearfix">
          <ul className="clearfix">
            {this.getNav()}
          </ul>
        </nav>
        <Gallery ref="Gallery" elements={this.state.beautylist} handleClickFn={this.handleClick} />
        <BeautyImg elements={this.state.beautylist} style={{display:'none'}} />
      </div>
    );
  },
  getNav() {
    if (this.state.navlist.length > 0) {
      return this.state.navlist.map(nav => {
        let className = nav.id == this.props.params.cid ? "on" : "";
        return (
          <li key={nav.id} className={className}>
            <Link to={`/waterfall/${nav.id}`}>{nav.name}</Link>
          </li>
        );
      });
    }
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
            beautylist: beautylist.concat(result.data.content)
          });
        }
      }
    );
  },
  handleClick(index) {
    // console.log(index)
    slideImg.init(index, this.getMoreData.bind(this))
  }
});

export default Beauty;