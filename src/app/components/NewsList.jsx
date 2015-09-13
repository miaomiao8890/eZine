'use strict';

import React from 'react';
import NewsItem from './NewsItem.jsx';

const NewsList = React.createClass({
  render() {
    let newsNodes = this.props.newslist.map(news => (
      <NewsItem key={ news.objectId } data={ news } />
    ));
    return (
      <div className="news-box">
        <ul className="news-list">
          { newsNodes }
        </ul>
        <div className="more">页面加载中...</div>
      </div>
    );
  }
});

export default NewsList;