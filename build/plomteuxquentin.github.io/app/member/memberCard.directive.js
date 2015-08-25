(function() {
	'use strict';

	angular
		.module('app.member')
		.directive('dscMemberCard', memberCard);

	/* @ngInject */
	function memberCard () {
		// Display member Info
		// Usage:
		//  <dsc-member-card member="member" for-edition="Edition function"></<dsc-member-card>
		var directive = {
			restrict: 'E',
			scope: {
				member: '=',
				forEdition: '='
			},
			templateUrl:'app/member/memberCard.directive.html',			
		};
		return directive;
	}
})();