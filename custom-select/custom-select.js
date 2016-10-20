function customSelect(selector) {
	var ojb = $(selector);
	function render() {
		var list = '';
		var button = '' +
			'<a href="#ui-' + $(this).attr('id') + '">' +
			'<span class="ui-select-text">' + $(this).find('[value="' + $(this).val() + '"]').text() + '</span>' +
			'</a>';
		$(this).after('<div data-ui-select=' + $(this).attr('id') + '><ul role="listbox" id="ui-' + $(this).attr('id') + '"></ul></div>');
		$(this).find('option').each(function () {
			list += '<li tabindex="0">' + $(this).text() + '</li>'
		});
		
		$(this).next().find('ul').html(list);
		$(this).next().prepend(button);
	}
	ojb.each(render);
	
	
}


$(function () {
	customSelect('select');
});


