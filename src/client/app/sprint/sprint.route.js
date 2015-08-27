(function() {
	'use strict';

	angular
		.module('app.sprint')
		.run(appRun);

	appRun.$inject = ['routerHelper'];
	/* @ngInject */
	function appRun(routerHelper) {
		routerHelper.configureStates(getStates());
	}

	function getStates() {
		return [
			{
				state: 'sprints',
				config: {
					url: '/sprints',
					templateUrl: 'app/sprint/sprints.html',
					controller: 'SprintsController',
					controllerAs: 'vm',
					title: 'Planning',
					settings: {
						nav: 3,
						content: '<i class="fa fa-calendar"></i> Planning'
					},
					resolve: {
						statusesArray : getStatusesArray,
						sprints :  loadSprints,
					}
				}
			},
			{
				state: 'sprint',
				config: {
					url: '/sprints/:sprintId',
					templateUrl: 'app/sprint/sprint.html',
					controller: 'SprintController',
					controllerAs: 'vm',
					resolve:{
						sprint :loadSprint,
						tasks :getTaskAvailable,
					}
				}
			}
		];
		
		
		

		loadSprints.$inject = ['$q','sprintManager','logger'];
		/* @ngInject */
		function loadSprints($q,sprintManager,logger){
			logger.info('Loading Sprint');
			//should be return  manager.loadAll

			var deferred = $q.defer();
			deferred.resolve(sprintManager.getAll());
			return deferred.promise;
		}

		loadSprint.$inject = ['$q','$stateParams','sprintManager','logger'];
		/* @ngInject */
		function loadSprint($q,$stateParams,sprintManager,logger){
			logger.info('Loading Sprint');
			//if creating a new sprint
			if($stateParams.sprintId === null || $stateParams.length == 0){				
				return sprintManager.getNew();
			}
			return sprintManager.get($stateParams.sprintId);
		}
		
	
		getTaskAvailable.$inject = ['$q','sprint','taskManager'];
		/* @ngInject */
		function getTaskAvailable($q,sprint,taskManager){
			
			var tasksToDisplay = [];
			
			//Should be loadAll
			var deferred = $q.defer();
			var tasks = taskManager.getAll();

			//Display only available tasks (free and the one the sprint have)
			angular.forEach(tasks,function(task){
				if (task.isAvailableForSprintId(sprint.id)){
					tasksToDisplay.push(task);
				}
			});
			
			deferred.resolve(tasksToDisplay);
			
			return deferred.promise;

		
		
		
		}
		
		
		getStatusesArray.$inject = ['STATUSES'];
		/* @ngInject */
		function getStatusesArray(STATUSES){
			var statuses = [];
			angular.forEach(STATUSES,function(status){
				statuses.push(status);	
			});
			
			return angular.copy(statuses);
		}
		
		
	}
})();
