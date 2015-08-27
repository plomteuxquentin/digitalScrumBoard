(function () {
	'use strict';

	angular
		.module('app.sprint')
		.controller('sprintSelectModalController',sprintSelectModalController);

	sprintSelectModalController.$inject = ['$modalInstance','TYPES','PRIORITIES', 'modalConfig'];
	/* @ngInject */
	function sprintSelectModalController($modalInstance,TYPES,PRIORITIES, modalConfig) {
		var vm = this;



		vm.title = modalConfig.title;
		vm.tasks = modalConfig.tasks;

		vm.select = selectTask;
		

		function selectTask(task){
			task.isSelected = !task.isSelected;
		}

		vm.ok = function () {
			var result = [];
			
			angular.forEach(vm.tasks,function(task){
				if(task.isSelected){
					result.push(task);
				}
				delete task.isSelected;
			});
			$modalInstance.close(result);
		};


		vm.cancel = function () {
			$modalInstance.dismiss('cancel');
		};
	}
})();