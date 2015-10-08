'use strict';

import Reflux from 'reflux';
import DetailAction from '../actions/DetailAction';
import AjaxMixin from '../mixins/AjaxMixin.js';
import ajaxConfig from '../util/ajaxConfig.js';

const DetailStore = Reflux.createStore({

  listenables: [DetailAction],

  mixins: [AjaxMixin],

  onGetInfo(cid, bid, oid) {
    let _this = this;
    let _data = {};
    this.getAjaxData(
      ajaxConfig.detail, 
      { cid: cid, bid: bid, oid: oid },
      function(result) {
        _data.data = result.data;
        let group = localStorage.getItem("hotwordsPage") ? localStorage.getItem("hotwordsPage") : 1;
        // _this.trigger(result.data);
        _this.getAjaxData(
          ajaxConfig.hotwords, 
          { group: group },
          function(result) {
            _data.hotwordslist = result.data.list;
            _data.hotwordsGroup = result.data.nextGroup;
             
            _this.trigger(_data);
          }
        )
      }
    );
  }
})

export default DetailStore;