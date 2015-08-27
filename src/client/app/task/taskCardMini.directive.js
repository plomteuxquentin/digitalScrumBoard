(function() {
	'use strict';

	angular
		.module('app.task')
		.directive('dsbTaskCardMini', taskCard);

	/* @ngInject */
	function taskCard () {
		var directive = {
			restrict: 'E',
			scope: {
				entity: '=',
			},
			templateUrl:'app/task/taskCardMini.directive.html',			
		};
		return directive;
	}
})();