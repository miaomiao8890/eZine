'use strict';

let ScrollMixin = {
  getInitialState() {
    return {
      isLock: false
    };
  },
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  },
  handleScroll() {
      var wh = document.documentElement.clientHeight;
      var st = document.body.scrollTop;
      var h = document.body.scrollHeight;
      if(st+wh>h-10 && !this.state.isLock){
        this.setState({ 
          isLock: true,
          morestyle: {
            display: 'block'
          }
        });
        window.scroll(0,st+wh)
        this.getMoreData();
      }

      // if(document.body.scrollTop > document.body.scrollHeight - document.body.offsetHeight - 30 && !this.state.isLock) {
      //   this.setState({ 
      //     isLock: true,
      //     morestyle: {
      //       display: 'block'
      //     }
      //   });
      //   this.getMoreData();
      // }
  },
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
};
export default ScrollMixin;
