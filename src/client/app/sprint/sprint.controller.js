(function () {
	'use strict';

	angular
		.module('app.sprint')
		.controller('SprintController', SprintController);

	SprintController.$inject = ['$filter','sprintManager', 'logger', '$state', '$stateParams', 'Sprint', 'STATUSES', 'SPRINT_DURATIONS', '$scope', '$modal', 'taskManager'];
	/* @ngInject */
	function SprintController($filter,sprintManager, logger ,$state, $stateParams, Sprint, STATUSES, SPRINT_DURATIONS, $scope,$modal,taskManager) {
		var vm = this;

		var _sprint = null;
		vm.STATUSES = [];
		vm.DURATIONS = [];

		vm.selectTaskModal = selectTaskModal;

		var tasks = taskManager.getAll();

		activate($stateParams.sprintId);



		function activate(sprintId) {
			//TODO: MOVE INTO STATE
			logger.info('Loading sprint');

			angular.forEach(SPRINT_DURATIONS, function(duration){
				vm.DURATIONS.push(duration);
			});

			angular.forEach(STATUSES, function(status){
				vm.STATUSES.push(status);
			});
			
			
			if(!sprintId || sprintId.length == 0){
				vm.isNew = true;
				vm.okTitle = 'Create';
				_sprint = new Sprint();
				vm.sprint = angular.copy(_sprint);
				$scope.$on('$viewContentLoaded', function(event) {
					vm.formEdit.$show();
				});

			}//if user create a sprint
			else{
				sprintManager.get(sprintId).then(found,notFound);
				vm.isNew = false;
				vm.okTitle = 'Update';


				function found(sprint){
					_sprint = sprint;
					vm.sprint = angular.copy(_sprint);
					vm.title = "Sprint : "+vm.sprint.title;
					logger.info('Activated Sprint View');
				}

				function notFound(reason){
					logger.error('Sprint not found')
					$state.go('404');
				}
			}//if user edit a sprint
		}


		vm.ok = function () {			
			upsertSprint(vm.sprint);
		};

		vm.cancel = function () {
			vm.sprint =  _sprint;
			vm.formEdit.$cancel();
			if(vm.isNew){
				$state.go('sprints');
			}
		};

	
		//Open a op up for user to select/unselect task
		function selectTaskModal(){
			
			var tasksToDisplay = [];

			//Display only available tasks (free and the one the sprint have)
			angular.forEach(tasks,function(task){
				if(!task.isAssignedToSprint()){
					tasksToDisplay.push(task);
				}
				if (task.isAssignedToSprintId(vm.sprint.id)){
					tasksToDisplay.push(task);
				}
			});
								
			//Mark task as selected
			angular.forEach(tasksToDisplay,function(task){
				for(var i = 0 ; i < vm.sprint.tasks.length; i++){
					if(task.id == vm.sprint.tasks[i].id){
						task.isSelected = true;
					}
				};	
			});
			
			var config = {
				entity : angular.copy(_sprint),
				title : 'Select task for '+vm.sprint.title,
				modalAction : 'Update',
				actionTitle : 'Sprint updated',
				isNew : true,
				tasks : angular.copy(tasksToDisplay),
				
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
		
		function upsertSprint(sprint){			
			var actionTitle = (sprint.id) ? 'Sprint update' : 'Sprint add';

			//!\ TODO HANDLE TASKS UPDATE

			
			sprintManager.upsert(sprint).then(onSuccess, onFailure);

			function onSuccess(sprintUpdated){	
				logger.success('Sprint n° '+sprint.numero,sprint,actionTitle);
				activate(sprintUpdated.id);
			}

			function onFailure(reason){
				logger.error('Sprint n° '+sprint.numero,reason,actionTitle+' fail');
			}
		}
	}
})();
