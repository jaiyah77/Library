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
			.on('click', '[data-slide]', function (e) {
				e.preventDefault();
				slide($(this).attr('data-slide'));
			})
			.on('click', '[data-ctrl="prev"]', function (e) {
				e.preventDefault();
				prev();
			})
			.on('click', '[data-ctrl="next"]', function (e) {
				e.preventDefault();
				next();
			})
			.on('click', '[data-ctrl="play"]', function (e) {
				e.preventDefault();
				auto();
			})
			.on('click', '[data-ctrl="stop"]', function (e) {
				e.preventDefault();
				stop();
			});

		$(window).on('resize', detectSize);
	}

	function detectSize() {
		detect.width = container.width();
	}
	
	function next() {
		slide(detect.current == detect.max ? detect.min : detect.current + 1);
	}
	
	function prev() {
		slide(detect.current == detect.min ? detect.max : detect.current - 1);
	}
	
	function auto() {
		detect.isPlay = setInterval(next, 1000);
	}

	function stop() {
		clearInterval(detect.isPlay);
	}
	
	function direction(num) {
		return detect.current > num ? 'right' : 'left';
	}
	
	function slide(index, speed) {
		if(detect.item.is(':animated')){
			return;
		}
		
		var to = direction(index),
			value;
		
		speed = speed == 0 ? 0 : 500;
		
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
	slide($('.slide'), {
		item: '.item'
	});
});