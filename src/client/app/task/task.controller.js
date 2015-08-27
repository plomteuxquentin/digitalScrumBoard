(function () {
	'use strict';

	angular
		.module('app.task')
		.controller('TaskController', TaskController);

	TaskController.$inject = ['$filter','taskManager', 'logger', '$state', 'TYPES', 'PRIORITIES', 'STATES','$scope','task'];
	/* @ngInject */
	function TaskController($filter,taskManager, logger ,$state, TYPES, PRIORITIES, STATES,$scope,task) {
		var vm = this;

		vm.TYPES = [];
		vm.PRIORITIES = [];
		vm.STATES = [];
		

		activate(task);


		function activate(taskToDisplay) {

			vm.task = angular.copy(taskToDisplay);

			if(taskToDisplay.id === null){
				vm.isNew = true;
				vm.okTitle = 'Create';
				//Trigger edition mode
				$scope.$on('$viewContentLoaded', function(event) {
					vm.taskEdit.$show();
				});
			}//if user create a task
			else{
				vm.isNew = false;
				vm.okTitle = 'Update';
				vm.title = 'Task : '+vm.task.title;
			}//if user edit a task

			//TODO MOVE INTO RESOLVER
			angular.forEach(TYPES, function(type){
				vm.TYPES.push(type);
			});
			//TODO MOVE INTO RESOLVER
			angular.forEach(PRIORITIES, function(priority){
				vm.PRIORITIES.push(priority);
			});
			//TODO MOVE INTO RESOLVER
			angular.forEach(STATES, function(state){
				vm.STATES.push(state);
			});
			
			logger.info('Activated task View');
		}

		
		vm.ok = function () {
			upsertTask(vm.task);
		};

		vm.cancel = function () {
			vm.taskEdit.$cancel();
			if(vm.isNew){
				$state.go('tasks');
			}
		};
		
		function upsertTask(taskToUpsert){
			var actionTitle = (taskToUpsert.id) ? 'Task update' : 'Task add';
			
			taskManager.upsert(taskToUpsert).then(onSuccess, onFailure);

			function onSuccess(taskUpdated){
				logger.success('Task n° '+taskUpdated.numero,taskUpdated,actionTitle);
				activate(taskUpdated);
			}

			function onFailure(reason){
				logger.error('Task n° '+task.numero,reason,actionTitle+' fail');
			}
		}

	}
})();
