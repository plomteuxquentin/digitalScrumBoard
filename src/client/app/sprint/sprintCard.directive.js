(function() {
	'use strict';

	angular
		.module('app.sprint')
		.directive('dscSprintCard', sprintCard);

	/* @ngInject */
	function sprintCard () {
		// Display task Info
		// Usage:
		//  <dsc-task-card entity="task" for-edition="Edition function">
		var directive = {
			restrict: 'E',
			scope: {
				entity: '=',
				forEdition: '='
			},
			templateUrl:'app/sprint/sprintCard.directive.html',			
		};
		return directive;
	}
})();