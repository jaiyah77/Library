/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(3);
	__webpack_require__(2);

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	/**
	 * Created by MOON KYUNG TAE
	 * layer popup
	 * @type {{open, close}}
	 */

	demoon.layerPopup = (function ($){
		var layerSection = $('#layer-section');
		if(layerSection.length < 1){
			return;
		}
		
		var layerDataStore = {},
			openHistory = new demoon.helper.Stack(),
			openList = new demoon.helper.List();
		
		function addData(html){
			layerDataStore['#' + $(html).attr('id')] = $(html);
		}
		
		function open(template){
			addData(template);
			showLayer(false, '#' + $(template).attr('id'));
		}
		
		function isOpen(){
			return layerSection.find('.layer').length > 0;
		}
		
		function close(hideId){
			hideLayer(false, hideId);
		}
		
		function showLayer(e, layerId){
			var showId;
			
			if(e){
				e.preventDefault();
				showId = demoon.helper.getBtnTarget(e.target);
			} else {
				showId = layerId;
			}
			
			if(openList.find(showId) > -1){
				return;
			}
			
			layerSection.append(layerDataStore[showId])
				.addClass('active');
			
			$(layerDataStore[showId]).addClass('on').focus();
			
			openList.add(showId);
			openHistory.add($(e.target));
		}
		
		function hideLayer(e, hideID){
			hideID = hideID || "#" + $(this).parent().attr('id');
			openList.remove(hideID);
			$(hideID).remove();
			
			if(!isOpen()){
				layerSection.removeClass('active');
			}
			
			if(e){
				e.preventDefault();
				openHistory.get().focus();
			}
		}
		
		function initOpen(){
			$('[data-ui-layer-open]').each(function (){
				if($(this).attr('data-ui-layer-open') === 'false'){
					return;
				}
				$(this).trigger('click.demoon.layerPopup');
			});
		}
		
		layerSection.find('.layer').each(function (){
			addData(this);
			$(this).remove();
		});
		
		$(document).on('click.demoon.layerPopup', '[data-ui-layer-open]', showLayer);
		$(document).on('click.demoon.layerPopup', '.btn-layer-close', hideLayer);
		
		initOpen();
		
		return {
			open: open,
			close: close
		}
	}(window.jQuery));

/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 * Created by MOON KYUNG TAE
	 * 접근성 관련 포커스 강제 이동
	 */
	demoon.accessibilityFocus = (function ($) {
		$(document).on('keydown', '[data-ui-focus-prev], [data-ui-focus-next]', function (e) {
			var next = $(e.target).attr('data-ui-focus-next'),
				prev = $(e.target).attr('data-ui-focus-prev'),
				target = next || prev || false;
			
			if(!target || e.keyCode != 9){
				return;
			}
			
			if((!e.shiftKey && !!next) || (e.shiftKey && !!prev)){
				e.preventDefault();
				$('[data-ui-focus-id="' + target + '"]').focus();
			}
		});
	}(window.jQuery));


/***/ }
/******/ ]);