/**
 * Created by MOON KYUNGTAE
 */
var demoon = {};

demoon.helper = (function ($){
	function getBtnTarget(t){
		return $(t).attr('data-target') ? $(t).attr('data-target') : t.hash;
	}
	
	function Stack(){
		this.dataStore = [];
	}
	
	Stack.prototype = {
		add: function (data){
			this.dataStore.push(data);
		},
		get: function (){
			return this.dataStore.pop();
		}
	};
	
	function List(){
		this.dataStore = [];
	}
	
	List.prototype = {
		add: function (data){
			this.dataStore.push(data);
		},
		remove: function (value){
			var index = this.find(value);
			if(index > -1){
				this.dataStore.splice(index, 1);
				return true;
			}
			return false;
		},
		find: function (value){
			for (var i = 0, max = this.dataStore.length; i < max; i++) {
				if(this.dataStore[i] == value){
					return i;
				}
			}
			return -1;
		}
	};
	
	return {
		Stack: Stack,
		List: List,
		getBtnTarget: getBtnTarget
	}
}(window.jQuery));

demoon = (function ($, helper){
	/**
	 * window open & close
	 * window.open(URL,name,specs,replace)
	 * http://www.w3schools.com/jsref/met_win_open.asp
	 * https://developer.mozilla.org/en-US/docs/Web/API/Window/open
	 */
	function windowPopup(){
		function open(e){
			e.preventDefault();
			var url = $(this).attr('href'),
				specs = $(this).attr('data-window-open'),
				name = $(this).attr('data-window-name') ? $(this).attr('data-window-name') : false;
			
			if(name){
				open.data[name] = window.open(url, '_blank', specs);
			} else {
				window.open(url, '_blank', specs);
			}
		}
		
		open.data = {};
		
		function close(value){
			open.data[value].close();
			delete open.data[value];
		}
		
		$(document).on('click.demoon.windowOpen', '[data-window-open]', open);
		
		return {
			open: open,
			close: close
		}
	}
	
	/**
	 * layer popup
	 */
	function layerPopup(){
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
			
			layerSection.append(layerDataStore[showId]);
			$(layerDataStore[showId]).addClass('on').focus();
			
			openList.add(showId);
			openHistory.add($(e.target));
		}
		
		function hideLayer(e, hideID){
			hideID = hideID || "#" + $(this).parent().attr('id');
			openList.remove(hideID);
			$(hideID).remove();
			
			if(e){
				e.preventDefault();
				openHistory.get().focus();
			}
		}
		
		function initOpen(){
			$('[data-layer-open]').each(function (){
				if($(this).attr('data-layer-open') === 'false'){
					return;
				}
				$(this).trigger('click.demoon.layerPopup');
			});
		}
		
		layerSection.find('.layer').each(function (){
			addData(this);
			$(this).remove();
		});
		
		$(document).on('click.demoon.layerPopup', '[data-layer-open]', showLayer);
		$(document).on('click.demoon.layerPopup', '.btn-layer-close', hideLayer);
		
		initOpen();
		
		return {
			open: open,
			close: close
		}
	}
	
	/**
	 * 접근성 관련 포커스 강제 이동
	 */
	function accessibilityFocus(){
		$(document).on('keydown.demoon.accessibilityFocus', '[data-focus-prev], [data-focus-next]', function (e){
			var next = $(e.target).attr('data-focus-next'),
				prev = $(e.target).attr('data-focus-prev'),
				target = next || prev || false;
			
			if(!target || e.keyCode != 9){
				return;
			}

			//  shift 없으면 참   있으면true
			if((!e.shiftKey && !!next) || (e.shiftKey && !!prev)){
				e.preventDefault();
				$('[data-focus-id="' + target + '"]').focus();
			}
		});
	}
	
	return {
		helper: helper,
		windowPopup: windowPopup(),
		layerPopup: layerPopup(),
		accessibilityFocus: accessibilityFocus()
	};
}(window.jQuery, demoon.helper));