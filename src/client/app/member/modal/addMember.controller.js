(function () {
	'use strict';

	angular
		.module('app.member')
		.controller('MemberAddModalController', MemberAddModalController);

	MemberAddModalController.$inject = ['$modalInstance', 'AVAILABLE_ROLES', 'memberModalConfig' ];
	/* @ngInject */
	function MemberAddModalController($modalInstance, AVAILABLE_ROLES, memberModalConfig) {
		var vm = this;

		vm.title = memberModalConfig.modalTitle;
		vm.okTitle = memberModalConfig.modalAction;		
		vm.isNew =  memberModalConfig.isNew;		
		
		vm.AvailableRoles = [];

		angular.forEach(AVAILABLE_ROLES, function(value) {
			vm.AvailableRoles.push(value);
		});
		
		vm.member = angular.copy(memberModalConfig.member);
		
		vm.reset = function(){
			vm.member = angular.copy(memberModalConfig.member);
		}
		
		vm.ok = function () {
			var result = {operation:'UPSERT', member:vm.member};
			$modalInstance.close(result);
		};
		
		vm.delete = function () {
			var result = {operation:'DELETE', member:vm.member};
			$modalInstance.close(result);
		};

		vm.cancel = function () {
			$modalInstance.dismiss('cancel');
		};
	}
})();