angular.module('workList')
	.directive('list', function (){
		return {
			scope: true,
			replace: true,
			templateUrl: 'templates/list.html'
		}
	});