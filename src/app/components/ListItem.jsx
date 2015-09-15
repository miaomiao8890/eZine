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
      
      <li className="news-item clearfix">
        <Link to={`/detail/`} params={ {cid:1,bid:2} }>
          { this.getImgComponent(this.props.data.thumbnailPic) }
          <div className="news-info" style={ this.state.style }>
            { this.getTitleComponent(this.props.data.title) }
            <p className="news-bottom">
              <span>{ this.props.data.createDateStr }</span>
              <span className="news-author">{ this.props.data.authorName }</span>
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
  },
  getTitleComponent(title) {
    let titleDom;
    if (!title) {
      titleDom = <p className="news-context">{ this.props.data.context }</p>
    } else {
      titleDom = <p className="news-title">{ this.props.data.title }</p>
    }
    return titleDom;
  }
});

export default ListItem;
