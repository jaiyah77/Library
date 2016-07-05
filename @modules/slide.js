function slide(container, options){

	if(!container.length){
		return;
	}

	var detect = {
			isPlay: false,
			transform: (function (){
				var props = ['transform', 'webkitTransform', 'MozTransform', 'OTransform', 'msTransform'];
				for (var i = 0, max = props.length; i < max; i++) {
					if(props[i] in $('body')[0].style){
						return props[i];
					}
				}
				return false;
			}())
		},
		config = {start: 0, auto: false},
		dirValue = {
			'left': 100,
			'right': -100,
			'up': 100,
			'down': -100
		};

	$.extend(config, options);
	
	console.log(detect.transform);
	
	function init(){
		detect.item = container.find(config.item);
		detect.min = 0;
		detect.max = detect.item.length - 1;
		detect.current = config.start;
		detect.item.eq(detect.current).addClass('active');

		if(config.auto){
			auto();
		}

		$(document)
			.on('click', '[data-ctrl="prev"], [data-slide], [data-ctrl="prev"], [data-ctrl="next"], [data-ctrl="play"], [data-ctrl="stop"]', function (e){
				e.preventDefault();
			})
			.on('click', '[data-slide]', function (){
				var index = $(this).attr('data-slide');
				if(detect.current == index){
					return;
				}
				slideTo(index);
			})
			.on('click', '[data-ctrl="prev"]', prev)
			.on('click', '[data-ctrl="next"]', next)
			.on('click', '[data-ctrl="play"]', auto)
			.on('click', '[data-ctrl="stop"]', stop);

	}

	function next(){
		slideTo(detect.current == detect.max ? detect.min : +detect.current + 1, 'left');
	}

	function prev(){
		slideTo(detect.current == detect.min ? detect.max : +detect.current - 1, 'right');
	}

	function auto(){
		detect.isPlay = setInterval(next, 1000);
	}

	function stop(){
		clearInterval(detect.isPlay);
	}

	function direction(num, dir){
		if(dir){
			return dir;
		}

		return detect.current > num ? 'right' : 'left';
	}

	function slideTo(index, dir){
		if(detect.item.is(':animated')){
			return;
		}

		var to = direction(index, dir),
			speed = 500;

		if(detect.transform){
			detect.item.eq(index).addClass('active').css(detect.transform, 'translate3d(' + dirValue[to] + '%, 0, 0)');
			detect.item.eq(index).css('transitionDuration', 500 + "ms");

			setTimeout(function (){
				detect.item.eq(index).css('webkitTransform', 'translate3d(' + 0 + '%, 0, 0)');
				detect.item.eq(index).css('webkitTransform', 'translate3d(' + 0 + '%, 0, 0)');
			}, 10);

		} else {
			detect.item.eq(index).addClass('active').css({'left': dirValue[to] + '%'});
			detect.item.eq(index).animate({'left': 0}, speed);
			detect.item.eq(detect.current).animate({'left': -dirValue[to] + '%'}, speed, function (){
				$(this).removeClass('active');
				detect.current = index;
				slideEnd();
			});
		}
	}

	function slideEnd(){
		console.log('callback');
	}

	init();

	return {
		init: init,
		slide: slideTo,
		prev: prev,
		next: next,
		stop: stop,
		auto: auto
	}
}

$(document).ready(function (){
	slide($('.slide-1'), {
		item: '.item'
	});
});