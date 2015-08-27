(function () {
	'use strict';

	angular
		.module('app.member')
		.controller('MemberAddModalController', MemberAddModalController);

	MemberAddModalController.$inject = ['$modalInstance', 'roles', 'memberModalConfig' ];
	/* @ngInject */
	function MemberAddModalController($modalInstance, roles, memberModalConfig) {
		var vm = this;

		vm.title = memberModalConfig.modalTitle;
		vm.okTitle = memberModalConfig.modalAction;		
		vm.isNew =  memberModalConfig.isNew;		
		vm.AvailableRoles = roles;
		vm.member = angular.copy(memberModalConfig.member);
		
		
		
		vm.reset = function(){
			vm.member = angular.copy(memberModalConfig.member);
		};
		
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