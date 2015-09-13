'use strict';

import React from 'react';
import BeautyItem from './BeautyItem.jsx';

const BeautyList = React.createClass({
  render() {

    let ulList = sliceArray(this.props.beautylist);

    let beautyNodes1 = ulList[0].map(beauty => (
      <BeautyItem key={ beauty.objectId } data={ beauty } />
    ));
    let beautyNodes2 = ulList[1].map(beauty => (
      <BeautyItem key={ beauty.objectId } data={ beauty } />
    ));
    // console.log("a------>:"+beautylist.length)
    // console.log("b------>:"+this.props.beautylist.length)
    return (
      <div className="beauty-box clearfix">
        <ul className="beauty-list1">
          { beautyNodes1 }
        </ul>
        <ul className="beauty-list1">
          { beautyNodes2 }
        </ul>
      </div>
    );
  }
});

export default BeautyList;