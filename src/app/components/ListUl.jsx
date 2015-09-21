'use strict';

import React from 'react';
import ListItem from './ListItem.jsx';

const ListUl = React.createClass({
  render() {
    let newsNodes = this.props.newslist.map(news => (
      <ListItem key={news.objectId} data={news} cid={this.props.cid} bid={this.props.bid}/>
    ));
    return (
      <ul className="news-list">
        { newsNodes }
      </ul>
    );
  }
});

export default ListUl;