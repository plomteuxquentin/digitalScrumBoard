(function() {
	'use strict';

	angular
		.module('app.task')
		.directive('dscTaskCardMini', taskCard);

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
			templateUrl:'app/task/taskCardMini.directive.html',			
		};
		return directive;
	}
})();