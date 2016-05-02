$(function (){
	function switchButton(e){
		var switchBtn = '[data-switch]',
			switchBox = '[data-switch-name]',
			target = e.target,
			hideTarget = $('[data-switch-name="]' + $(target).attr('data-switch') + '"]');

		if(!$(switchBox).length){
			return;
		}

		$(switchBox).hide();

		hideTarget.hide();
		$(e.target.hash).show();
	}

	$(document).on('click.switchBtn', '[data-switch]', function (e){
		e.preventDefault();
		switchButton(e);
	});

	$('[data-checked="checked"]').each(function (){
		$(this).trigger('click');
	});
});


