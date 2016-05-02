#DOMSubtreeModified 이벤트

데모: http://kyungtae.com/lab/domchange/index.html

---

아래와 같이 부모인 div.myClass에 DOMSubtreeModified 이벤트를 등록하면  
div.myClass 속의 DOM이 변경 될때마다 이벤트가 감지된다.  

    $(".myClass").on("DOMSubtreeModified", function(){
        alert('dom changed');
    });
    
    
    $('button').on("click", function(){
        $(".myClass").append('<div class="test">DOM이 추가 되었습니다.</div>');
    });
    
    
참고.    
ie8이하, 오페라는 x, http://help.dottoro.com/ljrmcldi.php
      