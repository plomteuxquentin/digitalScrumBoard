(function() {
	'use strict';

	angular
		.module('app.task')
		.directive('dscTaskCard', taskCard);

	/* @ngInject */
	function taskCard () {
		// Display task Info
		// Usage:
		//  <dsc-task-card entity="task" for-edition="Edition function">
		var directive = {
			restrict: 'E',
			scope: {
				entity: '=',
				forEdition: '='
			},
			templateUrl:'app/task/taskCard.directive.html',			
		};
		return directive;
	}
})();