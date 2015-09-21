'use strict';

import React from 'react';
import { Link } from 'react-router';

const ListDetail = React.createClass({
  render() {
    return (
      <div>
      <header className="header-bar">
        <i className="back-btn" onClick={ this.handleBackBtn }></i>
        <i className="header-right-btn"></i>
      </header>
      <div className="news-detail-box">
        <h1 className="news-detail-title">{ this.props.data.content.current.title }</h1>
        <div className="news-detail-content" dangerouslySetInnerHTML={ this.getContext(this.props.data.content.current.context)}></div>
        <div className="news-detail-bottom">
          <span className="news-detail-time">{ this.props.data.content.current.authorName }</span>
          <a href={ this.props.data.content.current.url } className="news-detail-url">查看原网页</a>
        </div>
      </div>
      <div className="news-detail-beside">
        {this.getNextPrev(this.props.data.content.last, "上一条")}
        {this.getNextPrev(this.props.data.content.next, "下一条")}
      </div>
      </div>
    );
  },
  handleBackBtn() {
    window.history.go(-1);
  },
  getContext(context) {
    return {__html: context}; 
  },
  getNextPrev(data, type) {
    let besideNode;
    if (data) {
      besideNode = <Link to={`/detail/`} query={{ 
          cid: this.props.data.cid, 
          bid: this.props.data.bid, 
          oid: data.objectId 
        }} className="news-detail-side">{ type + "：" + data.title }</Link>
    }
    return besideNode;
  },
});

export default ListDetail;