'use strict';

import React from 'react';
import LightListItem from './LightListItem.jsx';

const LightListUl = React.createClass({
  render() {
    let lightNodes = this.props.list.map(item => (
      <LightListItem key={ item.objectId } data={ item } />
    ));
    return (
      <div className="light-box">
        <ul className="light-list">
          { lightNodes }
        </ul>
        <div className="more">页面加载中...</div>
      </div>
    );
  }
});

export default LightListUl;