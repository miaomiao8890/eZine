'use strict';

import React from 'react';
import Reflux from 'reflux';
import { Link } from 'react-router';
import HeaderBar from './HeaderBar.jsx';
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
      hotwordslist: [],
      subject: null
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
            let newlist = _this.checkSubject(result.data.content)
            _data.cname = result.cname;
            _data.newslist = newlist;
            _data.bid = result.bid;
            _this.setState(_data);
          }
        );
      }
    );
  },
  render() {
    let specialSubjectNode;
    if (this.state.subject) {
      specialSubjectNode = (
        <div className="special-subject">
          <img src={this.state.subject.thumbnailPic} />
        </div>
      );
    }
    return (
      <div id="list" className="full-height">
        <HeaderBar cname={this.state.cname} />
        {specialSubjectNode}
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
  checkSubject(list) {
    let i = [];
    list.map((item, index) => {
      if (item.sourceType == 7) {
        i.push(index);
      }
    });
    if (i.length > 0){
      let subject = list.splice(i[0], 1);
      this.setState({
        subject: subject[0]
      });
    }
    return list;
  }
});

export default List;