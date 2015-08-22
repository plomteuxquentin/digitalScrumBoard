(function () {
	'use strict';

	angular
		.module('app.task')
		.controller('TasksController', TasksController);

	TasksController.$inject = ['taskManager', 'logger', '$modal', 'Task'];
	/* @ngInject */
	function TasksController(taskManager, logger, $modal, Task) {
		var vm = this;


		vm.title = 'Product backlog';

		activate();

		function activate() {
			//TODO: MOVE INTO STATE
			logger.info('Loading tasks');
			vm.tasks = taskManager.getAll();
			console.log(vm.tasks);
			logger.info('Activated tasks View');
		}

		vm.upsertModal = upsertModal;


		//Configure and open upsert modal
		function upsertModal(task) {

			var template = {
				animation: true,
				templateUrl: 'app/task/modal/upsert.html',
				controller: 'upsertTaskModalController',
				controllerAs:'vm',
				size: 'md',
			}

			var config = {};

			if (task) {
				config = {
					entity : task,
					modalTitle : 'Quick Edition task n° '+task.numero,
					isNew : false,
				};
			} else {
				config = {
					entity : new Task(),
					modalTitle : 'Create Task',
					isNew : true,
				};
			}


			template.resolve = {
				modalConfig: function () {
					return config;
				}
			};	

			var modalInstance = $modal.open(template);
			modalInstance.result.then(accept, refuse);

			function accept(modalResult){
				if(modalResult.operation == 'UPSERT'){ upsertTask(modalResult.entity);} 
				else if(modalResult.operation == 'DELETE'){ deleteTask(modalResult.entity);}
				else { console.error('Unknow Operation')}
			}

			function refuse(){
				console.log('modal dismissed')
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
