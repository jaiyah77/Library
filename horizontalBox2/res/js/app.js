!function(t){function i(n){if(e[n])return e[n].exports;var o=e[n]={exports:{},id:n,loaded:!1};return t[n].call(o.exports,o,o.exports,i),o.loaded=!0,o.exports}var e={};return i.m=t,i.c=e,i.p="",i(0)}([function(t,i,e){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function o(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}var r=function(){function t(t,i){for(var e=0;e<i.length;e++){var n=i[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(i,e,n){return e&&t(i.prototype,e),n&&t(i,n),i}}(),s=e(1),a=(n(s),e(2)),l=n(a),c=function(){function t(i,e,n){o(this,t),this.options=$.extend({},{autoPlay:!1,control:!1,callback:null,flick:!1,flickPanelName:".flick-panel",indicator:!1,indicatorType:"dot",item:"> ul > li",loop:!0,momentum:!0,navi:"",playSpeed:8e3,start:0,startX:0,snap:!1,ui:"scroll"},e),this.wrapper=$(i),this.detect={scroller:"null",bounceTime:400,directionX:"",distanceX:0,startTime:0,endTime:0,enabled:!1,flickCount:0,flickSize:0,flickList:[],flickEnabled:!1,flickPositionNumber:null,hasHorizontalScroll:!1,isInflick:!1,isScrolling:!1,isInTransition:!1,isMobile:!1,itemLength:0,itemList:[],itemLeftPositon:[],itemRightPositon:[],maxScrollX:0,naviTarget:null,pointX:0,pointY:0,snapId:0,startX:0,scrollerWidth:0,wrapperOffset:null,wrapperWidth:0,x:0},this.init()}return r(t,[{key:"init",value:function(){this.detect.isMobile=l.default.isMobile,this.setScroll(),this.setEvents()}},{key:"setEvents",value:function(){$(window).on("orientationchange resize",this.resize),$(document).on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",'[data-ui="horizontalBox"] .scroller',this.transitionEnd),this.detect.isMobile&&$(document).on("touchstart",'[data-ui="horizontalBox"] .scroller',this.start)}},{key:"setScroll",value:function(){this.wrapper.prepend('<div class="scroller"></div>'),this.scroller=this.wrapper.find(">.scroller"),this.scroller.nextAll().appendTo(this.scroller);var t=this.scroller.find(this.options.item),i=0,e=0;this.detect.itemLength=t.length;for(var n=0;n<this.detect.itemLength;n++)i=0==n?0:i+$(t[n]).prev().outerWidth(!0),e=i+$(t[n]).outerWidth(!0),this.detect.itemLeftPositon.push(-i),this.detect.itemRightPositon.push(-e),this.detect.scrollerWidth+=$(t[n]).outerWidth(!0);this.options.ui.match(/flick|card/i)||this.scroller.css({width:this.detect.scrollerWidth})}},{key:"transitionEnd",value:function(){var t="flick"==this.options.ui||"card"==this.options.ui?this.scroller.find(">"+this.options.flickPanelName):this.scroller;this._transitionTime(t),this.detect.isInTransition=!1}},{key:"start",value:function(t){if(t.stopPropagation(),console.dir(this),"scroll"==this.options.ui&&!this.detect.hasHorizontalScroll)return void(this.detect.enabled=!1);if("flick"!=this.options.ui&&"card"!=this.options.ui||!this.detect.isInflick){this.detect.startTime=this.utils._getTime(),this.detect.isScrolling=!1,this.detect.enabled=!0,this.detect.isInTransition&&this._stop();var i=t.originalEvent.touches?t.originalEvent.touches[0]:t.originalEvent;this.detect.distanceX=0,this.detect.distanceY=0,this.detect.startX=this.detect.x,this.detect.pointX=i.pageX,this.detect.pointY=i.pageY}}}]),t}();new c('[data-ui="horizontalBox"]',{},function(){console.log(1)})},function(t,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var e={getTrueKey:function(t){for(var i in t)if(t[i])return i;return!1},getTime:Date.now||function(){return(new Date).getTime()}};i.default=e},function(t,i,e){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(i,"__esModule",{value:!0});var o=e(1),r=n(o),s={vendor:function(){for(var t=["transform","webkitTransform","MozTransform","msTransform","OTransform"],i=0,e=t.length;i<e;i++)if(t[i]in document.createElement("div").style)return t[i].substr(0,t[i].length-9);return!1}(),isMobile:function(){var t=navigator.userAgent;return r.default.getTrueKey({android:t.match(/Android/i),blackberry:t.match(/BlackBerry/i),opera:t.match(/Opera Mini/i),window:t.match(/IEMobile/i),ios:t.match(/iPhone|iPad|iPod/i)})}(),isBadAndroid:/Android /.test(window.navigator.appVersion)&&!/Chrome\/\d/.test(window.navigator.appVersion)};i.default=s}]);
//# sourceMappingURL=app.js.map