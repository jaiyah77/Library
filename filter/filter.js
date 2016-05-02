// filter
(function ($){
	function Filter(node, param){
		//this object
		var scope = this;
		this.obj = node;
		
		//setting option
		this.option = $.extend({}, this.default, param);
		
		//button, item
		this.allButton = this.obj.find('> .filter-button ' + this.option.allButton);
		this.button = this.obj.find('> .filter-button ' + this.option.button).not(this.option.allButton);
		this.item = this.obj.find('> .filter-item ' + this.option.item);
		
		//active Item
		this.activeItem = this.getActive(this.option.active, this.option.showAll);
		this.activeCurrent = 0;
		this.activeMax = this.button.length;
		
		//init load
		this.load(scope);
	}
	
	//default option
	Filter.prototype.default = {
		active: undefined,
		button: '[data-target]',
		allButton: '[data-target="show-all"]',
		item: '[data-item]',
		show: 'show',
		hide: 'hide',
		showAll: false,
		speed: undefined
	};
	
	Filter.prototype.load = function (scope){
		$(this.item).hide();
		
		//event
		$(this.button).add(this.allButton).on('click', function (e){
			scope.click($(e.target));
			e.preventDefault();
		});
		
		//init show all
		if(scope.option.showAll){
			this.showAll(this);
			return;
		}
		
		//init active filter
		if(scope.activeItem != undefined){
			for (var i = 0, max = scope.activeItem.length; i < max; i++) {
				scope.click(this.obj.find('>  .filter-button [data-target="' + scope.activeItem[i] + '"]'));
			}
		}
	};
	
	Filter.prototype.click = function (btn){
		var target = btn.data('target');
		
		if(target == "show-all"){
			this.showAll(this);
		} else {
			btn.hasClass("on") ? this.hide(target, this.option.hide, this.option.speed) : this.show(target, this.option.show, this.option.speed);
			btn.toggleClass("on");
		}
	};
	
	Filter.prototype.showAll = function (obj){
		$(this.button).not(this.allButton).not('.on').each(function (){
			obj.click($(this));
		});
	};
	
	Filter.prototype.show = function (showItem, type, speed){
		this.obj.find('> .filter-item > ' + '[data-item=' + showItem + ']')[type](speed);
		this.activeCurrent++;
		this.checkAll();
	};
	
	Filter.prototype.hide = function (hideItem, type, speed){
		this.obj.find('> .filter-item > ' + '[data-item=' + hideItem + ']')[type](speed);
		$(this.allButton).removeClass('on');
		this.activeCurrent--;
		this.checkAll();
	};
	
	Filter.prototype.checkAll = function (){
		if(this.activeCurrent == this.activeMax){
			$(this.allButton).addClass('on');
		} else {
			$(this.allButton).removeClass('on');
		}
	};
	
	Filter.prototype.getActive = function (active, showAll){
		if(active != undefined){
			return active.replace(/\s/gi, '').split(",");
		} else if(showAll){
			return this.button;
		} else if(active == undefined){
			return [];
		}
	};
	
	function Plugin(param){
		return this.each(function (index){
			var $this = $(this);
			var data = $this.data('filter');
			if(!data){
				$(this).data('filter', (data = new Filter($this, param)));
				$.filterPlugInAPI[index] = data;
			}
		});
	}
	
	$.fn.filterMenu = Plugin;
	$.fn.filterMenu.constructor = Filter;
	$.filterPlugInAPI = {};
	
	$(document).ready(function (){
		$('.filter-01').filterMenu({
			active: 'item-02, item-01'
		});
		
		$('.filter-02').filterMenu({
			active: 'item-01'
		});
		
		$('.filter-02-01').filterMenu();
		
		$('.filter-03').filterMenu({
			active: 'item-04, item-01, item-03'
		});
		
		$('.filter-04').filterMenu({
			showAll: true
		});
	});
}(window.jQuery));

/*
 * @todo 추가 필요 기능
 * 1. show callback , hide callback
 * 2. show all toggle
 * 3. add hide all button
 */

