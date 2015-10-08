'use strict';

import Reflux from 'reflux';
import HotWordsAction from '../actions/HotWordsAction';
import AjaxMixin from '../mixins/AjaxMixin.js';
import ajaxConfig from '../util/ajaxConfig.js';

const HotWordsStore = Reflux.createStore({

  listenables: [HotWordsAction],

  mixins: [AjaxMixin],

  onChangeItem(group){
    let _this = this;

    this.getAjaxData(
      ajaxConfig.hotwords, 
      { group: group },
      function(result) {
        localStorage.setItem("hotwordsPage", group); 
        _this.trigger(result.data);
      }
    );
  }
})

export default HotWordsStore;