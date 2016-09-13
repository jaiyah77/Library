/**
 * Created by MOON KYUNG TAE on 2016. 6. 9..
 */
function scrollBar(wrap){
	wrap.prepend('<div class="inner"></div>');
	wrap.find('*').appendTo('.inner');

	var wrapperHeight = wrap.outerHeight() - parseInt(wrap.css('border-top-width')) - parseInt(wrap.css('border-bottom-width'));

	console.log(wrapperHeight);
}

scrollBar($('.scroll-bar-01'));