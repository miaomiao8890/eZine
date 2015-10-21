'use strict';

import React from 'react';
import Reflux from 'reflux';
import { Link } from 'react-router';
import HeaderBar from './HeaderBar.jsx';
import HotWords from './HotWords.jsx';
import ListUl from './ListUl.jsx';

import StorageMixin from '../mixins/StorageMixin.js';
import ScrollMixin from '../mixins/ScrollMixin.js';
import AjaxMixin from '../mixins/AjaxMixin.js';
import ajaxConfig from '../util/ajaxConfig.js';
import HotWordsAction from '../actions/HotWordsAction';
import HotWordsStore from '../stores/HotWordsStore';
import DetailAction from '../actions/DetailAction';
import DetailStore from '../stores/DetailStore';

const List = React.createClass({
  
  mixins: [
    AjaxMixin, 
    ScrollMixin,
    StorageMixin,
    Reflux.connect(HotWordsStore, 'hotwords'), 
    Reflux.listenTo(HotWordsStore, 'onStatusChange'),
    Reflux.connect(DetailStore, 'detail'), 
    Reflux.listenTo(DetailStore, 'onDetailStatusChange'),
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
        display: 'block'
      },
      loadingStyle: {
        display: 'block'
      }
    };
  },
  componentDidMount() {
    //this.unsubscribe = HotWordsStore.listen(this.onStatusChange);
    this.setState({isLock: true});
    
    let storage = this.getData("data");
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
          _data.loadingStyle = {display: 'none'};
          _this.setState(_data);
          scroll(0, storage.position);
        } else { //ajax
          localStorage.setItem("data", "");
          _this.getAjaxData(
            ajaxConfig.list, 
            { 
              cid: _this.props.params.cid,
              p: 1,
              trace: 'home',
              at: 7
            },
            function(result) {
              let newlist = _this.checkSubject(result.data.content)
              _data.newslist = newlist;
              _data.cname = result.cname;
              _data.bid = result.bid;
              _data.isLock = false;
              _data.style = {display: 'block'};
              _data.loadingStyle = {display: 'none'};
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
      let url = "/go.do?st=7&url="+this.state.subject.url+"&trace=list_"+this.props.params.cid;
      specialSubjectNode = (
        <div className="special-subject">
          <a href={url}>
            <img src={this.state.subject.thumbnailPic} />
            <div className="subject-bottom">
              <div className="subject-title">
                <i>专题</i>
                <span>{this.state.subject.ttlContent}</span>
              </div>
            </div>
          </a>
        </div>
      );
    }
    return (
      <div id="list" className="full-height" style={this.state.style}>
        <HeaderBar cname={this.state.cname} />
        {specialSubjectNode}
        <HotWords hotwordslist={this.state.hotwordslist} handleChangeFn={this.handleChange} />
        <div className="news-box">
          <ListUl 
            newslist={this.state.newslist} 
            cid={this.props.params.cid} 
            bid={this.state.bid}
            viewType="news"
          />
          <div className="more" style={this.state.morestyle}>页面加载中...</div>
        </div>
        <div className="loading-bg" style={this.state.loadingStyle}>
          <div className="loading-icon"></div>
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
      { 
        cid: this.props.params.cid, 
        p: _page,
        trace: 'home',
        at: 7
      },
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
  handleChange() {
    HotWordsAction.changeItem(this.state.hotwordsGroup);
  },
  onStatusChange(data) {
    if (this.isMounted()) {
      this.setState({
        hotwordslist: data.list,
        hotwordsGroup: data.nextGroup
      });
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
  },
  onDetailStatusChange(data) {
    localStorage.setItem("preData", JSON.stringify(data));
    let url = "";
    if (data.data.content.current.sourceType == 3 || data.data.content.current.sourceType == 4) {
      url = "/go.do?st="+data.data.content.current.sourceType+"&url="+data.data.content.current.url;
    } else {
      url = "/dev3/app.html#/detail/?cid="+data.data.cid+
            "&bid="+data.data.bid+
            "&oid="+data.data.content.current.objectId+
            "&viewType=news"+
            "&st="+data.data.content.current.sourceType+
            "&trace=list_"+data.data.cid;
    }
    window.scroll(0,0);
    window.location.href = url;
  }
});

export default List;