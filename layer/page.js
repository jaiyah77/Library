demoon.layer = layer();

accessibilityFocus();

function init() {
    $.ajax({
        url: "sample.html"
    }).done(function (html) {
        demoon.layer.open(html);
    });
}

$(document).ready(function () {
    // init();
});