'use strict';

import React from 'react';
import Reflux from 'reflux';
import { Link } from 'react-router';

import DetailAction from '../actions/DetailAction';
import DetailStore from '../stores/DetailStore';

const ListItem = React.createClass({

  mixins: [ 
    Reflux.connect(DetailStore, 'detail'), 
  ],

  getInitialState() {
    return {
      style: {},
      title: ""
    };
  },
  componentWillMount() {
    if (this.props.data.thumbnailPic) {
      this.setState({ 
        style: {
          marginRight: "6.7325rem"
        }
      });
    }
    if (this.props.data.title) {
      this.setState({ 
        title: this.props.data.title
      });
    }
  },
  render() {
    let context = (
      <div className="news-info">
        {this.getTitleComponent(this.props.data.title)}
        <p className="news-bottom">
          <span className="news-author">{this.props.data.authorName}</span>
          <span>{this.props.data.createDateStr}</span>
        </p>
      </div>
    );
    if (this.props.data.sourceType == 3 || this.props.data.sourceType == 4) {
      return (
        <li className="news-item clearfix">
          <a href={"/go.do?st="+this.props.data.sourceType+"&url="+this.props.data.url} onClick={this.getDetailData}>
            {this.getImgComponent(this.props.data.thumbnailPic)}
            {context}
          </a>
        </li>
      );
    } else {
      return (
        <li className="news-item clearfix">
          <Link to={`/detail/`}  onClick={this.getDetailData} >
            {this.getImgComponent(this.props.data.thumbnailPic)}
            {context}
          </Link>
        </li>
      );
    }
  },
  getImgComponent(thumbnailPic) {
    let thumbnailPicDom;
    if (thumbnailPic) {
      thumbnailPicDom = (
        <div className="news-item-img">
          <img src={thumbnailPic} />
        </div>
      );
    }
    return thumbnailPicDom;
  },
  getTitleComponent(title) {
    let titleDom;
    if (!title) {
      titleDom = <p className="news-context">{ this.props.data.ttlContent }</p>
    } else {
      titleDom = <p className="news-title">{ this.props.data.title }</p>
    }
    return titleDom;
  },
  getDetailData(event) {
    event.preventDefault();
    document.querySelector(".loading-bar").style.display = "block";
    DetailAction.getInfo(
      this.props.cid,
      this.props.bid,
      this.props.data.objectId,
      this.props.data.sourceType,
      this.props.viewType,
      this.props.isRecommend
    );
  }
});

export default ListItem;
