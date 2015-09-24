'use strict';

import React from 'react';

import HeaderBar from './HeaderBar.jsx';
import AjaxMixin from '../mixins/AjaxMixin.js';
import ajaxConfig from '../util/ajaxConfig.js';

const Feedback = React.createClass({

  mixins: [AjaxMixin],

  getInitialState() {
    return {
      textarea: "",
      wordlength: 0,
    };
  },
  render() {
    return (
      <div id="feedback" className="full-height">
        <HeaderBar cname="意见反馈" />
        <div className="feedback-content">
        <form onSubmit={this.submitHandle}>
          <div className="feedback-textarea">
            <textarea ref="feedbackContext" id="feedbackContext" cols="30" rows="10" onChange={this.handleTextArea} value={this.state.textarea}></textarea>
            <div className="text-var">
              <span id="in">{this.state.wordlength}</span>/<span id="all">140</span>
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
    //submit
    this.getAjaxData(
      ajaxConfig.feedback, { 
        ti: userInfo,
        fi: feedbackContext
      },
      function(result) {
        console.log('Feedback Success!')
      }
    );
  },
  handleTextArea() {
    let value = this.refs.feedbackContext.getDOMNode().value;
    if (value.length > 140) {
      this.setState({
        wordlength: 140,
      });
    } else {
      this.setState({
        textarea: value,
        wordlength: value.length,
      });
    }
  },
});

export default Feedback;