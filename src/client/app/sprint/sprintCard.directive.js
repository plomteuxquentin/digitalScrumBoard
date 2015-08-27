(function() {
	'use strict';

	angular
		.module('app.sprint')
		.directive('dsbSprintCard', sprintCard);

	/* @ngInject */
	function sprintCard () {
		// Display task Info
		// Usage:
		var directive = {
			restrict: 'E',
			scope: {
				entity: '=',
			},
			templateUrl:'app/sprint/sprintCard.directive.html',			
		};
		return directive;
	}
})();