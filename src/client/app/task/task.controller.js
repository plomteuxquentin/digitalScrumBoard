(function () {
	'use strict';

	angular
		.module('app.task')
		.controller('TaskController', TaskController);

	TaskController.$inject = ['$filter','taskManager', 'logger', '$state', '$stateParams', 'Task', 'TYPES', 'PRIORITIES', 'STATES','$scope'];
	/* @ngInject */
	function TaskController($filter,taskManager, logger ,$state, $stateParams, Task, TYPES, PRIORITIES, STATES,$scope) {
		var vm = this;

		var _task = null;
		vm.TYPES = [];
		vm.PRIORITIES = [];
		vm.STATES = [];
		


		
		
		activate($stateParams.taskId);



		function activate(taskId) {
			//TODO: MOVE INTO STATE
			logger.info('Loading task');

			if(taskId === null || taskId.length == 0){
				vm.isNew = true;
				vm.okTitle = 'Create';
				_task = new Task();
				vm.task = angular.copy(_task);
				console.log(vm.task);
				$scope.$on('$viewContentLoaded', function(event) {
					vm.taskEdit.$show();
				});
				
			}//if user create a task
			else{
				taskManager.get(taskId).then(found,notFound);
				vm.isNew = false;
				vm.okTitle = 'Update';
			}//if user edit a task

			angular.forEach(TYPES, function(type){
				vm.TYPES.push(type);
			});
			
			angular.forEach(PRIORITIES, function(priority){
				vm.PRIORITIES.push(priority);
			});

			angular.forEach(STATES, function(state){
				vm.STATES.push(state);
			});
			
			function found(task){
				_task = task;
				vm.task = angular.copy(_task);
				vm.title = "Task : "+vm.task.title;
				console.log(vm.task);
				logger.info('Activated task View');
			}
			
			function notFound(reason){
				logger.error('Task not found')
				$state.go('404');
			}
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
		
		function upsertTask(task){
			var actionTitle = (task.id) ? 'Task update' : 'Task add';
			
			taskManager.upsert(task).then(onSuccess, onFailure);

			function onSuccess(){
				logger.success('Task n° '+task.numero,task,actionTitle);
				vm.isNew=false;
				vm.taskEdit.$cancel();
			}

			function onFailure(reason){
				logger.error('Task n° '+task.numero,reason,actionTitle+' fail');
			}
		}

	}
})();
