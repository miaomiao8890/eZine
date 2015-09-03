'use strict';

import React from 'react';

const GridItem = React.createClass({
  render() {
    let id = this.props.key;
    let name = this.props.name;
    return (
      <li className="grid-item" id={ "grid-item-" + id }>{ name }</li>
    );
  }
});

export default GridItem;
