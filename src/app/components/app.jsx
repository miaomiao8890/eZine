'use strict';

import React from 'react';
import GridMenu from './gridMenu.jsx';

let App = React.createClass({
  render() {
    return (
      <div className="grid-box">
        <GridMenu />
      </div>
    );
  }
});

export default App;