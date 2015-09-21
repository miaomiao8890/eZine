'use strict';

import ajax from 'ajax-easy';

let AjaxMixin = {
  getAjaxData(url, data, callback) {
    var geturl = this.getUrl(url, data);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
      if(xhr.readyState == 4){
        if((xhr.status>=200 && xhr.status<300) || xhr.status==304 ){
          var responseObj = JSON.parse(xhr.responseText);
          callback(responseObj);
        }
      }
    };
    xhr.open("get", geturl, true);
    xhr.send(null);
  },
  getAjaxDataByEasy(url, data, callback) {
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
  },
  getUrl(url, data) {
    url += "?";
    for (var i in data) {
      url += i;
      url += "=";
      url += data[i]
      url += "&"
    }
    url = url.substring(0, url.length-1);
    return url;
  }

};
export default AjaxMixin;
