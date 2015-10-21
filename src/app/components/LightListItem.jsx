'use strict';

import React from 'react';
import Reflux from 'reflux';
import { Link } from 'react-router';

import DetailAction from '../actions/DetailAction';
import DetailStore from '../stores/DetailStore';

const LightListItem = React.createClass({

  mixins: [ 
    Reflux.connect(DetailStore, 'detail'), 
  ],
  
  getInitialState() {
    return {
      title: ""
    };
  },
  componentWillMount() {
    if (this.props.data.title) {
      this.setState({ 
        title: this.props.data.title
      });
    }
  },
  render() {
    let data = this.props.data
            ,middlePicNode
            ,url
            ,context
          ;
    if (this.props.data.middlePic) {
      middlePicNode = <img src={this.props.data.middlePic} />
    }
    context = (
      <div className="light-info">
        <p className="light-context">{this.props.data.context}</p>
        {middlePicNode}
        <p className="light-bottom">
          <span className="light-author">{this.props.data.authorName}</span>
          <span>{this.props.data.createDateStr}</span>
        </p>
      </div>
    );
    if (this.props.data.sourceType == 3 || this.props.data.sourceType == 4) {
      return (
        <li className="light-item">
          <a href="###" onClick={this.getDetailData}>
            {context}
          </a>
        </li>
      );
    } else {
      return (
        <li className="light-item">
          <Link to="###" onClick={this.getDetailData} >
            {context}
          </Link>
        </li>
      );
    }
  },
  getDetailData(event) {
    event.preventDefault();
    DetailAction.getInfo(
      this.props.cid,
      this.props.bid,
      this.props.data.objectId,
      this.props.data.sourceType
    );
  }
});

export default LightListItem;
