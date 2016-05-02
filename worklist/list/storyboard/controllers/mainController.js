angular.module('workList')
	.controller('MainController', function (workListModel, lnbListModel){
		var main = this,
			dataDir = '../data/';
		
		main.data = null;
		main.lnbList = lnbListModel.getLnb();
		
		main.getData = function (dataName){
			workListModel.readData(dataDir + dataName).then(function (){
				main.data = workListModel.getData();
			});
		};
		
		main.getData(dataDir + 'data1.html');
	});