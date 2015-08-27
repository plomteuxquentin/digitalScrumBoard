(function() {
	'use strict';

	angular
		.module('app.task')
		.directive('dsbTaskCard', taskCard);

	/* @ngInject */
	function taskCard () {
		// Display task Info
		// Usage:
		//  <dsb-task-card entity="task">
		var directive = {
			restrict: 'E',
			scope: {
				entity: '=',
			},
			templateUrl:'app/task/taskCard.directive.html',			
		};
		return directive;
	}
})();