/**
 * Countdown
 * Created by Moon KYUNG TAE on 2016-12-14.
 */
(function(exports){
	var moduleName = 'DDay';
	
	var MyModule = function(options){
		this.config = $.extend({
			'delimiter': ':'
		}, options);
		
		this.container = $(this.config.selector);
		
		this.detect = {
			endDay: null,
			isPlay: false,
			node: {day: null, hour: null, min: null, sec: null},
			value: {sec: 0, min: 0, hour: 0, day: 0}
		};
		
		this.init();
	};
	
	MyModule.prototype = {
		init: function(){
			this.detect.node.day = this.container.append('<span class="day"></span>').find('.day');
			this.detect.node.hour = this.container.append('<span class="hour"></span>').find('.hour');
			this.detect.node.min = this.container.append('<span class="min"></span>').find('.min');
			this.detect.node.sec = this.container.append('<span class="sec"></span>').find('.sec');
			
			this.container.find('.day').before('<span class="pre-text">D-</span>');
			this.container.find('.day').after('<span class="delimiter">' + this.config.delimiter + '</span>');
			this.container.find('.hour').after('<span class="delimiter">' + this.config.delimiter + '</span>');
			this.container.find('.min').after('<span class="delimiter">' + this.config.delimiter + '</span>');
			this.reset(this.config.endDay);
			this.count(true);
		},
		
		unit: {
			sec: 1000,
			min: 1000 * 60,
			hour: 1000 * 60 * 60,
			day: 1000 * 60 * 60 * 24
		},
		
		play: function(){
			if(this.detect.isPlay) return;
			var scope = this;
			
			this.detect.isPlay = setInterval(function(){
				scope.count.call(scope);
			}, 1000);
		},
		
		stop: function(){
			clearInterval(this.detect.isPlay);
			this.detect.isPlay = false;
		},
		
		reset: function(date){
			this.detect.endDay = new Date(date);
			this.play();
		},
		
		calc: function(diff, init){
			var day = Math.floor(diff / this.unit.day);
			var hour = Math.floor((diff % this.unit.day) / this.unit.hour);
			var min = Math.floor((diff % this.unit.hour) / this.unit.min);
			var sec = Math.floor((diff % this.unit.min) / this.unit.sec);
			
			if(!init){
				day = this.detect.value.day == day ? false : this.detect.value.day = day;
				hour = this.detect.value.hour == hour ? false : this.detect.value.hour = hour;
				min = this.detect.value.min == min ? false : this.detect.value.min = min;
				sec = this.detect.value.sec == sec ? false : this.detect.value.sec = sec;
			}
			
			return {
				day: day === false ? false : (String(day).length >= 2) ? day : '0' + day,
				hour: hour === false ? false : (String(hour).length == 2) ? hour : '0' + hour,
				min: min === false ? false : (String(min).length == 2) ? min : '0' + min,
				sec: sec === false ? false : (String(sec).length == 2) ? sec : '0' + sec
			};
		},
		
		render: function(time){
			for(var key in time){
				if(time[key]){
					this.detect.node[key].text(time[key])
				}
			}
		},
		
		count: function(init){
			var diff = this.detect.endDay - new Date();
			
			if(diff <= 0){
				this.render();
				this.stop();
				if(this.config.callback && typeof this.config.callback === 'function'){
					this.config.callback();
				}
				return false;
			}
			
			this.render(this.calc(diff, init));
			return true;
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