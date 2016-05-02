/**
 * version -
 * module name : snapBanner
 */
(function($){
	var pluginName = 'snapBanner';

	function Plugin(node, param){
		this.obj = node;
		this.options = $.extend({}, this.defaults, param);
		this.detect = {
			fixItem: null,
			fixItemTop: 0,
			isWrapper: false,
			enableFix: true,
			wrapperHeight: 0,
			wrapperTop: 0,
			wrapperbottom: 0,
			fixHeight: 0
		};
		this._init();
	}

	Plugin.prototype = {
		defaults: {
			fixItem: null
		},

		_addEvent: function(element, type, fn, scope){
			element.on(type, function(e){
				fn.call(scope, e);
			});
		},

		_setEvents: function(){
			this._addEvent($(window), 'scroll', this._scroll, this);
		},

		_init: function(){
			this._find();
			this._setEvents();
			this._checkTop();
		},

		_find: function(){
			if(this.options.fixItem){
				this.detect.isWrapper = false;
				this.detect.fixItem = this.obj.find(this.options.fixItem);
			}else{
				this.detect.isWrapper = true;
				this.detect.fixItem = this.obj
			}

			this.detect.fixItemTop = this.detect.fixItem.offset().top;
			this.detect.wrapperTop = this.obj.offset().top;
			this.detect.wrapperbottom = this.detect.wrapperTop + this.obj.outerHeight();
			this.detect.wrapperHeight = this.obj.outerHeight();
			this.detect.fixHeight = this.obj.outerHeight() - (this.detect.fixItemTop - this.detect.wrapperTop);
		},

		_scroll: function(){
			if(this.detect.fixItemTop < this._checkTop()){
				if(!this.detect.enableFix){
					return;
				}
				this.obj.before('<div class="fix-blank-Box" style="height:' + this.detect.wrapperHeight + 'px"></div>');
				this.obj.wrap('<div class="fix-wrapper" style="height:' + this.detect.fixHeight + 'px"></div>');
				this.obj.parent().css({
					'position': 'fixed',
					'top': 0,
					'left': 0,
					'right': 0,
					'z-index': 1000,
					'overflow': 'hidden'
				});
				this.obj.css({
					'margin-top': -(this.detect.fixItemTop - this.detect.wrapperTop)
				});
				this.detect.enableFix = false;
			}
			else{
				if(this.detect.enableFix){
					return;
				}
				this.obj.unwrap();
				this.obj.removeAttr('style');
				this.obj.parent().removeAttr('style');
				$(".fix-blank-Box").remove();
				this.detect.enableFix = true;
			}
		},

		_checkTop: function(){
			return $(window).scrollTop();
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
