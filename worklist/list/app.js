var workList = angular.module('Work', [
	'ngRoute',
	'Work.Common',
	'Work.Dashboard',
	'Work.Storyboard'
]);

workList.value('LNB_LIST', [
	{name: 'value'}
]);