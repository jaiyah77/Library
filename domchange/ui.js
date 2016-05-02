$(".myClass").on("DOMSubtreeModified", function(){
	alert('dom changed');
});


$('button').on("click", function(){
	$(".myClass").append('<div class="test">DOM이 추가 되었습니다.</div>');
});