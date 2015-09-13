'use strict';

import React from 'react';
import GridList from './GridList.jsx';

const App = React.createClass({
  getInitialState() {
    return {
      title: "新鲜事儿"
    }
  },
  render() {
    return (
      <div id="app" className="full-height">
        <div className="grid-box">
          <GridList />
        </div>
      </div>
    );
  }
});

export default App;