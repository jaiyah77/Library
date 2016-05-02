/**
 * Created by demoon84 on 2015-04-01.
 */

(function($){
	function gas(){
		var pMonth = $("#prev-month"),
			nMonth = $("#next-month");
		var checkResult = checkInput(pMonth, nMonth);
		if(!checkResult){
			return
		}
		calculation(pMonth, nMonth);
	}

	function checkInput(pv, nv){
		var p = pv.val(),
			n = nv.val();
		if(!$.trim(p)){
			alert("전월지침을 입력하세요!");
			pv.focus();
			return false;
		}
		if(!$.trim(n)){
			alert("당월지침을 입력하세요!");
			nv.focus();
			return false;
		}
		return true;
	}

	function calculation(pv, nv){
		var p = pv.val(),
			n = nv.val(),
			useGas = n - p;
		if(isNaN(useGas)){
			alert("숫자만 입력해 주세요!^^");
			return;
		}
		if(useGas < 0){
			alert("당월 지침이 전월 지침 보다 낮네요...\n다시 입력해주세요! ^^");
			pv.focus();
			return;
		}
		var charge = useGas * 0.9999 * 43.3120,
			basicCost = 850,
			basicUnitCost = 516,
			addUnitCost = charge - 516,
			chargeCost = 0;
		if(charge < 517){
			chargeCost = parseInt((charge * 22.5341 + basicCost) * 1.1);
			chargeCost = addComma(chargeCost);
		} else{
			chargeCost = parseInt(basicUnitCost * 22.5341);
			chargeCost = parseInt(chargeCost + addUnitCost * 22.5006) + basicCost;
			chargeCost = chargeCost * 1.1;
			chargeCost = parseInt(chargeCost);
			chargeCost = addComma(chargeCost);
		}
		$(".use .num").text(useGas);
		$(".charge .num").text(chargeCost);
	}

	function addComma(a){
		var input = String(a);
		var output = "";
		for(var i = input.length; i >= 0; i--){
			if((input.length - i) % 3 == 1 && output.length != 0 && input.charAt(i) != "-"){
				output = "," + output;
			}
			output = input.charAt(i) + output;
		}
		return output;
	}

	$(document).on("click", ".calculation", function(){
		gas();
	});
}(window.jQuery));