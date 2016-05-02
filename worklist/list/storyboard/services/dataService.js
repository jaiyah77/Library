angular.module('workList')
	.service('dataService', function ($http){
		var service = this;
		
		service.load = function (dataUrl){
			return $http.get(dataUrl);
		};
	});