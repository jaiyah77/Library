/**
 * horizontalBox
 * Created by Moon Kyung tae on 2016-11-23.
 */

import helper from "./modules/helper.js";
import dic from "./modules/dic.js";

class horizontalBox {
	constructor(node, param, callback){
		// this.store = [];
		this.options = $.extend({}, {
			autoPlay: false,
			control: false,
			callback: null,
			flick: false,
			flickPanelName: '.flick-panel',
			indicator: false,
			indicatorType: 'dot',
			item: '> ul > li',
			loop: true,
			momentum: true,
			navi: '',
			playSpeed: 8000,
			start: 0,
			startX: 0,
			snap: false,
			ui: 'scroll'
		}, param);
		this.wrapper = $(node);
		this.detect = {
			scroller: 'null',
			bounceTime: 400,
			directionX: '',
			distanceX: 0,
			startTime: 0,
			endTime: 0,
			enabled: false,
			flickCount: 0,
			flickSize: 0,
			flickList: [],
			flickEnabled: false,
			flickPositionNumber: null,
			hasHorizontalScroll: false,
			isInflick: false,
			isScrolling: false,
			isInTransition: false,
			isMobile: false,
			itemLength: 0,
			itemList: [],
			itemLeftPositon: [],
			itemRightPositon: [],
			maxScrollX: 0,
			naviTarget: null,
			pointX: 0,
			pointY: 0,
			snapId: 0,
			startX: 0,
			scrollerWidth: 0,
			wrapperOffset: null,
			wrapperWidth: 0,
			x: 0
		};
		this.init();
	};
	
	init(){
		this.detect.isMobile = dic.isMobile;
		this.setScroll();
		this.setEvents();
		
		// this.refresh();
		// this.startPosition();
		//
		// if(this.options.ui == 'flick' || this.options.ui == 'card'){
		// 	this.initFlick(this);
		// }
	}
	
	setEvents(){
		$(window).on('orientationchange resize', this.resize);
		
		$(document).on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', '[data-ui="horizontalBox"] .scroller', this.transitionEnd);
		
		if(!this.detect.isMobile){
			// $(document).on('mousedown', '[data-ui="horizontalBox"] .scroller', this.start);
			
			// $(document).on('mousemove', '[data-ui="horizontalBox"] .scroller', this.move);
			// $(document).on('mousecancel mouseup', '[data-ui="horizontalBox"] .scroller', this.end);
			return;
		}
		
		$(document).on('touchstart', '[data-ui="horizontalBox"] .scroller', this.start);
		// $(document).on('touchmove', '[data-ui="horizontalBox"] .scroller', this.move);
		// $(document).on('touchcancel touchend', '[data-ui="horizontalBox"] .scroller', this.end);
	}
	
	setScroll(){
		this.wrapper.prepend('<div class="scroller"></div>');
		this.scroller = this.wrapper.find('>.scroller');
		this.scroller.nextAll().appendTo(this.scroller);
		
		var items = this.scroller.find(this.options.item),
			left = 0,
			right = 0;
		
		this.detect.itemLength = items.length;
		
		for(var i = 0; i < this.detect.itemLength; i++){
			left = (i == 0) ? 0 : left + $(items[i]).prev().outerWidth(true);
			right = left + $(items[i]).outerWidth(true);
			this.detect.itemLeftPositon.push(-left);
			this.detect.itemRightPositon.push(-right);
			
			this.detect.scrollerWidth += $(items[i]).outerWidth(true);
		}
		
		if(!this.options.ui.match(/flick|card/i)){
			this.scroller.css({'width': (this.detect.scrollerWidth)});
		}
	}
	
	transitionEnd(){
		var moveTarget = (this.options.ui == "flick" || this.options.ui == "card") ? this.scroller.find('>' + this.options.flickPanelName) : this.scroller;
		this._transitionTime(moveTarget);
		this.detect.isInTransition = false;
	}
	
	start(e){
		e.stopPropagation();
		
		console.dir(this);
		
		
		if((this.options.ui == "scroll") && !this.detect.hasHorizontalScroll){
			this.detect.enabled = false;
			return;
		}
		
		if((this.options.ui == "flick" || this.options.ui == 'card') && this.detect.isInflick){
			return;
		}
		
		this.detect.startTime = this.utils._getTime();
		this.detect.isScrolling = false;
		this.detect.enabled = true;
		
		if(this.detect.isInTransition){
			this._stop();
		}
		
		var point = e.originalEvent.touches ? e.originalEvent.touches[0] : e.originalEvent;
		
		this.detect.distanceX = 0;
		this.detect.distanceY = 0;
		this.detect.startX = this.detect.x;
		this.detect.pointX = point.pageX;
		this.detect.pointY = point.pageY;
	}
}

new horizontalBox('[data-ui="horizontalBox"]', {}, function(){
	console.log(1);
});
