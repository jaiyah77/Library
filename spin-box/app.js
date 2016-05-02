(function ($) {
	var pluginName = 'spinBox';

	function Plugin(node, options) {
		this.detect = {
			node: node,
			inputNode: node.find('input'),
			input: 'input',
			btnPlus: '.btn-plus',
			btnMinus: '.btn-minus',
			btnReset: '.reset',
			initValue: node.find('input').val(),
			currentValue: node.find('input').val()
		};

		this.options = $.extend({}, this.defaults, {
			min: options && options.min ? options.min : this.detect.inputNode.attr('data-min') || this.defaults.min,
			max: options && options.max ? options.max : this.detect.inputNode.attr('data-max') || this.defaults.max
		});

		this.init();
	}

	Plugin.prototype = {
		init: function () {
			this.addEvent(this.detect.btnPlus, 'click', 'plus');
			this.addEvent(this.detect.btnMinus, 'click', 'minus');
			this.addEvent(this.detect.btnReset, 'click', 'reset');
			this.addEvent(this.detect.input, 'focusout', 'inputSelf');
			this.addEvent(this.detect.input, 'keydown', 'key');
		},

		defaults: {
			min: 0,
			max: Infinity
		},

		addEvent: function (element, type, q) {
			this.detect.node.on(type, element, $.proxy(function (e) {
				if (type != 'keydown') {
					e.preventDefault();
				}
				this.count(q, e);
			}, this));
		},

		plus: function () {
			var result = this.checkValue(+this.detect.currentValue + 1);

			if (!result.checkResult) {
				this.limit(result.msgType);
				return;
			}

			this.setValue(+this.detect.currentValue + 1);
		},

		minus: function () {
			var result = this.checkValue(+this.detect.currentValue - 1);
			if (!result.checkResult) {
				this.limit(result.msgType);
				return;
			}

			this.setValue(+this.detect.currentValue - 1);
		},

		reset: function () {
			this.setValue(+this.detect.initValue);
		},

		inputSelf: function () {
			var result = this.checkValue(+this.detect.inputNode.val());

			if (!result.number) {
				this.setValue(+this.detect.currentValue);
				return;
			}

			if (!result.checkResult) {
				this.limit(result.msgType);
			} else {
				this.setValue(+this.detect.inputNode.val());
			}
		},

		key: function (e) {
			switch (e.keyCode) {
				case 38:
					this.plus();
					break;

				case 40:
					this.minus();
					break;
			}
		},

		setValue: function (value) {
			this.detect.inputNode.val(this.detect.currentValue = value);
		},

		checkValue: function (value) {
			return {
				number: !!(!isNaN(value)),
				checkResult: !!(this.options.min <= value && value <= this.options.max),
				msgType: !!(this.options.min <= value && value <= this.options.max) ? '' : this.options.min > value ? 'min' : 'max'
			}
		},

		limit: function (type) {
			if (type == 'min') {
				alert('최소 수량은 ' + this.options.min + ' 입니다.');
				this.setValue(this.options.min);
			} else {
				alert('최대 수량은 ' + this.options.max + ' 입니다.');
				this.setValue(this.options.max);
			}
			this.detect.inputNode.focus();
		},

		count: function (q, e) {
			this[q](e);
		}
	};

	$[pluginName + 'API'] = [];

	$.fn[pluginName] = function (param) {
		return this.each(function (index) {
			var data = $(this).data(pluginName);

			if (!data) {
				$[pluginName + 'API'][index] = new Plugin($(this), param);
				$(this).data(pluginName, $[pluginName + 'API'][index]);
			}
		});
	};

	$.fn[pluginName].constructor = Plugin;
}(window.jQuery));

$('.spin-box').spinBox();
