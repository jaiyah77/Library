// 접근성 관련 포커스 강제 이동
function accessibilityFocus(){
	$(document).on('keydown', '[data-focus-prev], [data-focus-next]', function (e){
		var next = $(e.target).attr('data-focus-next'),
			prev = $(e.target).attr('data-focus-prev'),
			target = next || prev || false;
		
		if(!target || e.keyCode != 9){
			return;
		}
		
		if((!e.shiftKey && !!next) || (e.shiftKey && !!prev)){
			e.preventDefault();
			$('[data-focus="' + target + '"]').focus();
		}
	});
}

accessibilityFocus();