(function($){

	$.scroll = {};

	$.scroll.result = undefined;

	$.scroll.info = function(node){
		var pst = {};
		for(var i = 0, max = node.length; i < max; i++){
			pst[i] = {
				top:$(node[i]).offset().top,
				bottom:$(node[i]).offset().top + $(node[i]).outerHeight() - 1
			};
		}
		return pst;
	};

	$.scroll.setPosition = {
		top:0,
		left:0
	};

	$.scroll.checkEvent = function(){
		var nTop = $(window).scrollTop(),
			nLeft = $(window).scrollLeft(),
			oTop = $.scroll.setPosition.top,
			oLeft = $.scroll.setPosition.left;
		if(nTop != oTop && nLeft != oLeft){
			$.scroll.setPosition.top = nTop;
			$.scroll.setPosition.left = nLeft;
			$.scroll.result = 'scrollXY';
		} else if(nTop != oTop && nLeft == oLeft){
			$.scroll.setPosition.top = nTop;
			$.scroll.result = 'scrollY';
		} else if(nTop == oTop && nLeft != oLeft){
			$.scroll.setPosition.left = nLeft;
			$.scroll.result = 'scrollX';
		}
	};

	$.scroll.checkPosition = function(button, info){
		for(var i = 0, max = button.length; i < max; i++){
			if($.scroll.setPosition.top >= info[i].top && $.scroll.setPosition.top <= info[i].bottom){
				$(button).removeClass('on');
				$($(button)[i]).addClass('on');
				return;
			}
		}
	};

	$.scroll.move = function(scrollTarget, scrollValue, speed, callback){
		$(scrollTarget).stop().animate({
			"scrollTop":isNaN(scrollValue) ? $(scrollValue).offset().top : scrollValue
		}, speed, callback);
	};

	$.scroll.stopCallBack = function(time, callback){
		clearTimeout($.data(this, 'scrollTimeOut'));
		$.data(this, 'scrollTimeOut', setTimeout(callback, time));
	};

	$(document).ready(function(){
		$.scroll.move('html,body', 1200, 800);

		$('[data-role="button"]').on("click", function(e){
			e.preventDefault();
			$.scroll.move('html,body', $(this)[0].hash, 800);

		});
	});

	$(window).on("scroll", function(){
		function moveCallBack(){
			$.scroll.checkEvent();
			$.scroll.checkPosition($('[data-role="button"]'), $.scroll.info($('.scroll-target')));
		}

		$.scroll.stopCallBack(250, moveCallBack);
	});

}(window.jQuery));