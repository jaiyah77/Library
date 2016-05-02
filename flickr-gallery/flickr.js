(function ($) {
	var page,
		total;

	$.template = function (tempId, container, data, callback) {
		var template = doT.template($(tempId).html());
		var items = [];

		if (!$('.pic-list').has('ul').length) {
			$('.pic-list').html('<ul></ul>');
		}

		if (total < page) {
			alert('마지막 사진입니다.');
			return;
		}

		$.each(data.photo, function (index) {
			items.push(template(data.photo[index]));
		});

		$(container).append(items);

		page = data.page + 1;
		total = data.pages;

		if (callback) {
			callback();
		}
	};

	function update(page) {
		var flickerAPI = "https://api.flickr.com/services/rest/?&api_key=d09fa785dc0fb2a901cad9b46ae487fb&user_id=104088403%40N05&format=json&nojsoncallback=1";

		$.get(flickerAPI, {
			method: "flickr.photos.search",
			per_page: 8,
			page: page
		}).done(function (data) {
			$.template('#temp-photo-list', '.pic-list ul', data.photos);
		});
	}

	$(document).ready(function () {
		$(".btn-more").on("click", function () {
			update(page);
		});

		//init show
		update(page);
	});
}(window.jQuery));
