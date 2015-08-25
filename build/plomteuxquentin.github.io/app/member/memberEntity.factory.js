(function () {
	'use strict';

	angular
		.module('app.member')
		.factory('Member',memberEntity);

	memberEntity.$inject = ['AVAILABLE_ROLES'];

	/* @ngInject */
	function memberEntity(AVAILABLE_ROLES) {
		
		
		
		var DEFAULT_COLOR='#FFFFFF';//TODO put in config

		function Member(data) {
			
			this.id = null;
			this.firstName = '';
			this.lastName = '';
			this.role = AVAILABLE_ROLES.TEAM_MEMBER;
			this.color = DEFAULT_COLOR;

			if (data) {
				this.setData(data);
			}
			// Some other initializations related to book
		};
		
		Member.prototype ={
			setData : setData,
			getFullName : getFullName
		}
		

		return Member;
		
		function setData(data) {
			angular.extend(this,data);
		}		
		
		function getFullName(){
			return this.firstName+' '+this.lastName;
		}
	}
}());