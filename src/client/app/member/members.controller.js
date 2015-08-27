(function () {
	'use strict';

	angular
		.module('app.member')
		.controller('MembersController', MembersController);

	MembersController.$inject = ['memberManager', 'logger', '$modal', 'Member'];
	/* @ngInject */
	function MembersController(memberManager, logger, $modal, Member) {
		var vm = this;

		
		var modalTemplate = {
			animation: true,
			templateUrl: 'app/member/modal/addMembers.html',
			controller: 'MemberAddModalController',
			controllerAs:'vm',
			size: 'md',
		}
		
		
		
		vm.title = 'Members';

		activate();

		function activate() {
			//TODO: MOVE INTO STATE
			logger.info('Loading Members');
			vm.members = memberManager.getAll();
			logger.info('Activated Members View');
		}
		



		vm.upsertMemberModal = upsertMemberModal;
			
		
		function upsertMemberModal(member) {
			var template = angular.copy(modalTemplate);
			//TODO: MOVE INTO MODAL CONTROLLER
			var config = {};
			
			
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
					member : new Member(),
					modalTitle : 'Create Member',
					modalAction : 'Create',
					actionTitle : 'Member added',
					isNew : true,
				}
			}
				
				
			template.resolve = {
				memberModalConfig: function () {
						return config;
					}
				};	
			
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
			memberManager.setMember(member);
			vm.members = memberManager.getAll();
			logger.success(member.getFullName(),member,actionTitle);
		}
		
		function deleteMember(member){
			memberManager.deleteMember(member);
			vm.members = memberManager.getAll();
			logger.success(member.getFullName(),member,'Member Deleted');
		}
	}
})();
