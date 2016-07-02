function slide(container, options) {
	if(!container.length){
		return;
	}
	
	var detect = {isPlay: false},
		config = {start: 0};
	
	$.extend(config, options);
	
	function init() {
		detect.item = container.find(config.item);
		detect.min = 0;
		detect.max = detect.item.length - 1;
		detect.current = config.start;
		detectSize();
		
		if(config.auto){
			auto();
		}
		
		detect.item.eq(detect.current).addClass('active');
		
		$(document)
			.on('click', '[data-ctrl="prev"], [data-slide], [data-ctrl="prev"], [data-ctrl="next"], [data-ctrl="play"], [data-ctrl="stop"]', function (e) {
				e.preventDefault();
			})
			.on('click', '[data-slide]', function () {
				var index = $(this).attr('data-slide');
				if(detect.current == index){
					return;
				}
				slide(index);
			})
			.on('click', '[data-ctrl="prev"]', function () {
				prev();
			})
			.on('click', '[data-ctrl="next"]', function () {
				next();
			})
			.on('click', '[data-ctrl="play"]', function () {
				auto();
			})
			.on('click', '[data-ctrl="stop"]', function () {
				stop();
			});

		$(window).on('resize', detectSize);
	}

	function detectSize() {
		detect.width = container.width();
	}
	
	function next() {
		slide(detect.current == detect.max ? detect.min : +detect.current + 1, 'left');
	}
	
	function prev() {
		slide(detect.current == detect.min ? detect.max : +detect.current - 1, 'right');
	}
	
	function auto() {
		detect.isPlay = setInterval(next, 1000);
	}

	function stop() {
		clearInterval(detect.isPlay);
	}
	
	function direction(num, dir) {
		if(dir){
			return dir;
		}
		return detect.current > num ? 'right' : 'left';
	}
	
	function slide(index, dir) {
		console.log(index, dir);

		if(detect.item.is(':animated')){
			return;
		}
		
		var to = direction(index, dir),
			value,
			speed = 500;

		switch (to) {
			case 'left' :
				value = detect.width;
				break;
			
			case 'right' :
				value = -detect.width;
				break;
		}
		
		detect.item.eq(index).addClass('active').css({'left': value});
		detect.item.eq(index).animate({'left': 0}, speed);
		
		detect.item.eq(detect.current).animate({'left': -value}, speed, function () {
			$(this).removeClass('active');
			detect.current = index;
			slideEnd();
		});
	}
	
	function slideEnd() {
		console.log('callback');
	}
	
	init();
	
	return {
		init: init,
		slide: slide,
		prev: prev,
		next: next,
		slideEnd: slideEnd
	}
}

$(document).ready(function () {
	slide($('.slide-1'), {
		item: '.item'
	});
});