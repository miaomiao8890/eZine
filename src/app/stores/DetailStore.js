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
        // _this.trigger(result.data);
        _this.getAjaxData(
          ajaxConfig.hotwords, 
          { group: 1 },
          function(result) {
            _data.hotwordslist = result.data.list;
            _this.trigger(_data);
          }
        )
      }
    );
  }
})

export default DetailStore;