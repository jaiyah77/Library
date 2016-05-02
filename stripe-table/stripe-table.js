/**
 * Created by Moon kyung tae on 14. 12. 14
 * module name : stripe table
 */
(function ($) {
	function stripe() {
		var moduleName = ".stripe-table",
				moduleList = $(moduleName);
		if (moduleList.length < 1) {
			return;
		}

		//obj
		function stripeTableObj(a) {
			var obj = $(a),
				tr = obj.find('tbody tr'),
				rowSpan = this.findRowSpan(tr),
				trGroup = this.makeGroup(tr),
				group = this.reMakeGroup(trGroup, rowSpan),
				thisData = obj.data("class"),
				addClassName = thisData ? thisData : "bg-color";

			this.onClass(rowSpan, group, addClassName);
		}


		stripeTableObj.prototype = {
			findRowSpan: function (obj) {
				var result = [];
				$(obj).each(function (index) {
					var findTh = $(this).find('> th')[0],
							findTd = $(this).find('> td')[0],
							rowNum;
					rowNum = findTh ? $(findTh).attr('rowspan') : $(findTd).attr('rowspan');
					if (rowNum) {
						result.push(index + "," + rowNum);
					}
				});
				result = result.length > 0 ? result : null;
				return result;
			},
			makeGroup: function (obj) {
				var trGroup = [];
				$(obj).each(function () {
					trGroup.push(this);
				});
				return trGroup;
			},
			reMakeGroup: function (rg, rp) {
				if (!rp) {
					return rg;
				} else {
					var reTrGroup = rg;
					for (var i = rp.length - 1; 0 <= i; i--) {
						var set = rp[i].split(","),
								start = Number(set[0]),
								rowNum = Number(set[1]),
								end = start + rowNum,
								rowTr = reTrGroup.slice(start, end);
						reTrGroup[start] = (rowTr);
						reTrGroup.splice(start + 1, rowNum - 1);
					}
					return reTrGroup;
				}
			},
			onClass: function (cq, ct, cn) {
				if (cq === null) {
					for (var i = ct.length - 1; 0 <= i; i = i - 2) {
						$(ct).eq(i).addClass(cn);
					}
				} else {
					for (var j = ct.length - 1; 0 <= j; j = j - 2) {
						if ($(ct).eq(j)[0].length > 0) {
							$($(ct).eq(j)[0]).each(function () {
								$(this).addClass(cn);
							});
						} else {
							$(ct).eq(j).addClass(cn);
						}
					}
				}
			}
		};

		//make object
		for (var i = 0, j = moduleList.length; i < j; i++) {
			new stripeTableObj(moduleList[i]);
		}
	}

	$(document).on('ready', function () {
		stripe();
	});
}(window.jQuery));