'use strict';

import React from 'react';
import ListItem from './ListItem.jsx';

const ListUl = React.createClass({
  render() {
    let newsNodes = this.props.newslist.map(news => {
      if (news.sourceType == 6) {
        return <li className="subject-type6">{news.context}</li>
      } else if (news.sourceType != 6 && news.sourceType !=7){
        return <ListItem 
          key={news.objectId} 
          data={news} 
          cid={this.props.cid} 
          bid={this.props.bid} 
          viewType={this.props.viewType} 
          isRecommend={this.props.isRecommend}
        />
      }
    });
    return (
      <ul className="news-list">
        {newsNodes}
      </ul>
    );
  }
});

export default ListUl;