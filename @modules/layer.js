/**
 * Created by MOON KYUNG TAE
 * layer popup
 * @type {{open, close}}
 */

(function(exports){
	var moduleName = 'layer';
	
	var MyModule = function(container){
		
		var layerSection = container ? $(container) : $('#layer-section');
		
		if(layerSection.length < 1){
			return;
		}
		
		var layerDataStore = {};
		var openHistory = {
			dataStore: [],
			add: function(data){
				this.dataStore.push(data);
			},
			get: function(){
				return this.dataStore.pop();
			}
		};
		var openList = {
			dataStore: [],
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
				showId = $(e.target).attr('data-target') ? $(e.target).attr('data-target') : e.target.hash;
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
			$('[data-ui-layer-open]').each(function(){
				if($(this).attr('data-ui-layer-open') === 'false'){
					return;
				}
				$(this).trigger('click.ui.layerPopup');
			});
		}
		
		layerSection.find('.layer').each(function(){
			addData(this);
			$(this).remove();
		});
		
		$(document).on('click.ui.layerPopup', '[data-ui-layer-open]', showLayer);
		$(document).on('click.ui.layerPopup', '.btn-layer-close', hideLayer);
		
		initOpen();
		
		return {
			open: open,
			close: close
		}
	};
	
	if(exports === window){
		typeof exports.ui === 'undefined' ? exports.ui = {} : exports.ui;
		exports.ui[moduleName] = MyModule;
	} else {
		module.exports = MyModule;
	}
}(typeof exports === 'undefined' ? window : exports));