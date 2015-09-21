'use strict';

import React from 'react';
import Reflux from 'reflux';
import HeaderBar from './HeaderBar.jsx';
import SlideBar from './SlideBar.jsx';
import HotWords from './HotWords.jsx';
import ListUl from './ListUl.jsx';

import ScrollMixin from '../mixins/ScrollMixin.js';
import AjaxMixin from '../mixins/AjaxMixin.js';
import ajaxConfig from '../util/ajaxConfig.js';
import HotWordsAction from '../actions/HotWordsAction';
import HotWordsStore from '../stores/HotWordsStore';

const List = React.createClass({
  
  mixins: [
    AjaxMixin, 
    ScrollMixin, 
    Reflux.connect(HotWordsStore, 'hotwords'), 
    Reflux.listenTo(HotWordsStore, 'onStatusChange')
  ],

  getInitialState() {
    return {
      cname: null,
      bid: null,
      page: 1,
      newslist: [],
      hotwordsGroup: 1,
      hotwordslist: []
    };
  },
  componentDidMount() {
    //this.unsubscribe = HotWordsStore.listen(this.onStatusChange);
    let _this = this;
    let _data = {};
    
    //getAll
    this.getAjaxData(
      ajaxConfig.hotwords, 
      { group: this.state.hotwordsGroup },
      function(result) {
        _data.hotwordslist = result.data.list;
        _this.getAjaxData(
          ajaxConfig.list, 
          { cid: _this.props.params.cid, p: _this.state.page },
          function(result) {
            _data.cname = result.cname;
            _data.newslist = result.data.content;
            _data.bid = result.bid;
            _this.setState(_data);
          }
        );
      }
    );

  },
  render() {
    return (
      <div id="list" className="full-height">
        <HeaderBar cname={this.state.cname} />
        <HotWords hotwordslist={this.state.hotwordslist} handleChangeFn={this.handleChange} />
        <div className="news-box">
          <ListUl 
            newslist={this.state.newslist} 
            cid={this.props.params.cid} 
            bid={this.state.bid}
          />
          <div className="more">页面加载中...</div>
        </div>
      </div>
    );
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
            newslist: newslist.concat(result.data.content)
          });
        }
      }
    );
  },
  handleChange() {
    let _group = ++this.state.hotwordsGroup;
    HotWordsAction.changeItem(_group);
    this.setState({hotwordsGroup: _group});
  },
  onStatusChange(list) {
    if (this.isMounted()) {
      this.setState({hotwordslist: list});
    }
  },
});

export default List;