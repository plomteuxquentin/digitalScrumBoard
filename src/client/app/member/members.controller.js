(function () {
	'use strict';

	angular
		.module('app.member')
		.controller('MembersController', MembersController);

	MembersController.$inject = ['memberManager', 'logger', '$modal', 'members', 'AVAILABLE_ROLES'];
	/* @ngInject */
	function MembersController(memberManager, logger, $modal ,members,AVAILABLE_ROLES) {
		var vm = this;

		

		
		vm.title = 'Members';
		

		vm.upsertMemberModal = upsertMemberModal;

		activate();

		function activate() {
			vm.members = members;
			logger.info('Activated Members View');
		}
		

	

		function upsertMemberModal(member) {
			
			var config = {};

			var template = {
				animation: true,
				templateUrl: 'app/member/modal/addMembers.html',
				controller: 'MemberAddModalController',
				controllerAs:'vm',
				size: 'md',
				resolve:{
					memberModalConfig : function () {
						return config;
					},
					roles : function(){
						var roles = []
						angular.forEach(AVAILABLE_ROLES, function(value) {
							roles.push(value);
						});
						return roles
					}
				}
			}
			
			
			if (member) {
				config = {
					member : member,
					modalTitle : 'Edit '+member.getFullName(),
					modalAction : 'Update',
					actionTitle : 'Member updated',
					isNew : false,
				}
			} else {
				config = {
					member : memberManager.getNew(),
					modalTitle : 'Create Member',
					modalAction : 'Create',
					actionTitle : 'Member added',
					isNew : true,
				}
			}

			
			var modalInstance = $modal.open(template);
			modalInstance.result.then(accept, refuse);
			
			function accept(modalMembre){
				if(modalMembre.operation == 'UPSERT'){ upsertMember(modalMembre.member,config.actionTitle);} 
				else if(modalMembre.operation == 'DELETE'){ deleteMember(modalMembre.member);}
				else { console.error('Unknow Operation')}
			}
			
			function refuse(){
				console.log('Member modal dismissed')
			}
		}
		
		function upsertMember(member,actionTitle){
			memberManager.upsert(member).then(onUpdateSuccess,onUpdateFailure);
			
			function onUpdateSuccess(){
				vm.members = memberManager.getAll();
				logger.success(member.getFullName(),member,actionTitle);
			}
			
			function onUpdateFailure(reason){
				console.error(reason);
				logger.error("",member,actionTitle+' failed');
			}
		}
		
		function deleteMember(member){
			
			//TODO MANAGER PROMISE
			memberManager.deleteMember(member);
			vm.members = memberManager.getAll();
			logger.success(member.getFullName(),member,'Member Deleted');
		}
	}
})();
