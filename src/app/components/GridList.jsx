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
    let _this = this;
    //reset
    localStorage.setItem("data", "");

    this.getAjaxData(
      ajaxConfig.index, {}, function(result) {
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
  }
});

export default GridList;