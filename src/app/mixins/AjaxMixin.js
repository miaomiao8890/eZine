'use strict';

let AjaxMixin = {
  getAjaxData(url, data, callback, error) {
    var geturl = this.getUrl(url, data);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
      if(xhr.readyState == 4){
        if((xhr.status>=200 && xhr.status<300) || xhr.status==304 ){
          var responseObj = JSON.parse(xhr.responseText);
          callback(responseObj);
        } else {
          error();
        }
      }
    };
    xhr.open("get", geturl, true);
    xhr.send(null);
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
