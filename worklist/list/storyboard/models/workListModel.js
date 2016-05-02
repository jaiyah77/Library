angular.module('workList')
	.service('workListModel', function (dataService){
		var service = this,
			data;
		
		service.readData = function (dataName){
			return dataService.load(dataName).then(function (result){
				service.dataRemake($(result.data));
			});
		};
		
		service.dataRemake = function (node){
			data = {
				"category": "",
				"dataList": []
			};

			$('body').append('<div class="dataBox"></div>');
			var dataBox = $('.dataBox');
			dataBox.append(node);
			data.category = dataBox.find('h1').text();
			
			dataBox.find('table').each(function (index){
				data.dataList.push({
					"listName": $(this).find('caption').text(),
					"list": []
				});
				$(this).find('tr').each(function (){
					var td = $(this).find('td');
					data.dataList[index].list.push({
						"name": td.eq(0).text(),
						"id": td.eq(1).text(),
						"owner": td.eq(2).text(),
						"review": td.eq(3).text(),
						"date": td.eq(4).text(),
						"state": td.eq(5).text()
					});
				});
			});
			dataBox.remove();
		};
		
		service.getUser = function (){
			return user;
		};
		
		service.getDate = function (){
			return date;
		};
		
		service.getData = function (){
			return data;
		};
	});

