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
      if(document.body.scrollTop > document.body.scrollHeight - document.body.offsetHeight - 5 && !this.state.isLock) {
        this.setState({ 
          isLock: true
        });
        this.getMoreData();
      }
  },
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
};
export default ScrollMixin;
