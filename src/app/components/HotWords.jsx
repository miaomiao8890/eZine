'use strict';

import React from 'react';

let HotWords = React.createClass({
  render() {
    let hotwordsNode = this.props.hotwordslist.slice(0,6).map(item => (
      <li key={ item.url } className="hot-words-item">
        <a href={ item.url }>{ item.word }</a>
      </li>
    ));

    return (
      <div className="hot-words">
        <div className="hot-words-header">
          <i className="change-hot" onClick={ this.props.handleChangeFn }>换一换</i>今日热词
        </div>
        <ul className="hot-words-list clearfix">
          { hotwordsNode }
        </ul>
      </div>
    );
  }
});

export default HotWords;