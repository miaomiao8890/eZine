'use strict';

import React from 'react';
import { Link } from 'react-router';

const LightListItem = React.createClass({
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
          "margin-right": "6.7325rem"
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
    let data = this.props.data;
    // console.log(this.props.data)
    return (
      
      <li className="light-item">
        <Link to={`/detail/`} query={{ 
          cid: this.props.cid, 
          bid: this.props.bid, 
          oid: this.props.data.objectId,
          viewType: 'light'
        }} >
          <div className="light-info">
            <p className="light-title">{ this.props.data.authorName }</p>
            <p className="light-context">{ this.props.data.context }</p>
            {this.getImgComponent(this.props.data.thumbnailPic)}
            <p className="light-bottom">
              <span className="light-author">{ this.props.data.authorName }</span>
              <span>{ this.props.data.createDateStr }</span>
            </p>
          </div>
        </Link>
      </li>
    );
  },
  getImgComponent(thumbnailPic) {
    let thumbnailPicDom;
    if (thumbnailPic) {
      thumbnailPicDom = <img src={ thumbnailPic } />
    }
    return thumbnailPicDom;
  }
});

export default LightListItem;
