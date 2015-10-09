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
    // console.log('getall')
    let _this = this;
    this.getAjaxData(
      ajaxConfig.list, 
      { cid: cid, p: 1, trace: 'home', at: 7 },
      function(result) {
        _this.trigger(result.data.content, result.data.subChannel, result.cname, result.bid, 1, false);
      },
      function() {
        console.log('error')
      }
    );
  },
  onGetMore(cid, page, oldList){
    // console.log('getmore')
    let _this = this;
    this.getAjaxData(
      ajaxConfig.list, 
      { cid: cid, p: page, trace: 'home', at: 7 },
      function(result) {
        console.log(result)
        _this.trigger(oldList.concat(result.data.content), result.data.subChannel, result.cname, result.bid, page, false);
      },
      function() {
        console.log('error')
        _this.trigger(false)
      }
    );
  },
})

export default ListStore;