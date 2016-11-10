/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _a11yFocus = __webpack_require__(1);
	
	_a11yFocus.a11yFocus.on();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * a11y focus
	 * Created by Moon on 2016-11-04.
	 */
	(function (exports) {
		var moduleName = 'a11yFocus';
	
		function action(e) {
			var next = $(e.target).attr('data-ui-focus-next'),
			    prev = $(e.target).attr('data-ui-focus-prev'),
			    target = next || prev || false;
			if (!target || e.key != 'Tab') {
				return;
			}
			if (!e.shiftKey && !!next || e.shiftKey && !!prev) {
				e.preventDefault();
				$('[data-ui-focus-id="' + target + '"]').focus();
			}
		}
	
		var MyModule = {
			on: function on() {
				$(document).on('keydown.demoon.a11y', '[data-ui-focus-prev], [data-ui-focus-next]', action);
			},
			off: function off() {
				$(document).off('keydown.demoon.a11y');
			}
		};
	
		if (exports === window) {
			typeof exports.demoon === 'undefined' ? exports.demoon = {} : exports.demoon;
			exports.demoon[moduleName] = MyModule;
		} else {
			exports[moduleName] = MyModule;
		}
	})( false ? window : exports);

/***/ }
/******/ ]);
//# sourceMappingURL=ui.js.map