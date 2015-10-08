'use strict';

import React from 'react';
import Reflux from 'reflux';
import { Link } from 'react-router';
import HeaderBar from './HeaderBar.jsx';
import ListUl from './ListUl.jsx';

import StorageMixin from '../mixins/StorageMixin.js';
import ScrollMixin from '../mixins/ScrollMixin.js';
import AjaxMixin from '../mixins/AjaxMixin.js';
import ajaxConfig from '../util/ajaxConfig.js';
import HotWordsAction from '../actions/HotWordsAction';
import HotWordsStore from '../stores/HotWordsStore';

const List = React.createClass({
  
  mixins: [
    StorageMixin,
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
      subject: null,
      morestyle: {
        display: 'none'
      },
      style: {
        display: 'none'
      }
    };
  },
  componentDidMount() {
    //this.unsubscribe = HotWordsStore.listen(this.onStatusChange);
    let storage = this.getData();
    let _this = this;
    let _data = {};
    
    //getAll
    this.getAjaxData(
      ajaxConfig.hotwords, 
      { group: this.state.hotwordsGroup },
      function(result) {
        _data.hotwordslist = result.data.list;
        _data.hotwordsGroup = result.data.nextGroup;
        //list
        if(storage && _this.props.params.cid == storage.cid) {
          _data.newslist = storage.list;
          _data.cname = storage.cname;
          _data.bid = storage.bid;
          _data.page = storage.page;
          _data.subject = storage.subject;
          _data.isLock = false;
          _data.style = {display: 'block'};
          _this.setState(_data);
          setTimeout(function() {
            scroll(0, storage.position);
          },10);
        } else { //ajax
          localStorage.setItem("data", "");
          _this.getAjaxData(
            ajaxConfig.list, 
            { cid: _this.props.params.cid, p: 1 },
            function(result) {
              let newlist = _this.checkSubject(result.data.content)
              _data.cname = result.cname;
              _data.newslist = newlist;
              _data.bid = result.bid;
              _data.style = {display: 'block'};
              _this.setState(_data);
            }
          );
        }
      },function() {
        console.log('error');
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
      <div id="list" className="full-height" style={this.state.style}>
        <HeaderBar cname={this.state.cname} />
        {specialSubjectNode}
        <div className="news-box subject">
          <ListUl 
            newslist={this.state.newslist} 
            cid={this.props.params.cid} 
            bid={this.state.bid}
            viewType="small"
          />
          <div className="more" style={this.state.morestyle}>页面加载中...</div>
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
            newslist: newslist.concat(result.data.content),
            morestyle: {
              display: 'none'
            }
          });
        }
      },
      function() {
        _this.setState({
          morestyle: {
            display: 'none'
          }
        });
      }
    );
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