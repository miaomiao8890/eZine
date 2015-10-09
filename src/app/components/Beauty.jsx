'use strict';

import React from 'react';
import Reflux from 'reflux';
import { Link } from 'react-router';

import HeaderBar from './HeaderBar.jsx';
import Gallery from './Gallery.jsx';
import BeautyImg from './BeautyImg.jsx';

import AjaxMixin from '../mixins/AjaxMixin.js';
import ScrollMixin from '../mixins/ScrollMixin.js';
import ListAction from '../actions/ListAction';
import ListStore from '../stores/ListStore';
import ajaxConfig from '../util/ajaxConfig.js';
import slideImg from '../util/slideImg.js';

const Beauty = React.createClass({
  
  mixins: [
    AjaxMixin, 
    ScrollMixin, 
    Reflux.connect(ListStore, 'list'), 
    Reflux.listenTo(ListStore, 'onStatusChange')
  ],

  getInitialState() {
    return {
      cname: null,
      bid: null,
      cid: null,
      page: 1,
      newslist: [],
      navlist: [],
      boxStyle: {
        display: 'block'
      },
      morestyle: {
        display: 'none'
      }
    };
  },
  componentDidMount() {
    this.setState({isLock: true});
    ListAction.getAll(this.props.params.cid);
    // this.getAjaxDataByEasy(
    //   ajaxConfig.list, 
    //   { cid: this.props.params.cid, p: this.state.page },
    //   function(result) {
    //     if (_this.isMounted()) {
    //       _this.setState({
    //         cname: result.cname,
    //         cid: result.cid,
    //         bid: result.bid,
    //         newslist: result.data.content,
    //         navlist: result.data.subChannel
    //       });
    //     }
    //   }
    // );
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
      <div id="beauty" className="full-height" style={this.state.boxStyle}>
        <HeaderBar cname={this.state.cname} />
        <nav className="beauty-nav clearfix">
          <ul className="clearfix">
            {this.getNav()}
          </ul>
        </nav>
        <Gallery ref="Gallery" elements={this.state.newslist} handleClickFn={this.handleClick} />
        <BeautyImg elements={this.state.newslist} style={{display:'none'}} />
        <div className="beauty-more" style={this.state.morestyle}>页面加载中...</div>
        <div className="beauty-init"></div>
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
    let newslist = this.state.newslist;
    this.getAjaxData(
      ajaxConfig.list, 
      { cid: this.props.params.cid, p: _page },
      function(result) {
        if (_this.isMounted()) {
          _this.setState({
            isLock: false,
            page: _page,
            newslist: newslist.concat(result.data.content),
            morestyle: {
              display: 'none'
            }
          });
        }
      }
    );
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
          boxStyle: {
            display: 'block'
          }
        });
      }
    } else {
      if (this.isMounted()) {
        this.setState({
          morestyle: {
            display: 'none'
          }
        });
      }
    }
  },
  handleClick(index) {
    // console.log(index)
    slideImg.init(index, this.getMoreData.bind(this));
    let url = window.location.href;
    window.history.pushState('detail', '', '#waterfall/'+this.props.params.cid+'/detail');
  }
});

export default Beauty;