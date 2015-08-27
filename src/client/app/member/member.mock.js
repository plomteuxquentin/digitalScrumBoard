(function () {
	'use strict';

	angular
		.module('app.member')
		.run(mock);

	mock.$inject = ['memberManager','MOCK_UP_MODE','AVAILABLE_ROLES'];
	/* @ngInject */
	function mock(manager,MOCK_UP_MODE,AVAILABLE_ROLES) {

		if(MOCK_UP_MODE){
			//MOCK
			var members = [
				{firstName : 'Drogon', lastName : 'the dragon', role : AVAILABLE_ROLES.TEAM_MEMBER},
				{firstName : 'Daenerys', lastName : 'Targaryen', role : AVAILABLE_ROLES.PRODUCT_OWNER, color : '#acb8ab'},
				{firstName : 'Daario', lastName : 'Naharis', color : '#93F26D'},
				{firstName : 'Tyrion', lastName : 'Lannister', role : AVAILABLE_ROLES.SCRUM_MASTER, color : '#e6bc7e'},
				{firstName : 'Missandei', lastName : '', role : AVAILABLE_ROLES.TEAM_MEMBER, color : '#7dd5ff'}
			]

			angular.forEach(members,function(value){
				manager.setMember(value);
			});
		}
	}

})();