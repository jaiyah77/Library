/**
 * 20150625 by Moon Kyung tae
 * cookie
 */
var pageCookie = (function (){
	var cookie = {};
	
	cookie.map = (function (){
		if(!document.cookie){
			return null;
		}
		var cookies = document.cookie.replace(/\s/gi, '').split(";"),
			map = {};
		for (var i = 0, max = cookies.length; i < max; i++) {
			map[cookies[i].split("=")[0]] = cookies[i].split("=")[1];
		}
		return map;
	}());
	
	cookie.setType = {
		day: function (now, name, value, time){
			now.setDate(now.getDate() + time);
			this.set(now, name, value);
		},
		
		min: function (now, name, value, time){
			now.setMinutes(now.getMinutes() + time);
			this.set(now, name, value);
		},
		
		sec: function (now, name, value, time){
			now.setSeconds(now.getSeconds() + time);
			this.set(now, name, value);
		},
		
		set: function (now, name, value){
			document.cookie = name + '=' + value + '; expires=' + now.toUTCString();
		}
	};
	
	cookie.setCookie = function (cookieName, cookieValue, type, time){
		var now = new Date();
		cookie.setType[type](now, cookieName, cookieValue, time);
	};
	
	cookie.delCookie = function (cookieName){
		var now = new Date();
		now.setDate(now.getDate() - 1);
		document.cookie = cookieName + "=; expires=" + now.toUTCString();
	};
	
	cookie.getCookie = function (key){
		return cookie.map[key];
	};
	
	return cookie;
}());

//
$(document).ready(function (){
	if(document.cookie){
		$('.msg').append('<p>' + document.cookie + '</p>');
	} else {
		$('.msg').append('<p>없음</p>');
	}
	
	$('.setDCookie').on('click', function (){
		pageCookie.setCookie($('.day').val(), $('.dayVal').val(), 'day', +$('.dayTime').val());
	});
	
	$('.setMCookie').on('click', function (){
		pageCookie.setCookie($('.min').val(), $('.minVal').val(), 'min', +$('.minTime').val());
	});
	
	$('.setSCookie').on('click', function (){
		pageCookie.setCookie($('.sec').val(), $('.secVal').val(), 'sec', +$('.secTime').val());
	});
	
	$('.delCookie').on('click', function (){
		var cookie = $('.del').val();
		pageCookie.delCookie(cookie);
	});
	
	$('.checkCookie').on('click', function (){
		var cookie = $('.check').val();
		var a = pageCookie.getCookie(cookie);
		if(a){
			alert(a);
		} else {
			alert('입력한 ' + cookie + ' 쿠키는 없습니다.')
		}
		
	});
});
