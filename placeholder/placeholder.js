(function($) {
	var pluginName = 'placeholder';

	function Plugin(node) {
		this.init(node);
	}

	Plugin.prototype = {
		init: function(node) {
			var obj = node;
			var text = $(obj).data("placeholder");

			obj.wrap('<span class="placeholder-wrap"></span>');
			obj.before('<span class="placeholder-text">' + text + '</span>');

			$(".placeholder-wrap").css({
				"position": "relative",
				"display": "inline-block"
			});

			this.position(obj);

			obj.prev().on('click', function(e) {
				console.log(e.type);
			});
			obj.on('focus', function(e) {
				console.log(e.type);
			});
			obj.on('blur', function(e) {
				console.log(e.type);
			});

		},

		position: function(obj) {
			var pst = obj.prev().height() / 2;
			obj.prev().css({
				"position": "absolute",
				"top": "50%",
				"left": "7px",
				"margin-top": -pst
			});
		},

		_eventHandler: {
			click: function() {
				console.log('click');
				$(this).next().focus();
			},
			focus: function() {
				console.log('focus');
				$(this).prev().hide();
			},
			blur: function() {
				console.log('blur');
				if($(this).val() === "") {
					$(this).prev().show();
				}
			}
		}
	};

	$.fn[pluginName] = function() {
		return this.each(function() {
			var $this = $(this);
			var data = $this.data('placeholderData');
			if(!data) {
				$(this).data('placeholderData', (data = new Plugin($this)));
			}
		});
	};

	$.fn[pluginName].constructor = Plugin;
}(window.jQuery));

$(document).ready(function() {
	$("[data-placeholder]").placeholder();
});
