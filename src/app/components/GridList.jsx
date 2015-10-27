'use strict';

import React from 'react';
import Reflux from 'reflux';
import GridItem from './GridItem.jsx';

import StorageMixin from '../mixins/StorageMixin.js';
import AjaxMixin from '../mixins/AjaxMixin.js';
import ajaxConfig from '../util/ajaxConfig.js';
import ListAction from '../actions/ListAction';
import ListStore from '../stores/ListStore';

const GridList = React.createClass({

  mixins: [
    StorageMixin,
    AjaxMixin,
    Reflux.connect(ListStore, 'list'), 
    Reflux.listenTo(ListStore, 'onStatusChange'),
  ],

  getInitialState() {
    let initialData = this.getData("indexData");
    if (!initialData || initialData == "") {
      return {
        grids: []
      };
    } else {
      return {
        grids: initialData.data
      };
    }
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
    // clear localStorage
    for(var i=localStorage.length - 1 ; i >=0; i--){
      localStorage.removeItem(localStorage.key(i));
    }
    if (!_this.getData("indexData")) {
      this.getAjaxData(
        url, {}, function(result) {
          if (_this.isMounted()) {
            _this.setState({
              grids: result.data
            });
          }
          localStorage.setItem("indexData", JSON.stringify(result));
        }
      );
    }
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
  onStatusChange(data, subChannel, cname, bid, page, isLock, hotword, url, cid) {
    document.querySelector(".loading-bar").style.display = "none";
    let preData = {};
    preData.data = data;
    preData.subChannel = subChannel;
    preData.cname = cname;
    preData.bid = bid;
    preData.page = page;
    preData.isLock = isLock;
    preData.hotword = hotword;
    localStorage.setItem("preListData"+cid, JSON.stringify(preData));
    window.scroll(0,0);
    window.location.href = url;
  }
});
export default GridList;