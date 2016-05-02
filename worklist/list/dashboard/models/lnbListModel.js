angular.module('workList')
	.service('lnbListModel', function (){
		var service = this;
		
		service.lnblist = [
			{
				dataUrl: 'data1.html',
				listName: '리스트1'
			},
			{
				dataUrl: 'data2.html',
				listName: '리스트2'
			}
		];
		
		service.getLnb = function (){
			return service.lnblist;
		};
	});

