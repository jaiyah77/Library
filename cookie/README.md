#cookie

**DEMO URL**  
http://kyungtae.com/lab/cookie/cookie.html

##설명
cookies를 생성, 삭제, 추출

## pageCookie.setCookie(cookieName, cookieValue, type, time) 
cookieName = 쿠키 이름  
cookieValue = 쿠키 값  
type = (day, min, sec)  
time = 시간

## pageCookie.delCookie(cookieName)
cookieName = 삭제할 쿠키 이름

## pageCookie.getCookie(key)  
key = 추출할 쿠기값의 쿠키이름  
추출된 쿠키값을 리턴

## pageCookie.map  
브라우저 시작시 현재 설정된 쿠키 값을 객체 형식으로 저장
