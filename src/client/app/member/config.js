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
	

	member.run(configure);

	configure.$inject = ['memberManager'];
	/* @ngInject */
	function configure(memberManager) {
		
		
		//MOCK
		var members = [
			{id : 'm1', firstName : 'Drogon', lastName : 'the dragon', role : AVAILABLE_ROLES.TEAM_MEMBER},
			{firstName : 'Daenerys', lastName : 'Targaryen', role : AVAILABLE_ROLES.PRODUCT_OWNER, color : '#acb8ab'},
			{firstName : 'Daario', lastName : 'Naharis', color : '#93F26D'},
			{firstName : 'Tyrion', lastName : 'Lannister', role : AVAILABLE_ROLES.SCRUM_MASTER, color : '#e6bc7e'},
			{firstName : 'Missandei', lastName : '', role : AVAILABLE_ROLES.TEAM_MEMBER, color : '#7dd5ff'}
		]
		
		angular.forEach(members,function(value){
			memberManager.setMember(value);
		});
	}

})();
