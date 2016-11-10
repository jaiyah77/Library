/**
 * Countdown
 * Created by Moon on 2016-11-04.
 */
(function(exports){
	var moduleName = 'countdown';
	
	var MyModule = function(selector, date, finish){
		selector.hide();
		this.detect = {
			endDay: new Date(),
			getCurrent: date.current ? date.current : window.Date,
			isPlay: false,
			node: {
				sec: selector.find('.sec'),
				min: selector.find('.min'),
				hour: selector.find('.hour'),
				day: selector.find('.day')
			},
			unit: {
				sec: 1000,
				min: 1000 * 60,
				hour: 1000 * 60 * 60,
				day: 1000 * 60 * 60 * 24
			},
			finish: finish
		};
		
		this.reset(date.end);
		var end = this.count();
		
		if(end) this.play();
		
		selector.show();
	};
	
	MyModule.prototype = {
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
		calc: function(difference){
			var day = Math.floor(difference / this.detect.unit.day);
			var hour = Math.floor((difference % this.detect.unit.day) / this.detect.unit.hour);
			var min = Math.floor((difference % this.detect.unit.hour) / this.detect.unit.min);
			var sec = Math.floor((difference % this.detect.unit.min) / this.detect.unit.sec);
			
			return {
				day: (String(day).length >= 2) ? day : '0' + day,
				hour: (String(hour).length == 2) ? hour : '0' + hour,
				min: (String(min).length == 2) ? min : '0' + min,
				sec: (String(sec).length == 2) ? sec : '0' + sec
			}
		},
		render: function(time){
			this.detect.node.day.text(time ? time.day : '00');
			this.detect.node.hour.text(time ? time.hour : '00');
			this.detect.node.min.text(time ? time.min : '00');
			this.detect.node.sec.text(time ? time.sec : '00');
		},
		count: function(){
			var difference = this.detect.endDay - this.detect.getCurrent();
			
			if(difference <= 0){
				this.render();
				this.stop();
				if(this.detect.finish && typeof this.detect.finish === 'function') this.detect.finish();
				return false;
			}
			
			this.render(this.calc(difference));
			return true;
		}
	};
	
	MyModule.constructor = MyModule;
	
	if(exports === window){
		typeof exports.demoon === 'undefined' ? exports.demoon = {} : exports.demoon;
		exports.demoon[moduleName] = MyModule;
	}else{
		exports[moduleName] = MyModule;
	}
}(typeof exports === "undefined" ? window : exports));

