'use strict';

let StorageMixin = {
  
  componentDidUpdate() {
    let list = document.getElementsByTagName('a');
    if (list.length > 5){
      for (var i = list.length - 1; i >= 0; i--) {
        list[i].addEventListener('click', this.setData);
      };
    }
    if (this.state.scrollPosition > 0) {
      window.scroll(0, this.state.scrollPosition);
    }
  },
  setData() {
    let data = {
      cid: this.props.params.cid,
      position: document.body.scrollTop,
      list: this.state.newslist,
      cname: this.state.cname,
      bid: this.state.bid,
      page: this.state.page,
    }
    if (this.state.subject) {
      data.subject = this.state.subject;
    }
    if (this.state.navlist) {
      data.navlist = this.state.navlist;
    }
    localStorage.setItem("data", JSON.stringify(data));  
  },
  getData() {
    if (localStorage.getItem("data")) {
      let data = JSON.parse(localStorage.getItem("data"));
      return data;
    } else {
      return false;
    }
  },
  componentWillUnmount() {

  }
};
export default StorageMixin;
