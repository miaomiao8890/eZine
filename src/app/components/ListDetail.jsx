'use strict';

import React from 'react';
import Reflux from 'reflux';

const ListDetail = React.createClass({
  getInitialState() {
    return {
      
    };
  },
  componentDidMount() {
    // ListAction.getAll(this.props.params.cid);
  },
  render() {
    console.log(this.props.params)
    return (
      <div id="listdetail" className="full-height">
        <header className="header-bar">
          <i className="back-btn" onClick={ this.handleBackBtn }></i>
          <i className="header-right-btn"></i>
        </header>
        <div className="news-detail-box">
          <h1 className="news-detail-title">给宝宝退烧最易犯的几个错误</h1>
          <div className="news-detail-content">
          </div>
          <div className="news-detail-bottom">
            <span className="news-detail-time">一小时前</span>
            <a className="news-detail-url">查看原网页</a>
          </div>
        </div>
        <div className="news-detail-beside">
          <div className="news-detail-side">上一条：疑似一架歼7战机在河北海兴坠毁河北海兴坠毁</div>
          <div className="news-detail-side">下一条：杜汶泽死扛到底：“这里是香港听河北海兴坠毁</div>
        </div>
        <div className="hot-words mt10">
          <div className="hot-words-header"><i className="change-hot">换一换</i>今日热词</div>
          <ul className="hot-words-list clearfix">
            <li className="hot-words-item">王学兵涉毒被抓</li>
            <li className="hot-words-item">黄宏邀委员会入场遭拒</li>
            <li className="hot-words-item">土豪开派对豪车云集</li>
            <li className="hot-words-item">延迟退休方案</li>
            <li className="hot-words-item">邹市明无缘金腰带</li>
            <li className="hot-words-item">上海2号线故障</li>
          </ul>
        </div>
      </div>
    );
  },
  handleBackBtn() {
    window.history.go(-1);
  },
});

export default ListDetail;