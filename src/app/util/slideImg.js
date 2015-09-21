'use strict';

var slideImg = {
  init: function(index, getMorecallback) {
    this.w_width = document.body.clientWidth;
    this.w_height = document.body.clientHeight;
    this.navNode = document.querySelector(".header-bar-img");
    this.index = index;
    this.getMore = getMorecallback;
    this.startPos = {};
    this.endPos = {};
    this.isGetMore = false;

    this.calculate();
    
    document.querySelector('.beauty-img').style.display = "block";
    this.slide(this.ul, this.leftSlide, this.rightSlide);
  },
  calculate: function() {
    this.ul = document.querySelector('.beauty-img-ul');
    this.liAry = this.ul.getElementsByTagName('li');
    this.aryLength = this.liAry.length;
    this.ul.style.width = this.liAry.length * this.w_width + 'px';
    this.ul.style.height = this.w_height + 'px';
    this.ul.style.left = -this.index * this.w_width + 'px';
    this.current = Number(this.ul.style.left.match(/\-?[0-9]+/g));;
    for (var i = 0; i < this.liAry.length; i++) {
      this.liAry[i].style.width = this.w_width + 'px';
      this.liAry[i].style.height = this.w_height + 'px';
    }
    this.changeNavTitle();
  },
  //滑动
  slide: function(obj, leftcallback, rightcallback) {
    var _this = this;
    if(("ontouchstart" in window) || window.DocumentTouch && document instanceof DocumentTouch) 
      obj.addEventListener('touchstart',start,false);
    document.querySelector('.back-btn-img').addEventListener('click',function() {
      document.querySelector('.beauty-img').style.display = 'none';
      obj.removeEventListener('touchstart',start,false);
    });
    function start(event){
      //event.preventDefault();
      var touch = event.touches[0]; // 取第一个touch的坐标值
      _this.startPos = {                                 
        x: touch.pageX,
        y: touch.pageY,
        time: +new Date
      };
      _this.endPos = {x:0,y:0};
      obj.addEventListener('touchmove',move,false);
      obj.addEventListener('touchend',end,false);
    }
    function move(event){
      event.preventDefault();
      if (event.touches.length > 1 || event.scale && event.scale !== 1) return;
      
      var touch = event.touches[0];
      _this.endPos = {
        x: touch.pageX - _this.startPos.x,
        y: touch.pageY - _this.startPos.y
      };          
    }
    function end(event){
      var duration = +new Date - _this.startPos.time; 
      if (Number(duration) > 100) {
        // 判断是左移还是右移，当偏移量大于50时执行
        if (_this.endPos.x > 50) {
          if (_this.index > 0) {
            if (_this.navNode.style.display != 'none') {
              _this.navNode.style.display = 'none';
            }
            requestAnimationFrame(rightcallback.bind(_this));
            _this.index--
          }
        } else if (_this.endPos.x < -50) {
          // console.log('index:'+_this.index)
          // console.log('liAry:'+_this.liAry.length)
          if (_this.aryLength < _this.liAry.length) {
            _this.isGetMore = false;
            _this.calculate();
          }
          if (_this.index < _this.liAry.length-1) {
            if (_this.navNode.style.display != 'none') {
              _this.navNode.style.display = 'none';
            }
            requestAnimationFrame(leftcallback.bind(_this));
            _this.index++
          }
          if (_this.index == _this.liAry.length-2) {
            _this.isGetMore = true;
          }
        } else if (_this.endPos.x > -50 && _this.endPos.x < 50) {
          _this.toggleNav();
        }
      } else {
        _this.toggleNav();
      }
      obj.removeEventListener('touchmove',move,false);
      obj.removeEventListener('touchend',end,false);
    }
  },
  leftSlide: function() {
    var cur = Number(this.ul.style.left.match(/\-?[0-9]+/g));
    var newCur = this.current - this.w_width;
    this.ul.style.left = (cur - 25) + 'px';

    if ((cur - 25) > newCur) {
      requestAnimationFrame(this.leftSlide.bind(this));
    } else {
      this.ul.style.left = newCur + 'px';
      this.current = newCur;
      if (this.isGetMore) {
        this.getMore();
      }
    }
  },
  rightSlide: function() {
    var cur = Number(this.ul.style.left.match(/\-?[0-9]+/g));
    var newCur = this.current + this.w_width;
    this.ul.style.left = (cur + 25) + 'px';
    if ((cur + 25) < newCur) {
      requestAnimationFrame(this.rightSlide.bind(this));
    } else {
      this.ul.style.left = newCur + 'px';
      this.current = newCur;
    }
  },
  toggleNav: function() {
    if (this.navNode.style.display == 'none') {
      this.changeNavTitle();
      this.navNode.style.display = 'block';
    } else {
      this.navNode.style.display = 'none';
    }
  },
  changeNavTitle: function() {
    var navTitle = document.querySelectorAll('.image-element-class')[this.index].dataset.title;
    navTitle = navTitle ? navTitle : '';
    document.getElementById("img-title").innerText = navTitle;
  },
  hideImg: function() {
    
  }
}

module.exports = slideImg;