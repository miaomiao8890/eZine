'use strict';

import React from 'react';

const HeaderBar = React.createClass({
  handleBackBtn() {
    window.history.go(-1);
  },
  render() {
    return (
      <header className="header-bar">
        <i className="back-btn" onClick={ this.handleBackBtn }></i>{ this.props.cname }
      </header>
    );
  }
});

export default HeaderBar;