(function () {
	'use strict';

	angular
		.module('app.sprint')
		.controller('SprintController', SprintController);

	SprintController.$inject = ['$filter','sprintManager', 'logger', '$state', 'STATUSES', 'SPRINT_DURATIONS', '$scope', '$modal', 'taskManager','sprint','tasks'];
	/* @ngInject */
	function SprintController($filter,sprintManager, logger ,$state, STATUSES, SPRINT_DURATIONS, $scope,$modal,taskManager,sprint,tasks) {
		var vm = this;

		var tasksAvailable = [];
		vm.STATUSES = [];
		vm.DURATIONS = [];

		vm.selectTaskModal = selectTaskModal;


		activate(sprint);



		function activate(sprintToDisplay) {
			vm.sprint = angular.copy(sprint);
			tasksAvailable = angular.copy(tasks); 	
		
			if(sprintToDisplay.id === null){
				vm.isNew = true;
				vm.okTitle = 'Create';
				$scope.$on('$viewContentLoaded', function(event) {
					vm.formEdit.$show();
				});

			}//if user create a sprint
			else{
				vm.isNew = false;
				vm.okTitle = 'Update';
				vm.title = 'Sprint : '+vm.sprint.title;
			}//if user edit a sprint
			
			
			//TODO: MOVE INTO STATE

			angular.forEach(SPRINT_DURATIONS, function(duration){
				vm.DURATIONS.push(duration);
			});

			angular.forEach(STATUSES, function(status){
				vm.STATUSES.push(status);
			});
			
			
			logger.info('Activated Sprint View');
		}


		vm.ok = function () {			
			upsertSprint(vm.sprint);
		};

		vm.cancel = function () {
			vm.formEdit.$cancel();
			if(vm.isNew){
				$state.go('sprints');
			}
		};

	
		//Open a op up for user to select/unselect task
		function selectTaskModal(){
			
			
			var tasksToDisplay = angular.copy(tasks);

			/*
			var task =taskManager.getAll()
			//Display only available tasks (free and the one the sprint have)
			angular.forEach(tasks,function(task){
				if(!task.isAssignedToSprint()){
					tasksToDisplay.push(task);
				}
				if (task.isAssignedToSprintId(vm.sprint.id)){
					tasksToDisplay.push(task);
				}
			});*/
								
			//Mark task as selected
			angular.forEach(tasksToDisplay,function(task){
				for(var i = 0 ; i < vm.sprint.tasks.length; i++){
					if(task.id === vm.sprint.tasks[i].id){
						task.isSelected = true;
					}
				}	
			});
			
			var config = {
				entity : angular.copy(vm.sprint),
				title : 'Select task for '+vm.sprint.title,
				modalAction : 'Update',
				actionTitle : 'Sprint updated',
				tasks : tasksToDisplay,
			};
			
			var modalTemplate = {
				animation: true,
				templateUrl: 'app/sprint/modal/selectTasks.html',
				controller: 'sprintSelectModalController',
				controllerAs:'vm',
				size: 'lg',
				resolve:{
					modalConfig: function () { return config;}
				}
			};
	

			var modalInstance = $modal.open(modalTemplate);
			modalInstance.result.then(accept, refuse);

			function accept(tasksSelected){
				vm.sprint.tasks =  tasksSelected;
			}

			function refuse(){
				console.log('modal dismissed');
			}
		}
		
		function upsertSprint(sprintToUpsert){			
			var actionTitle = (sprintToUpsert.id) ? 'Sprint update' : 'Sprint add';
			
			sprintManager.upsert(sprintToUpsert).then(onSuccess, onFailure);

			function onSuccess(sprintUpdated){	
				logger.success('Sprint n° '+sprint.numero,sprint,actionTitle);
				activate(sprintUpdated);
			}

			function onFailure(reason){
				logger.error('Sprint n° '+sprint.numero,reason,actionTitle+' fail');
			}
		}
	}
})();
