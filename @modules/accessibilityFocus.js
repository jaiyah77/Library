/**
 * Created by MOON KYUNG TAE
 * focus
 */
function accessibilityFocus(){
	$(document).on('keydown', '[data-ui-focus-prev], [data-ui-focus-next]', function (e){
		var next = $(e.target).attr('data-ui-focus-next'),
			prev = $(e.target).attr('data-ui-focus-prev'),
			target = next || prev || false;
		
		if(!target || e.key != 'Tab'){
			return;
		}

		if((!e.shiftKey && !!next) || (e.shiftKey && !!prev)){
			e.preventDefault();
			$('[data-ui-focus-id="' + target + '"]').focus();
		}
	});
}
