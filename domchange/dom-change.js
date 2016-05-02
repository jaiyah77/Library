$(document).on("DOMSubtreeModified", '[data-watch]', function (){
	console.log('dom changed');
});

$('button').on("click", function (){
	$(".myClass").append('<div class="test">DOM 추가</div>');
});