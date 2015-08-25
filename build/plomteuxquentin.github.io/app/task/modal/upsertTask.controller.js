(function () {
	'use strict';

	angular
		.module('app.task')
		.controller('upsertTaskModalController',upsertTaskModalController);

	upsertTaskModalController.$inject = ['$modalInstance','TYPES','PRIORITIES', 'modalConfig'];
	/* @ngInject */
	function upsertTaskModalController($modalInstance,TYPES,PRIORITIES, modalConfig) {
		var vm = this;

	
		vm.types = [];

		angular.forEach(TYPES, function(value) {
			vm.types.push(value);
		});
	
		vm.priorities = [];

		angular.forEach(PRIORITIES, function(value) {
			vm.priorities.push(value);
		});
		
		
		vm.title = modalConfig.modalTitle;
		vm.isNew = modalConfig.isNew;

		if (vm.isNew) {
			vm.okTitle = 'Create';
		} else {
			vm.okTitle = 'Update';
		}

		vm.entity = angular.copy(modalConfig.entity);

		vm.reset = function () {
			vm.entity = angular.copy(modalConfig.entity);
		}

		vm.ok = function () {
			var result = {operation: 'UPSERT',entity: vm.entity};
			$modalInstance.close(result);
		};

		vm.delete = function () {
			var result = {operation: 'DELETE',entity: vm.entity};
			$modalInstance.close(result);
		};

		vm.cancel = function () {
			$modalInstance.dismiss('cancel');
		};
	}
})();