'use strict';

import React from 'react';
import { Link } from 'react-router';

const LightListItem = React.createClass({
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
          <a href={"/go.do?st="+this.props.data.sourceType+"&url="+this.props.data.url}>
            {context}
          </a>
        </li>
      );
    } else {
      return (
        <li className="light-item">
          <Link to={`/detail/`} query={{ 
            cid: this.props.cid, 
            bid: this.props.bid, 
            oid: this.props.data.objectId,
            viewType: 'light'
          }} >
            {context}
          </Link>
        </li>
      );
    }
  }
});

export default LightListItem;
