'use strict';

import React from 'react';
import HeaderBar from './HeaderBar.jsx';
import SlideBar from './SlideBar.jsx';
import HotWords from './HotWords.jsx';
import NewsList from './NewsList.jsx';

import ScrollMixin from '../mixins/ScrollMixin.js';
import AjaxMixin from '../mixins/AjaxMixin.js';
import ajaxConfig from '../util/ajaxConfig.js';

const List = React.createClass({
  
  mixins: [AjaxMixin, ScrollMixin],

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
  componentWillMount() {
    let _this = this;
    let _data = {};
    //list
    
    //hotwords
    this.getAjaxData(
      ajaxConfig.hotwords, 
      { group: this.state.hotwordsGroup },
      function(result) {
        // _this.setState({
        //   hotwordsGroup: result.data.nextGroup,
        //   hotwordslist: result.data.list 
        // });
        // _data.hotwordsGroup = result.data.nextGroup;
        _data.hotwordslist = result.data.list;
        _this.getAjaxData(
          ajaxConfig.list, 
          { cid: _this.props.params.cid, p: _this.state.page },
          function(result) {
            // _this.setState({
            //   cname: result.cname,
            //   bid: result.bid,
            //   newslist: result.data 
            // });
            _data.cname = result.cname;
            _data.newslist = result.data;
            _this.setState(_data);
          }
        );
      }
    );

  },
  render() {
    return (
      <div id="list" className="full-height">
        <HeaderBar cname={ this.state.cname } />
        <SlideBar />
        <HotWords hotwordslist={ this.state.hotwordslist } handleChangeFn={ this.handleChange } />
        <NewsList newslist={ this.state.newslist } />
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
            newslist: newslist.concat(result.data)
          });
        }
      }
    );
  },
  handleChange() {
    let _hotwordsGroup = ++this.state.hotwordsGroup
    this.setState({
      hotwordsGroup: _hotwordsGroup
    })
  }
});

export default List;