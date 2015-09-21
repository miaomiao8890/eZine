'use strict';

import React from 'react';

import HeaderBar from './HeaderBar.jsx';

const Feedback = React.createClass({
  render() {
    return (
      <div id="feedback" className="full-height">
        <HeaderBar cname="意见反馈" />
        <div className="feedback-content">
        <form onSubmit={this.submitHandle}>
          <div className="feedback-textarea">
            <textarea ref="feedbackContext" id="feedbackContext" cols="30" rows="10"></textarea>
            <div className="text-var">
              <span id="in">0</span>/<span id="all">140</span>
            </div>
          </div>
          <div className="feedback-input">
            <input type="text" ref="userInfo" placeholder="输入您的联系方式QQ/手机/Email"/>
          </div>
          <input type="submit" id="submitBtn" className="submit-btn" />
        </form>
      </div>
      </div>
    );
  },
  submitHandle() {
    event.preventDefault();
    let feedbackContext = this.refs.feedbackContext.getDOMNode().value;
    let userInfo = this.refs.userInfo.getDOMNode().value;
  }
});

export default Feedback;