/**
 * Created by MOON KYUNG TAE
 */

var demoon = demoon || {};

demoon.helper = (function($){
	function getBtnTarget(t){
		return $(t).attr('data-target') ? $(t).attr('data-target'): t.hash;
	}
	
	function Stack(){
		this.dataStore = [];
	}
	
	Stack.prototype = {
		add: function(data){
			this.dataStore.push(data);
		},
		get: function(){
			return this.dataStore.pop();
		}
	};
	
	function List(){
		this.dataStore = [];
	}
	
	List.prototype = {
		add: function(data){
			this.dataStore.push(data);
		},
		remove: function(value){
			var index = this.find(value);
			if(index > -1){
				this.dataStore.splice(index, 1);
				return true;
			}
			return false;
		},
		find: function(value){
			for(var i = 0, max = this.dataStore.length; i < max; i++){
				if(this.dataStore[i] == value){
					return i;
				}
			}
			return -1;
		}
	};
	
	function hasProperty(style){
		var upper = style.charAt(0).toUpperCase() + style.substr(1);
		var props = [style, 'webkit' + upper, 'Moz' + upper, 'O' + upper, 'ms' + upper];
		
		for(var i = 0; i < 5; i++){
			if(props[i] in $('body')[0].style){
				return props[i];
			}
		}
		return false;
	}
	
	function addEvent(type, selector, fn, scope){
		$(document).on(type, selector, function(e){
			fn.call(scope, e);
		});
	}
	
	function toggleText(node, t1, t2){
		
	}
	
	function getTrueKey(data){
		for(key in data){
			if(data[key]){
				return key;
			}
		}
	}
	
	return {
		Stack: Stack,
		List: List,
		getBtnTarget: getBtnTarget,
		hasProperty: hasProperty,
		addEvent: addEvent,
		getTrueKey: getTrueKey
	}
}(window.jQuery));

demoon.dic = {
	browser: (function(){
		var agent = navigator.userAgent;
		
		return demoon.helper.getTrueKey({
			'edge': agent.match(/edge/i),
			'chrome': agent.match(/chrome/i),
			'ie11': agent.match(/rv:11.0/i),
			'ie10': agent.match(/msie 10.0/i),
			'ie9': agent.match(/msie 9.0/i),
			'ie8': agent.match(/msie 8.0/i),
			'ie7': agent.match(/msie 7.0/i),
			'firefox': agent.match(/firefox/i),
			'safari': agent.match(/safari/i),
			'opera': agent.match(/opera/i)
		});
	})(),
	os: (function(){
		var agent = navigator.userAgent;
		
		return demoon.helper.getTrueKey({
			'window': agent.match(/windows/i),
			'mac': agent.match(/macintosh/i)
		});
	})()
};