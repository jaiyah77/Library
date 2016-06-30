function slide(container, options){
	if(!container.length){
		return;
	}
	
	var detect = {},
		config = {start: 0};
	
	$.extend(config, options);
	
	function init(){
		detect.item = container.find(config.item);
		detect.min = 0;
		detect.max = detect.item.length - 1;
		detect.width = container.width();
		detect.current = config.start;
		
		if(config.auto){
			auto();
		}
		
		detect.item.eq(detect.current).addClass('active').css({'left': 0});
		
		$(document).on('click', '[data-ctrl="prev"]', function (e){
			e.preventDefault();
			prev();
		});
		$(document).on('click', '[data-ctrl="next"]', function (e){
			e.preventDefault();
			next();
		});
	}
	
	function resize(){
		
	}
	
	function next(){
		slide(detect.current == detect.max ? detect.min : detect.current + 1);
	}
	
	function prev(){
		slide(detect.current == detect.min ? detect.max : detect.current - 1);
	}
	
	function auto(){
		// setInterval(next, 1000);
	}
	
	function direction(num){
		return detect.current > num ? 'right' : 'left';
	}
	
	function slide(index, speed){
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
		
		detect.item.eq(detect.current).addClass('active').animate({'left': -value}, speed, function (){
			detect.current = index;
			slideEnd();
		});
	}
	
	function slideEnd(){
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

$(document).ready(function (){
	slide($('.slide'), {
		item: '.item',
		auto: true
	});
});