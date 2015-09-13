'use strict';

import React from 'react';
import { Link } from 'react-router';

const GridItem = React.createClass({
  getInitialState() {
    return {
      height: 0
    };
  },
  componentDidMount() {
    this.setState({ 
      height: document.body.scrollWidth/3
    });
  },
  render() {
    let cid = this.props.cid;
    let listViewType = this.props.listViewType;
    return (
      <li className="grid-item" id={ "grid-item-" + cid } style={ this.state }>
        <Link to={`/${listViewType}/${cid}`}>
          <img src={ this.props.icon } width="100%" />
          <p className="grid-title">{ this.props.name }</p>
        </Link>
      </li>
    );
  }
});

export default GridItem;
