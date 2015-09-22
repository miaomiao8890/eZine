'use strict';

import Reflux from 'reflux';
import ajax from 'ajax-easy';
import BeautyAction from '../actions/BeautyAction';
import AjaxMixin from '../mixins/AjaxMixin.js';
import ajaxConfig from '../util/ajaxConfig.js';

const BeautyStore = Reflux.createStore({

  listenables: [BeautyAction],

  mixins: [AjaxMixin],

  onGetAll(cid) {
    let _this = this;
    this.getAjaxData(
      ajaxConfig.list, 
      { cid: cid, p: 1 },
      function(result) {
        _this.trigger(
          result.data.content, 
          result.data.subChannel, 
          result.cname, 
          result.bid, 
          1, 
          false
        );
      }
    );
  },
  onGetMore(cid, page, oldList){
    let _this = this;
    this.getAjaxData(
      ajaxConfig.list, 
      { cid: cid, p: page },
      function(result) {
        _this.trigger(
          oldList.concat(result.data.content), 
          result.data.subChannel, 
          result.cname, 
          page, 
          false
        );
      }
    );
  },
})

export default BeautyStore;