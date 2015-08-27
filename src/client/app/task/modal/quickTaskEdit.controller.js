(function () {
	'use strict';

	angular
		.module('app.task')
		.controller('QuickTaskEditController',QuickTaskEditController);

	QuickTaskEditController.$inject = ['$modalInstance','TYPES','PRIORITIES', 'modalConfig'];
	/* @ngInject */
	function QuickTaskEditController($modalInstance,TYPES,PRIORITIES, modalConfig) {
		var vm = this;

	
		vm.types = [];
		vm.priorities = [];
		vm.entity = angular.copy(modalConfig.entity);
		vm.title = modalConfig.modalTitle;
		vm.isNew = modalConfig.isNew;
		vm.okTitle = modalConfig.okTitle;

		
		
		angular.forEach(TYPES, function(value) {
			vm.types.push(value);
		});

		angular.forEach(PRIORITIES, function(value) {
			vm.priorities.push(value);
		});
		
		

		vm.reset = function () {
			vm.entity = angular.copy(modalConfig.entity);
		};

		vm.ok = function () {
			var result = {operation: 'UPDATE',entity: vm.entity};
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