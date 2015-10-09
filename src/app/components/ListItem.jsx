'use strict';

import React from 'react';
import { Link } from 'react-router';

const ListItem = React.createClass({
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
          <a href={"/go.do?st="+this.props.data.sourceType+"&url="+this.props.data.url}>
            {this.getImgComponent(this.props.data.thumbnailPic)}
            {context}
          </a>
        </li>
      );
    } else {
      return (
        <li className="news-item clearfix">
          <Link to={`/detail/`} query={{ 
            cid: this.props.cid, 
            bid: this.props.bid, 
            oid: this.props.data.objectId,
            viewType: this.props.viewType,
            st: this.props.data.sourceType,
            trace: 'list_' + this.props.cid
          }} >
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
  }
});

export default ListItem;
