(function () {
	'use strict';

	angular
		.module('app.sprint')
		.controller('sprintSelectModalController',sprintSelectModalController);

	sprintSelectModalController.$inject = ['taskManager','$modalInstance','TYPES','PRIORITIES', 'modalConfig'];
	/* @ngInject */
	function sprintSelectModalController(taskManager,$modalInstance,TYPES,PRIORITIES, modalConfig) {
		var vm = this;



		vm.entity = angular.copy(modalConfig.entity);
		vm.title = 'Select tasks for sprint n° '+vm.entity.number;
		vm.isNew = modalConfig.isNew;

		vm.select = selectTask;
		
		activate();
		
		
		
		function activate(){
			
			//pre select task from sprint
			var tasksSelected = vm.entity.tasks;
			vm.tasks = taskManager.getAll();
			
			angular.forEach(vm.tasks,function(task){
					angular.forEach(tasksSelected,function(taskSelected){
						if(task.id == taskSelected.id){
							task.isSelected = true;	
						}
					});
			});
		}
		

		function selectTask(task){
			task.isSelected = !task.isSelected;
		}
			
		
		vm.reset = function () {
			vm.entity = angular.copy(modalConfig.entity);
		}

		vm.ok = function () {
			var result = []
			
			angular.forEach(vm.tasks,function(task){
				if(task.isSelected){
					result.push(task);
				}
			});
			$modalInstance.close(result);
		};



		vm.cancel = function () {
			$modalInstance.dismiss('cancel');
		};
	}
})();