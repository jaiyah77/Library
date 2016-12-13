/**
 * dictionary
 * Created by Moon Kyung tae on 2016-11-04.
 */
import helper from './helper';

(function(exports){
	var moduleName = 'dic';
	
	var MyModule = {
		browser: (function(){
			var agent = navigator.userAgent;
			
			return helper.getTrueKey({
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
			
			return helper.getTrueKey({
				'window': agent.match(/windows/i),
				'mac': agent.match(/macintosh/i)
			});
		})()
	};
	
	if(exports === window){
		typeof exports.ui === 'undefined' ? exports.ui = {} : exports.ui;
		exports.ui[moduleName] = MyModule;
	} else {
		module.exports = MyModule;
	}
}(typeof exports === 'undefined' ? window : exports));