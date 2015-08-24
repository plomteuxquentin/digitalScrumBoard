(function () {
	'use strict';

	var member = angular.module('app.member');


	//Set of roles available
	var AVAILABLE_ROLES = {
		TEAM_MEMBER:{id:0,title:'team member'},
		PRODUCT_OWNER:{id:1,title:'product owner'},
		SCRUM_MASTER:{id:2,title:'scrum master'}
	};


	member.constant('AVAILABLE_ROLES', AVAILABLE_ROLES);
})();
