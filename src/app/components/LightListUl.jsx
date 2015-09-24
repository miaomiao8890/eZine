'use strict';

import React from 'react';
import LightListItem from './LightListItem.jsx';

const LightListUl = React.createClass({
  render() {
    let lightNodes = this.props.list.map(item => (
      <LightListItem key={item.objectId} data={item}  cid={this.props.cid} bid={this.props.bid}/>
    ));
    return (
      <ul className="light-list">
        { lightNodes }
      </ul>
    );
  }
});

export default LightListUl;