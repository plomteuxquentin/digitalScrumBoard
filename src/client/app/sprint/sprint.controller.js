(function () {
	'use strict';

	angular
		.module('app.sprint')
		.controller('SprintController', SprintController);

	SprintController.$inject = ['$filter','sprintManager', 'logger', '$state', '$stateParams', 'Sprint', 'STATUSES', 'SPRINT_DURATIONS', '$scope'];
	/* @ngInject */
	function SprintController($filter,sprintManager, logger ,$state, $stateParams, Sprint, STATUSES, SPRINT_DURATIONS, $scope) {
		var vm = this;

		var _sprint = null;
		vm.STATUSES = [];
		vm.DURATIONS = [];

		



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
					console.log("hi");
					_sprint = sprint;
					vm.sprint = angular.copy(_sprintk);
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
			vm.formEdit.$cancel();
			if(vm.isNew){
				$state.go('sprints');
			}
		};

		function upsertSprint(sprint){
			var actionTitle = (sprint.id) ? 'Sprint update' : 'Sprint add';

			sprintManager.upsert(sprint).then(onSuccess, onFailure);

			function onSuccess(){
				logger.success('Sprint n° '+sprint.numero,sprint,actionTitle);
				vm.isNew=false;
				vm.formEdit.$cancel();
			}

			function onFailure(reason){
				logger.error('Sprint n° '+sprint.numero,reason,actionTitle+' fail');
			}
		}

	}
})();
