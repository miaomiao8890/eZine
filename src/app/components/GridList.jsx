'use strict';

import React from 'react';
import Reflux from 'reflux';
import GridItem from './GridItem.jsx';

import AjaxMixin from '../mixins/AjaxMixin.js';
import ajaxConfig from '../util/ajaxConfig.js';
import ListAction from '../actions/ListAction';
import ListStore from '../stores/ListStore';

const GridList = React.createClass({

  mixins: [
    AjaxMixin,
    Reflux.connect(ListStore, 'list'), 
    Reflux.listenTo(ListStore, 'onStatusChange'),
  ],

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
  },
  onStatusChange(data, subChannel, cname, bid, page, isLock, hotword, url) {
    let preData = {};
    preData.data = data;
    preData.subChannel = subChannel;
    preData.cname = cname;
    preData.bid = bid;
    preData.page = page;
    preData.isLock = isLock;
    preData.hotword = hotword;
    localStorage.setItem("preListData", JSON.stringify(preData));
    window.scroll(0,0);
    window.location.href = url;
  }
});
export default GridList;