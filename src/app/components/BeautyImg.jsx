import React from 'react';

const BeautyImg = React.createClass({
  render() {
    let childElements = this.props.elements.map((element, index) => (
      <li>
        <span>
          <img src={element.middlePic} />
        </span>
      </li>
    ));

    return (
      <div className="beauty-img">
        <div className="header-bar-img">
          <i className="back-btn-img"></i>
          <span id="img-title"></span>
        </div>
        <ul className="beauty-img-ul clearfix">
          {childElements}
        </ul>
      </div>
    );
  }
});

export default BeautyImg;