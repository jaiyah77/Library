/**
 * Created by MOON KYUNG TAE
 *
 */
function windowPopup(){
	function open(e){
		e.preventDefault();
		var url = $(this).attr('href'),
			specs = $(this).attr('data-ui-window-open'),
			name = $(this).attr('data-ui-window-name') ? $(this).attr('data-ui-window-name') : false;
		
		if(name){
			open.data[name] = window.open(url, '_blank', specs);
		} else{
			window.open(url, '_blank', specs);
		}
	}
	
	open.data = {};
	
	function close(value){
		open.data[value].close();
		delete open.data[value];
	}
	
	$(document).on('click.demoon.windowOpen', '[data-ui-window-open]', open);
	
	return {
		open: open,
		close: close
	}
}