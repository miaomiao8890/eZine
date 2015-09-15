'use strict';

import Reflux from 'reflux';
import ajax from 'ajax-easy';
import ListAction from '../actions/ListAction';
import AjaxMixin from '../mixins/AjaxMixin.js';
import ajaxConfig from '../util/ajaxConfig.js';

const ListStore = Reflux.createStore({

  listenables: [ListAction],

  mixins: [AjaxMixin],

  onGetAll(cid) {
    let _this = this;
    this.getAjaxData(
      ajaxConfig.list, 
      { cid: cid, p: 1 },
      function(result) {
        _this.trigger(result.data, result.cname, 1, false);
      }
    );
  },
  onGetMore(cid, page, oldList){
    let _this = this;
    this.getAjaxData(
      ajaxConfig.list, 
      { cid: cid, p: page },
      function(result) {
        _this.trigger(oldList.concat(result.data), result.cname, page, false);
      }
    );
  },
})

export default ListStore;