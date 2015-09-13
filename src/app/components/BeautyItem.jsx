'use strict';

import React from 'react';
import { Link } from 'react-router';

const BeautyItem = React.createClass({
  render() {
    return (
      <li>
        <img src={ this.props.data.waterfallPic } />
      </li>
    );
  }
});

export default BeautyItem;