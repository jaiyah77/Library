/**
 * a11y focus
 * Created by Moon Kyung tae on 2016-11-04.
 */
(function(exports){
	var moduleName = 'a11yFocus';
	var next, prev, target;
	
	function action(e){
		next = $(e.target).attr('data-ui-focus-next');
		prev = $(e.target).attr('data-ui-focus-prev');
		target = next || prev || false;
		
		if(!target || e.key != 'Tab'){
			return;
		}
		
		if((!e.shiftKey && !!next) || (e.shiftKey && !!prev)){
			e.preventDefault();
			$('[data-ui-focus-id="' + target + '"]').focus();
		}
	}
	
	var MyModule = {
		on: function(){
			$(document).on('keydown.ui.a11y', '[data-ui-focus-prev], [data-ui-focus-next]', action);
		},
		off: function(){
			$(document).off('keydown.ui.a11y');
		}
	};
	
	if(exports === window){
		typeof exports.ui === 'undefined' ? exports.ui = {} : exports.ui;
		exports.ui[moduleName] = MyModule;
	} else {
		module.exports = MyModule;
	}
}(typeof exports === 'undefined' ? window : exports));