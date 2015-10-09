'use strict';

import React from 'react';
import GridItem from './GridItem.jsx';

import AjaxMixin from '../mixins/AjaxMixin.js';
import ajaxConfig from '../util/ajaxConfig.js';

const GridList = React.createClass({

  mixins: [AjaxMixin],

  getInitialState() {
    return {
      grids: []
    };
  },
  componentDidMount() {
    let _this = this
        ,url;
    //reset
    localStorage.setItem("data", "");

    if (_this.getViewType()) {
      url = ajaxConfig.indexPreview;
    } else {
      url = ajaxConfig.index;
    }

    this.getAjaxData(
      url, {}, function(result) {
        if (_this.isMounted()) {
          _this.setState({
            grids: result.data
          });
        }
      }
    );
  },
  render() {
    let gridNodes = this.state.grids.map(grid => (
      <GridItem 
        key={ grid.id } 
        cid={ grid.id } 
        name={ grid.name } 
        icon={ grid.icon }
        listViewType={ grid.listViewType }
      />
    ));
    return (
      <ul className="grid-list clearfix">
        { gridNodes }
      </ul>
    );
  },
  getViewType() {
    let type = document.getElementsByTagName("body")[0];
    
    return type.dataset.type;
  }
});
export default GridList;