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
    let childElements = this.props.elements.map(element => (
      <li className="image-element-class">
        <img src={element.waterfallPic} />
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