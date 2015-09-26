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
    this.timerAnimate = null;

    this.calculate();
    this.getRequestAnimationFrame();
    
    document.querySelector('.beauty-img').style.display = "block";
    this.slide(this.ul, this.leftSlide, this.rightSlide);
  },
  calculate: function() {
    this.ul = document.querySelector('.beauty-img-ul');
    this.liAry = this.ul.getElementsByTagName('li');
    this.aryLength = this.liAry.length;
    this.ul.style.width = this.liAry.length * this.w_width + 'px';
    this.ul.style.height = this.w_height + 'px';
    this.ul.style.webkitTransform = 'translate('+ (-this.index * this.w_width) + 'px)';
    this.current = Number(this.ul.style.webkitTransform.match(/\-?[0-9]+/g));;
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
      var touch = event.touches[0];
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
        if (_this.endPos.x > 60) {
          if (_this.index > 0) {
            // if (_this.navNode.style.display != 'none') {
            //   _this.navNode.style.display = 'none';
            // }
            // requestAnimationFrame(rightcallback.bind(_this));

            _this.timerAnimate = setInterval(function(){
              var cur = Number(_this.ul.style.webkitTransform.match(/\-?[0-9]+/g));
              var newCur = _this.current + _this.w_width;
              _this.ul.style.webkitTransform = 'translate(' + (cur + 50) + 'px)';
              if ((cur + 50) >= newCur) {
                clearInterval(_this.timerAnimate);
                _this.ul.style.webkitTransform = 'translate('+newCur + 'px)';
                _this.current = newCur;
              }
            }, 30);

            _this.index--
            _this.changeNavTitle();
          }
        } else if (_this.endPos.x < -60) {
          if (_this.aryLength < _this.liAry.length) {
            _this.isGetMore = false;
            _this.calculate();
          }
          if (_this.index < _this.liAry.length-1) {
            // if (_this.navNode.style.display != 'none') {
            //   _this.navNode.style.display = 'none';
            // }
            // requestAnimationFrame(leftcallback.bind(_this));

            _this.timerAnimate = setInterval(function(){
              var cur = Number(_this.ul.style.webkitTransform.match(/\-?[0-9]+/g));
              var newCur = _this.current - _this.w_width;
              _this.ul.style.webkitTransform = 'translate(' + (cur - 50) + 'px)';
              if ((cur - 50) <= newCur) {
                clearInterval(_this.timerAnimate);
                _this.ul.style.webkitTransform = 'translate('+newCur + 'px)';
                _this.current = newCur;
                if (_this.isGetMore) {
                  _this.getMore();
                }
              }
            }, 30);

            _this.index++
            _this.changeNavTitle();
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
    var cur = Number(this.ul.style.webkitTransform.match(/\-?[0-9]+/g));
    var newCur = this.current - this.w_width;
    this.ul.style.webkitTransform = 'translate(' + (cur - 40) + 'px)';

    if ((cur - 40) > newCur) {
      requestAnimationFrame(this.leftSlide.bind(this));
    } else {
      this.ul.style.webkitTransform = 'translate(' + newCur + 'px)';
      this.current = newCur;
      if (this.isGetMore) {
        this.getMore();
      }
    }
  },
  rightSlide: function() {
    var cur = Number(this.ul.style.webkitTransform.match(/\-?[0-9]+/g));
    var newCur = this.current + this.w_width;
    this.ul.style.webkitTransform = 'translate(' + (cur + 40) + 'px)';
    if ((cur + 40) < newCur) {
      requestAnimationFrame(this.rightSlide.bind(this));
    } else {
      this.ul.style.webkitTransform = 'translate(' + newCur + 'px)';
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
  getRequestAnimationFrame: function() {
    var lastTime = 0;
    var vendors = [ 'ms', 'moz', 'webkit', 'o' ];

    for ( var x = 0; x < vendors.length && !window.requestAnimationFrame; ++ x ) {
      window.requestAnimationFrame = window[ vendors[ x ] + 'RequestAnimationFrame' ];
      window.cancelAnimationFrame = window[ vendors[ x ] + 'CancelAnimationFrame' ] || window[ vendors[ x ] + 'CancelRequestAnimationFrame' ];
    }

    if ( !window.requestAnimationFrame ) {
      window.requestAnimationFrame = function ( callback, element ) {
        var currTime = Date.now(), timeToCall = Math.max( 0, frame_time - ( currTime - lastTime ) );
        var id = window.setTimeout( function() { callback( currTime + timeToCall ); }, timeToCall );
        lastTime = currTime + timeToCall;
        return id;
      };
    }

    if ( !window.cancelAnimationFrame ) {
      window.cancelAnimationFrame = function ( id ) { clearTimeout( id ); };
    }
  }
}

module.exports = slideImg;