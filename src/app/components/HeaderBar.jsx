'use strict';

import React from 'react';
import { Link } from 'react-router';

const HeaderBar = React.createClass({
  handleBackBtn() {
    window.history.go(-1);
  },
  render() {
    return (
      <header className="header-bar">
        <i className="back-btn">
           <Link to={`/`}></Link>
        </i>{ this.props.cname }
      </header>
    );
  }
});

export default HeaderBar;