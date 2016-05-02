/**
 * Created by MOON KYUNGTAE
 */

$(document).on('click.demoon.windowOpen', '[data-window-open]', demoon.common.windowOpen);


function adviceBanner(container, options) {
	if(!container.length) {
		return;
	}

	var detect = {};
	var config = {
		start : 0
	};

	$.extend(config, options);

	function init() {
		setup();

		if(config.start == 0) {
			detect.tabBtnListItem.eq(0).addClass('active');
			detect.viewListItem.eq(0).addClass('active');
			return;
		}

		if(detect.max >= config.start) {
			slide(config.start, 0)
		}

	}

	function setup() {
		detect.viewList = container.find('.p-category');
		detect.viewListItem = detect.viewList.find('.p-list');
		detect.tabBtnList = container.find('.p-tab');
		detect.tabBtnListItem = detect.tabBtnList.find('li');
		detect.height = container.find('.p-list').height();
		detect.btnLength = detect.tabBtnListItem.size();
		detect.current = 0;
		detect.min = 0;
		detect.max = detect.btnLength - 1;

		detect.viewListItem.each(function(index) {
			$(this).data('idx', index);
		});
		detect.tabBtnListItem.each(function(index) {
			$(this).find('a').data('idx', index);
		});

	}

	function up() {
		if(detect.current + 1 > detect.max) {
			return;
		}
		slide(detect.current + 1);
	}

	function down() {
		if(detect.current - 1 < detect.min) {
			return;
		}
		slide(detect.current -1);
	}

	function direction(num) {
		return detect.current > num ? 'up' : 'down';
	}

	function slideEnd(index) {
		detect.viewListItem.eq(detect.current).removeClass('active');
		detect.viewListItem.removeAttr('style');
		detect.tabBtnListItem.eq(detect.current).removeClass('active');
		detect.tabBtnListItem.eq(index).addClass('active');
		detect.current = index;
	}

	function slide(index, speed) {
		if((index == detect.current) || (index > detect.max)) {
			return;
		}

		if(detect.viewListItem.is(':animated')) {
			return;
		}

		var to = direction(index),
			value;

		speed = speed == 0 ? 0 : 400;

		switch(to) {
			case 'down' :
				value = -detect.height;
				break;

			case 'up' :
				value = detect.height;
				break;

		}

		detect.viewListItem.eq(index).css({'top' : -value}, speed).addClass('active');
		detect.viewListItem.eq(index).animate({'top' : 0}, speed);
		detect.viewListItem.eq(detect.current).animate({'top' : value}, speed, function(){
			slideEnd(index);
		});

	}

	init();
	detect.tabBtnListItem.find('a').on('click.adviceBanner', function(e) {
		e.preventDefault();
		slide($(this).data('idx'));
	});

}

$(document).ready(function(){
	adviceBanner($('.advice-product'));
});

