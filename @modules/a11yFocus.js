/**
 * a11y focus
 * Created by Moon on 2016-11-04.
 */
(function(exports){
	var moduleName = 'a11yFocus';
	
	function action(e){
		var next = $(e.target).attr('data-ui-focus-next'),
			prev = $(e.target).attr('data-ui-focus-prev'),
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
			$(document).on('keydown.demoon.a11y', '[data-ui-focus-prev], [data-ui-focus-next]', action);
		},
		off: function(){
			$(document).off('keydown.demoon.a11y');
		}
	};
	
	if(exports === window){
		typeof exports.demoon === 'undefined' ? exports.demoon = {} : exports.demoon;
		exports.demoon[moduleName] = MyModule;
	}else{
		exports[moduleName] = MyModule;
	}
}(typeof exports === 'undefined' ? window : exports));