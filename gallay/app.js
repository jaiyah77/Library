var KEYUI = KEYUI || {};

KEYUI.visual = (function ($){

	function gallery(container, options){
		if(!container.length){
			return;
		}

		var detect = {},
			config = {
				start: 0,
				perPage: 6
			};

		$.extend(config, options);

		function init(){
			setup();

			if(config.start == 0){
				detect.viewListItem.eq(0).addClass('active');
				return;
			}

			if(detect.max >= config.start){
				slide(config.start, 0);
			}

		}

		function setup(){
			detect.thumbnailList = container.find('.thumbnail-link');
			detect.thumbnailListItem = detect.thumbnailList.find('li');
			detect.viewList = container.find('.view-list');
			detect.viewCtrl = container.find('.view-ctrl');
			detect.viewListItem = detect.viewList.find('li');
			detect.btnNext = container.find('.btn-next');
			detect.btnPrev = container.find('.btn-prev');
			detect.btnNextList = container.find('.btn-next-list');
			detect.btnPrevList = container.find('.btn-prev-list');
			detect.width = container.width();
			detect.naviwidth = detect.thumbnailList.width();
			detect.listSize = detect.viewListItem.size();
			detect.perPage = config.perPage;
			detect.maxPage = Math.ceil(detect.listSize / detect.perPage);
			detect.currentPage = 1;
			detect.current = 0;
			detect.min = 0;
			detect.max = detect.listSize - 1;

			detect.viewListItem.each(function (index){
				$(this).data('idx', index);
			});

			detect.thumbnailListItem.each(function (index){
				$(this).find('a').data('idx', index);
			});

			buttonShow(detect.current);

		}

		function next(){
			if(detect.current + 1 > detect.max){
				return;
			}
			slide(detect.current + 1);
		}

		function prev(){
			if(detect.current - 1 < detect.min){
				return;
			}
			slide(detect.current - 1);
		}

		function direction(num){
			return detect.current > num ? 'right' : 'left';
		}

		function buttonShow(num){
			detect.btnNext.removeClass('disable');
			detect.btnPrev.removeClass('disable');

			if(num == detect.min){
				detect.btnPrev.addClass('disable');
			}
			else if(num == detect.max){
				detect.btnNext.addClass('disable');
			}
		}

		function slideEnd(index){
			detect.viewListItem.eq(detect.current).removeClass('active');
			detect.viewListItem.removeAttr('style');
			detect.thumbnailListItem.eq(detect.current).find('a').removeClass('active');
			detect.thumbnailListItem.eq(index).find('a').addClass('active');
			detect.current = index;
		}

		function slide(index, speed){
			if((index == detect.current) || (index > detect.max)){
				return;
			}

			if(detect.viewListItem.is(':animated')){
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
					value = detect.width;
					break;
			}

			detect.viewListItem.eq(index).css({'left': -value}, speed).addClass('active');
			detect.viewListItem.eq(index).animate({'left': 0}, speed);
			detect.viewListItem.eq(detect.current).animate({'left': value}, speed, function (){
				slideEnd(index);
			});

			buttonShow(index);
			setPage(getPage(index + 1), speed);

		}

		function getPage(index){
			index = index ? index : detect.current + 1;
			return Math.ceil(index / detect.perPage);
		}

		function setPage(page, speed){
			if(detect.currentPage == page){
				return;
			}
			detect.currenPage = page;
			detect.thumbnailList.find('.scroll-wrap').animate({
				'left': (page - 1) * -detect.naviwidth
			}, speed);
		}

		init();

		detect.btnNext.on('click', function (e){
			e.preventDefault();
			next();
		})

		detect.btnPrev.on('click', function (e){
			e.preventDefault();
			prev();
		});

		detect.thumbnailListItem.find('a').on('click', function (e){
			e.preventDefault();
			slide($(this).data('idx'));
		});

		detect.btnNextList.on('click', function (e){
			e.preventDefault();

			if(detect.currentPage < detect.maxPage){
				setPage(detect.currentPage + 1, 500);
			}
		});

		detect.btnPrevList.on('click', function (e){
			e.preventDefault();
			if(detect.currentPage != 1){
				setPage(detect.currentPage - 1, 500);
			}
		});

		detect.viewCtrl.hover(
			function (){
				detect.btnPrev.addClass('active');
				detect.btnNext.addClass('active');
			},
			function (){
				detect.btnPrev.removeClass('active');
				detect.btnNext.removeClass('active');
			}
		);

		return {
			setup: setup,
			slide: slide,
			prev: prev,
			next: next
		}

	}

	return {
		gallery: gallery
	}

}(jQuery));

var KNBUI = KNBUI || {};

KNBUI.keyVisual = (function ($){

	// start visual
	function visual(){
		if(!$('.visual').length){
			return;
		}

		var visual = $('.visual'),
			ctrlBtn = $('.visual-controller a'),
			visualList = $('.visual-list li'),
			btnStop = $('.btn-stop'),
			btnPlay = $('.btn-play'),
			max = visualList.size() - 1,
			current = 0,
			auto,
			autoPlay = true, // 자동재생
			start = 2, // 시작설정 0부터 시작
			playSpeed = 4000; // 단위 1000/1초

		function show(num){
			ctrlBtn.eq(num).addClass('active');
			visualList.eq(num).fadeIn().addClass('active');
		}

		function next(){
			var n = current;
			if(n < max){
				n++;
			} else {
				n = 0;
			}
			return n;
		}

		function clear(num){
			ctrlBtn.eq(num).removeClass('active');
			visualList.eq(num).fadeOut().removeClass('active');
		}

		function play(){
			ctrlBtn.eq(next()).trigger('click');
		}

		ctrlBtn.eq(start).addClass('active');
		show(start);

		ctrlBtn.each(function (index){
			$(this).data('number', index);
		});

		current = start;

		if(autoPlay){
			auto = setInterval(play, playSpeed);
			btnStop.addClass('active');
		}

		ctrlBtn.on('click', function (e){
			e.preventDefault();
			var idx = $(this).data('number');
			clear(current);
			show(idx);
			current = idx;
		});

		ctrlBtn.hover(
			function (){
				if(autoPlay){
					clearInterval(auto);
				}
			},
			function (){
				if(autoPlay){
					auto = setInterval(play, playSpeed);
				}
			}
		);

		btnStop.on('click', function (e){
			e.preventDefault();
			clearInterval(auto);

			btnStop.removeClass('active');
			btnPlay.addClass('active');
			autoPlay = false;

		});

		btnPlay.on('click', function (e){
			e.preventDefault();
			auto = setInterval(play, playSpeed);

			btnPlay.removeClass('active');
			btnStop.addClass('active');
			autoPlay = true;
		});

	}

	// end visual

	return {
		visual: visual,
		// gallery : gallery
	}

}(jQuery));

$(document).ready(function (){
	KNBUI.keyVisual.visual();
});

$(document).ready(function (){
	KEYUI.visual.gallery($('.gallery-view'));
})
