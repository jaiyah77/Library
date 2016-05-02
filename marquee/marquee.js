/**
 * version - 15. 07. 20
 * module name : marquee
 */
(function($){
	var pluginName = 'marquee';

	function Plugin(node, param){
		this.obj = node;
		this.option = $.extend({}, this.default, param);
		this.detect = {
			width: 0,
			height: 0,
			startPosition: 0,
			queueWidth: [],
			queueHeight: [],
			moveWidth: 0,
			gap: 0
		};

		this.init();
	}

	Plugin.prototype = {
		default: {
			to: 'left',
			playSpeed: 1000
		},

		init: function(){
			this.setQueue(this.option.to);
			this.play[this.option.to](this);
		},

		setDetect: function(type){
			if(type == 'left' || type == 'right'){
				var detect = this.detect;

				this.obj.find('.queue').each(function(){
					detect.queueWidth.push($(this)[0].clientWidth);
					detect.width += $(this)[0].clientWidth + 1;
				});

				detect.height = this.obj.find('.queue')[0].clientHeight;
				detect.startPosition = this.obj[0].clientWidth;
				console.log(detect.queueWidth);

			}else if(type == 'top' || type == 'bottom'){
				//todo 위아래 높이로 이동하기 위한 가로와 높이 저장
			}
		},

		setWrap: function(){
			$($(this.obj).find('.queue'))
					.wrapAll('<div class="queue-wrap" style="position:relative;"></div>')
					.add().parent().width(this.detect.width);
		},

		setQueue: function(direction){
			var paddingDir = 'padding-'+direction;
			$(this.obj).find('.queue').css({
				'float': direction,
				paddingDir : 0
			});

			this.setDetect(direction);
			this.setWrap();
		},

		play: {
			right: function(scope){
				var wrap = $('.queue-wrap');
				scope.detect.moveWidth = scope.detect.width - parseInt(scope.obj.find('.queue').last().css('padding-right'));
				wrap.css('left', scope.detect.startPosition);

				function move(){
					if(-scope.detect.moveWidth > parseInt(wrap.css('left'))){
						$('.queue-wrap').css('left', scope.detect.startPosition);
					}
					wrap.css({
						'left': '-=1'
					});
				}

				setInterval(move, scope.default.playSpeed * 0.01);
			},
			left: function(){
				//todo left play
			}
		}
	};

	$.fn[pluginName] = function(param){
		return this.each(function(){
			var $this = $(this);
			var data = $this.data(pluginName);

			if(!data){
				$(this).data(pluginName, (data = new Plugin($this, param)));
			}
		});
	};

	$.fn[pluginName].constructor = Plugin;

	$(document).ready(function(){
		$('.marquee').marquee({
			gap: '50px'
		});
	});
}(window.jQuery));