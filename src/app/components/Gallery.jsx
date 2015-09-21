import React from 'react';
import reactMasonryComponent from 'react-masonry-component';

let Masonry = reactMasonryComponent(React)
let masonryOptions = {
  transitionDuration: 1
};

const Gallery = React.createClass({
  getInitialState() {
    return {
      masonryStyle: {
        "display": "none"
      }
    };
  },
  render() {
    let childElements = this.props.elements.map((element, index) => (
      <li className="image-element-class" data-index={index} data-title={element.title} >
        <img src={element.waterfallPic} onClick={()=>this.props.handleClickFn(index)} />
      </li>
    ));

    return (
      <Masonry
        className={'my-gallery-class'} // default '' 
        elementType={'ul'} // default 'div' 
        options={masonryOptions} // default {} 
        disableImagesLoaded={false} // default false 
        style={this.state.masonryStyle}
      >
        {childElements}
      </Masonry>
    );
  }
});

export default Gallery;