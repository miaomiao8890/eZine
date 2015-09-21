'use strict';

import React from 'react';
import Reflux from 'reflux';

import HotWords from './HotWords.jsx';
import ListUl from './ListUl.jsx';
import AjaxMixin from '../mixins/AjaxMixin.js';
import ajaxConfig from '../util/ajaxConfig.js';
import HotWordsAction from '../actions/HotWordsAction';
import DetailAction from '../actions/DetailAction';
import HotWordsStore from '../stores/HotWordsStore';
import DetailStore from '../stores/DetailStore';
import { Link } from 'react-router';

const Detail = React.createClass({
  
  mixins: [ 
    AjaxMixin, 
    Reflux.connect(DetailStore, 'detail'), 
    Reflux.listenTo(DetailStore, 'onStatusChange'),
    Reflux.connect(HotWordsStore, 'hotwords'), 
    Reflux.listenTo(HotWordsStore, 'onHotWordsStatusChange')
  ],
  
  getInitialState() {
    return {
      data: {
        content: {
          current: {},
          next: {
            title: ""
          },
          last: {
            title: ""
          }
        },
        recommend: {
          cotnentBases: []
        }
      },
      hotwordsGroup: 1,
      hotwordslist: [],
    };
  },
  componentDidMount() {
    DetailAction.getInfo(
      this.props.location.query.cid,
      this.props.location.query.bid,
      this.props.location.query.oid
    );
  },
  componentWillReceiveProps(nextProps) {
    let oldCid = this.props.location.query;
    let newCid = nextProps.location.query;

    if (oldCid !== newCid) {
      window.location.reload();
    }
  },
  render() {
    let imgContent;
    if (this.props.location.query.viewType) {
      imgContent = <img className="light-img" src={this.state.data.content.current.middlePic} />
    }
    return (
      <div id="listdetail" className="full-height">
        <header className="header-bar">
          <i className="back-btn" onClick={this.handleBackBtn}></i>
          <i className="header-right-btn"></i>
        </header>
        <div className="news-detail-box">
          <h1 className="news-detail-title">{this.state.data.content.current.title}</h1>
          <div className="news-detail-content" dangerouslySetInnerHTML={this.getContext(this.state.data.content.current.context)}></div>
          {imgContent}
          <div className="news-detail-bottom">
            <span className="news-detail-time">{this.state.data.content.current.authorName}</span>
            <a href={this.state.data.content.current.url} className="news-detail-url">查看原网页</a>
          </div>
        </div>
        <div className="news-detail-beside">
          {this.getNextPrev(this.state.data.content.last, "上一条")}
          {this.getNextPrev(this.state.data.content.next, "下一条")}
        </div>
        <HotWords hotwordslist={this.state.hotwordslist} handleChangeFn={this.handleChange} />
        <div className="recommend mt10">
          <h2 className="recommend-title">猜你喜欢</h2>
          <div className="recommend-list">
            <ListUl 
              newslist={this.state.data.recommend.cotnentBases} 
              cid={this.state.data.cid} 
              bid={this.state.data.bid}
            />
          </div>
        </div>
        <footer className="footer-bar">
          <ul className="clearfix">
            <li><Link to={`/feedback`}>意见反馈</Link></li>
            <li><Link to={`/copyright`}>版权声明</Link></li>
          </ul>
        </footer>
      </div>
    );
  },
  handleBackBtn() {
    window.history.go(-1);
  },
  onStatusChange(data) {
    if (this.isMounted()) {
      this.setState({
        data: data.data,
        hotwordslist: data.hotwordslist
      });
    }
  },
  getContext(context) {
    return {__html: context}; 
  },
  getNextPrev(data, type) {
    let besideNode;
    if (data) {
      besideNode = <Link to={`/detail/`} query={{ 
          cid: this.state.data.cid, 
          bid: this.state.data.bid, 
          oid: data.objectId 
        }} className="news-detail-side">{ type + "：" + data.title }</Link>
    }
    return besideNode;
  },
  handleChange() {
    let _group = ++this.state.hotwordsGroup;
    HotWordsAction.changeItem(_group);
    this.setState({hotwordsGroup: _group});
  },
  onHotWordsStatusChange(list) {
    if (this.isMounted()) {
      this.setState({hotwordslist: list});
    }
  },
});

export default Detail;