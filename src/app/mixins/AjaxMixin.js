'use strict';

import ajax from 'ajax-easy';

let AjaxMixin = {
  getAjaxData(url, data, callback) {
    ajax({
      url: url,
      data: data,
      success(result) {
        callback(result);
      },
      fail(result) {
        console.log(result)
      }
    });
  }
};
export default AjaxMixin;
