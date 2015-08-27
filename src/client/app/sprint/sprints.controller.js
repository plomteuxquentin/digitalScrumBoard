(function () {
	'use strict';

	angular
		.module('app.sprint')
		.controller('SprintsController', SprintsController);

	SprintsController.$inject = ['$state', 'sprintManager','taskManager', 'logger', '$modal', 'Task','STATUSES'];
	/* @ngInject */
	function SprintsController($state, sprintManager, taskManager, logger, $modal, Task, STATUSES) {
		
		var vm = this;

		vm.title = 'Sprints Planning';
		
		vm.STATUSES = [];
		angular.forEach(STATUSES,function(status){
			vm.STATUSES.push(status);	
		});
		
		vm.goToDetails = goToDetails;
		vm.goToBoard = goToBoard;

		activate();


		function activate() {
			//TODO: MOVE INTO STATE
			logger.info('Loading sprints');
			vm.sprints = sprintManager.getAll();
			console.log(vm.sprints);
			logger.info('Activated sprints View');
		}



		//!\ UNUSES
		//Configure and open upsert modal
		function startStopModal(sprint) {

			var template = {
				animation: true,
				templateUrl: 'app/sprint/modal/startStop.html',
				controller: 'startStopModalController',
				controllerAs:'vm',
				size: 'sm',
			}

			var config = {};

			config = {
				entity: sprint,
				modalTitle: 'Quick edition sprint n° ' + sprint.number,
				isNew: false,
			};


			template.resolve = {
				modalConfig: function () {
					return config;
				}
			};	

			var modalInstance = $modal.open(template);
			modalInstance.result.then(accept, refuse);

			function accept(modalResult){
				if(modalResult.operation == 'UPSERT'){ upsertSprint(modalResult.entity);} 
				else if(modalResult.operation == 'DELETE'){ deleteSprint(modalResult.entity);}
				else { console.error('Unknow Operation')}
			}

			function refuse(){
				console.log('modal dismissed')
			}
		}
		
		function goToDetails(entity){
			$state.go('sprint',{sprintId:entity.id});
		}	
		
		function goToBoard(entity){
			$state.go('board',{boardId:entity.id});
		}

		function upsertSprint(sprint){
			var actionTitle = (sprint.id) ? 'Sprint update' : 'Sprint add';

			sprintManager.upsert(sprint).then(onSuccess, onFailure);

			function onSuccess(){
				vm.sprints= sprintManager.getAll();

				logger.success('Sprint n° '+sprint.numero,sprint,actionTitle);
			}

			function onFailure(reason){
				logger.error('Sprint n° '+sprint.numero,reason,actionTitle+' fail');
			}
		}

		function deleteSprint(sprint){
			sprintManager.remove(sprint).then(onSuccess,onFailure);

			function onSuccess(){
				vm.sprints= sprintManager.getAll();

				logger.success('Sprint n° '+sprint.numero,sprint,'Sprint delete');
			}

			function onFailure(reason){
				logger.error('Task n° '+sprint.numero,reason,'Sprint delete fail');
			}

		}
	}
})();
