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
      bgStyle: {
        display: 'none'
      },
      alertText: '',
    };
  },
  render() {
    return (
      <div id="feedback" className="full-height">
        <header className="header-bar">
          <i className="back-btn" onClick={this.handleBackBtn}></i>
          意见反馈
        </header>
        <div className="feedback-content">
          <form onSubmit={this.handleSubmit}>
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
        <div className="screen-fix" style={this.state.bgStyle}>
          <div className="screen-bg"></div>
          <div className="register-pass">
            <div className="register-pass-title">提示</div>
            <p>{this.state.alertText}</p>
            <div className="bottom-btn" onClick={this.handleClick}>确定</div>
          </div>
        </div>
      </div>
    );
  },
  handleSubmit() {
    event.preventDefault();
    let feedbackContext = this.refs.feedbackContext.getDOMNode().value;
    let userInfo = this.refs.userInfo.getDOMNode().value;
    if (feedbackContext.length == 0 ) {
      this.setState({
        alertText: '请填写意见',
        bgStyle: {
          display: 'block'
        }
      });
      return;
    } else if (feedbackContext.length > 0 && userInfo.length == 0) {
      this.setState({
        alertText: '请填写联系方式',
        bgStyle: {
          display: 'block'
        }
      });
      return;
    } else {
      //submit
      let _this = this;
      this.getAjaxData(
        ajaxConfig.feedback, { 
          ti: userInfo,
          fi: feedbackContext
        },
        function(result) {
          console.log('Feedback Success!');
        }
      );
      this.setState({
        alertText: '提交成功',
        bgStyle: {
          display: 'block'
        }
      });
      let timer = setTimeout(function() {
        _this.setState({
          bgStyle: {
            display: 'none'
          }
        });
        window.history.go(-1);
      },3000)
    }
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
  handleClick() {
    let feedbackContext = this.refs.feedbackContext.getDOMNode().value;
    let userInfo = this.refs.userInfo.getDOMNode().value;
    if (feedbackContext.length > 0 && userInfo.length > 0) {
      this.setState({
        bgStyle: {
          display: 'none'
        }
      });
      // window.history.go(-1);
    } else {
      this.setState({
        bgStyle: {
          display: 'none'
        }
      });
    }
  },
  handleBackBtn() {
    window.history.go(-1);
  },
});

export default Feedback;