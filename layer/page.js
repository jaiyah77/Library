var demoon = {};
demoon.helper = helper();
demoon.layer = layer();
accessibilityFocus();

function init(){
	$.ajax({
		url: "sample.html"
	}).done(function (html){
		demoon.layer.open(html);
	});
}

$(document).ready(function (){
	init();
});