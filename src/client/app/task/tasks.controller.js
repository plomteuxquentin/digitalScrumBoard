(function () {
	'use strict';

	angular
		.module('app.task')
		.controller('TasksController', TasksController);

	TasksController.$inject = ['taskManager', 'logger', '$modal', 'TYPES','tasks'];
	/* @ngInject */
	function TasksController(taskManager, logger, $modal, TYPES, tasks) {
		var vm = this;


		vm.title = 'Product backlog';
		vm.TYPES = TYPES;
		
		vm.quickTaskEdit = quickTaskEdit;

		activate();

		
		function activate() {
			vm.tasks = angular.copy(tasks);
			logger.info('Activated tasks View');
		}



		//Configure and open upsert modal
		function quickTaskEdit(task) {

			var config = {};
			var template = {
				animation: true,
				templateUrl: 'app/task/modal/quickTaskEdit.html',
				controller: 'QuickTaskEditController',
				controllerAs:'vm',
				size: 'md',
				resolve:{
					modalConfig: function () {
						return config;
					}
				}
			};

			
			if (task) {
				config = {
					entity : task,
					modalTitle : 'Quick edition task n° '+task.numero,
					isNew : false,
					okTitle: 'Update',
				};
			} else {
				config = {
					entity : taskManager.getNew(),
					modalTitle : 'Create Task',
					isNew : true,
					okTitle: 'Create',
				};
			}

			var modalInstance = $modal.open(template);
			modalInstance.result.then(accept, refuse);

			function accept(modalResult){
				if(modalResult.operation === 'UPDATE'){ upsertTask(modalResult.entity);} 
				else if(modalResult.operation === 'DELETE'){ deleteTask(modalResult.entity);}
				else { console.error('Unknow Operation');}
			}

			function refuse(){
				console.log('modal dismissed');
			}
		}

		function upsertTask(task){
			var actionTitle = (task.id) ? 'Task update' : 'Task add';
			
			taskManager.upsert(task).then(onSuccess, onFailure);
			
			function onSuccess(){
				vm.tasks= taskManager.getAll();

				logger.success('Task n° '+task.numero,task,actionTitle);
			}
		
			function onFailure(reason){
				logger.error('Task n° '+task.numero,reason,actionTitle+' fail');
			}
		}

		function deleteTask(task){
			taskManager.remove(task).then(onSuccess,onFailure);
			
			function onSuccess(){
				vm.tasks= taskManager.getAll();

				logger.success('Task n° '+task.numero,task,'Task delete');
			}

			function onFailure(reason){
				logger.error('Task n° '+task.numero,reason,'Task delete fail');
			}
			
		}
	}
})();
