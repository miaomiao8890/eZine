'use strict';

import React from 'react';

import HeaderBar from './HeaderBar.jsx';

const CopyRight = React.createClass({
  render() {
    return (
      <div id="copyright" className="full-height">
        <header className="header-bar">
          <i className="back-btn" onClick={this.handleBackBtn}></i>
          版权声明
        </header>
        <div className="copyright-content">
          <p className="clearfix">
          <span className="copyright-index">一、 </span>
          <span className="copyright-context">凡本网站注明“来源：xxx（非新鲜事儿或欧朋浏览器）”的作品，均转载自其它媒体或网站，作品版权归原创作者所有,本站不承担此类稿件的任何侵权责任。</span>
        </p><br/>
        <p className="clearfix">
          <span className="copyright-index">二、 </span>
          <span className="copyright-context">鉴于本网站转载稿件部分来源于搜索引擎，抓取的结果可能与原列明的标题和描述不符，从而可能导致稿件被错误标注或识别，凡本网站用户发现错误标注或识别的，可与本网站联系，待本网站核实后将予以及时处理。</span>
        </p><br/>
        <p className="clearfix">
          <span className="copyright-index">三、 </span>
          <span className="copyright-context">本网站转载之目的仅在于传递更多信息，为公众提供免费服务，如转载稿涉及版权等问题，请作者在两周之内来函联系，我们将协调给予处理（或删除）。如稿件版权单位或个人不想在本网站发布，可与本网站联系，本网站视情况撤除。</span>
        </p><br/>
        <p className="clearfix">
          <span className="copyright-index">四、 </span>
          <span className="copyright-context">本网站所载之信息仅为网民提供参考之用，文章观点不代表本站立场，其真实性由作者或稿源方负责，本站信息接受广大网民的监督、投诉和批评。</span>
        </p>
        </div>
      </div>
    );
  },
  handleBackBtn() {
    window.history.go(-1);
  },
});

export default CopyRight;