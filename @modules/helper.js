/**
 * helper function
 * Created by Moon Kyung tae on 2016-11-04.
 */
(function(exports){
	var moduleName = 'helper';
	
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
	
	function getBtnTarget(t){
		return $(t).attr('data-target') ? $(t).attr('data-target') : t.hash;
	}
	
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
		for(var key in data){
			if(data[key]){
				return key;
			}
		}
	}
	
	var MyModule = {
		Stack: Stack,
		List: List,
		getBtnTarget: getBtnTarget,
		hasProperty: hasProperty,
		addEvent: addEvent,
		getTrueKey: getTrueKey
	};
	
	if(exports === window){
		typeof exports.ui === 'undefined' ? exports.ui = {} : exports.ui;
		exports.ui[moduleName] = MyModule;
	} else {
		module.exports = MyModule;
	}
}(typeof exports === 'undefined' ? window : exports));