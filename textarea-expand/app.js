/**
 * version -
 * module name : expandArea
 */

(function($){
	var pluginName = 'expandArea';

	function Plugin(node, param){
		this.area = node;
		this.options = $.extend({}, this.defaults, param);
		this.detect = {
			areaHeight: 0,
			areaRealHeight: 0,
			areaPadding: 0,
			areaBorder: 0,
			expandHeight: 0,
			enableLine: 1,
			enableHeight: 0
		};
		this._init();
	}

	Plugin.prototype = {
		defaults: {
			line: 2
		},

		_init: function(){
			this.area.attr("rows", 1);
			this._detect();
			this._setEvents();
		},

		_addEvent: function _addEvent(element, type, fn, scope){
			element.on(type, function(e){
				fn.call(scope, e);
			});
		},

		_removeEvent: function(element, type){
			element.off(type);
		},

		_setEvents: function(){
			this._addEvent(this.area, 'input', this._resize, this);
		},

		_detect: function(){
			this.detect.boxSizing = this.area.css("box-sizing") == "border-box";
			this.detect.areaPadding = parseInt(this.area.css('padding-top')) + parseInt(this.area.css('padding-bottom'));
			this.detect.areaBorder = parseInt(this.area.css('border-top')) + parseInt(this.area.css('border-bottom'));
			this.detect.areaHeight = this.area.outerHeight() - this.detect.areaBorder;
			this.detect.areaRealHeight = this.detect.areaHeight - this.detect.areaPadding;
			this.detect.enableLine = this.options.line;
			this.detect.expandHeight = parseInt(this.area.css('line-height'));
			this.detect.boxSizing ? this.detect.enableHeight = (this.detect.expandHeight * this.detect.enableLine) + this.detect.areaPadding : this.detect.enableHeight = (this.detect.expandHeight * this.detect.enableLine);
		},

		_resize: function(){
			if(this.detect.expandHeight != parseInt(this.area.css('line-height'))){
				this.detect.expandHeight = parseInt(this.area.css('line-height'));
				this.detect.enableHeight = (this.detect.expandHeight * this.detect.enableLine) + this.detect.areaPadding;
			}

			this.area.css({
				'height': 'auto'
			});

			if((this.area[0].scrollHeight == this.detect.expandHeight + this.detect.areaPadding)){
				this.detect.boxSizing ? this.detect.areaRealHeight = this.detect.areaHeight : this.detect.areaRealHeight = this.detect.areaHeight - this.detect.areaPadding;
			}else{
				if(this.area[0].scrollHeight > this.detect.enableHeight){
					this.detect.areaRealHeight = this.detect.enableHeight;
				}else{
					this.detect.boxSizing ? this.detect.areaRealHeight = this.area[0].scrollHeight : this.detect.areaRealHeight = this.area[0].scrollHeight - this.detect.areaPadding;
				}
			}

			this.area.css('height', this.detect.areaRealHeight);
		}
	};

	$.fn[pluginName] = function(param){
		return this.each(function(){
			var $this = $(this);
			var data = $this.data(pluginName);
			if(!data){
				$(this).data(pluginName, new Plugin($this, param));
			}
		});
	};

	$.fn[pluginName].constructor = Plugin;
}(window.jQuery));