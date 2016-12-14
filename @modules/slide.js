/**
 * Created by MOON KYUNG TAE
 */

(function(exports){
	var moduleName = 'slide';
	
	var MyModule = function(options){
		
		if(!container.length){
			return;
		}
		
		var scope = this;
		
		this.detect = {
			isPlay: false,
			style: {},
			isInTransition: false,
			x: 0,
			pointX: 0,
			store: []
		};
		
		this.config = {
			start: 0,
			auto: false,
			item: '.slide-item'
		};
		
		this.dirValue = {
			'left': 100,
			'right': -100
		};
		
		$.extend(this.config, options);
		
		if(this.config.auto){
			auto();
		}
		
		$(config.item).each(function(){
			scope.detect.store.push($(this));
			$(this).remove();
		});
		$(container).append(this.detect.store[0]);
		
		
		this.detect.min = 0;
		this.detect.max = this.detect.store.length - 1;
		this.detect.current = config.start;
		this.detect.transform = this.detect.style['transform'] = demoon.helper.hasProperty('transform');
		this.detect.style['transitionTimingFunction'] = demoon.helper.hasProperty('transitionTimingFunction');
		this.detect.style['transitionDuration'] = demoon.helper.hasProperty('transitionDuration');
		
		$(document)
			.on('click', '[data-ctrl="prev"], [data-slide], [data-ctrl="prev"], [data-ctrl="next"], [data-ctrl="play"], [data-ctrl="stop"]', function(e){
				e.preventDefault();
			})
			.on('click', '[data-slide]', function(){
				var index = $(this).attr('data-slide');
				if(this.detect.current == index){
					return;
				}
				slideTo(index);
			})
			.on('click', '[data-ctrl="prev"]', prev)
			.on('click', '[data-ctrl="next"]', next)
			.on('click', '[data-ctrl="play"]', auto)
			.on('click', '[data-ctrl="stop"]', stop);
		
		function slideTo(index, dir){
			if(detect.item.is(':animated')){
				return;
			}
			
			var to = direction(index, dir),
				speed = 500,
				func = 'cubic-bezier(0.1, 0.54, 0.4, 1)';
			
			if(detect.transform){
				if(detect.isInTransition){
					return;
				}
				
				detect.isInTransition = true;
				
				detect.item.eq(detect.current).css(detect.style.transitionDuration, speed + "ms");
				detect.item.eq(index).css(detect.style.transitionDuration, speed + "ms");
				detect.item.eq(detect.current).css(detect.style.transitionTimingFunction, func);
				detect.item.eq(index).css(detect.style.transitionTimingFunction, func);
				detect.item.eq(index).css(detect.style.transform, 'translate3d(' + dirValue[to] + '%, 0, 0)').addClass('active');
				
				setTimeout(function(){
					detect.item.eq(index).css(detect.style.transform, 'translate3d( 0, 0, 0)');
					detect.item.eq(detect.current).css(detect.style.transform, 'translate3d(' + -dirValue[to] + '%, 0, 0)');
				}, 10);
				
				detect.item.eq(detect.current).one('transitionend', function(){
					$(this).removeClass('active');
					detect.current = index;
					slideEnd();
					detect.isInTransition = false;
				});
				
			} else{
				
				detect.item.eq(index).addClass('active').css({'left': dirValue[to] + '%'});
				detect.item.eq(index).animate({'left': 0}, speed);
				detect.item.eq(detect.current).animate({'left': -dirValue[to] + '%'}, speed, function(){
					$(this).removeClass('active');
					detect.current = index;
					slideEnd();
				});
			}
		}
		
		
		init();
	};
	
	MyModule.prototype = {
		slideTo: function(){
			
		},
		next: function(){
			this.slideTo(this.detect.current == this.detect.max ? this.detect.min : +this.detect.current + 1, 'left');
		},
		prev: function(){
			this.slideTo(this.detect.current == this.detect.min ? this.detect.max : +this.detect.current - 1, 'right');
		},
		auto: function(){
			this.detect.isPlay = setInterval(next, 1000);
		},
		slideEnd: function(){
			console.log('callback');
		},
		stop: function(){
			clearInterval(detect.isPlay);
		},
		direction: function(num, dir){
			if(dir){
				return dir;
			}
			
			return detect.current > num ? 'right' : 'left';
		}
	};
	
	MyModule.constructor = MyModule;
	
	if(exports === window){
		typeof exports.ui === 'undefined' ? exports.ui = {} : exports.ui;
		exports.ui[moduleName] = MyModule;
	} else {
		module.exports = MyModule;
	}
}(typeof exports === "undefined" ? window : exports));