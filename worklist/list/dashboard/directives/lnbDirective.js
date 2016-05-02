angular.module('workList')
	.directive('lnb', function (){
		return {
			scope: true,
			replace: true,
			templateUrl: 'templates/lnb.html'
		}
	});