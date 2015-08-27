(function() {
	'use strict';

	angular
		.module('app.task')
		.run(appRun);

	appRun.$inject = ['routerHelper'];
	/* @ngInject */
	function appRun(routerHelper) {
		routerHelper.configureStates(getStates());
	}

	function getStates() {
		return [
			{
				state: 'tasks',
				config: {
					url: '/tasks',
					templateUrl: 'app/task/tasks.html',
					controller: 'TasksController',
					controllerAs: 'vm',
					title: 'Product Backlog',
					settings: {
						nav: 2,
						content: '<i class="fa fa-cubes"></i> Product Backlog'
					},
					resolve:{
						tasks:loadTasks
					}
				}
			},
			{
				state: 'task',
				config: {
					url: '/tasks/:taskId',
					templateUrl: 'app/task/task.html',
					controller: 'TaskController',
					controllerAs: 'vm',
					resolve: {
						task:loadTask
					}
				}
			}
		];
		
		
		loadTasks.$inject = ['$q','taskManager','logger'];
		/* @ngInject */
		function loadTasks($q,taskManager,logger){
			logger.info('Loading Tasks');
			//should be return  manager.loadAll

			var deferred = $q.defer();
			deferred.resolve(taskManager.getAll());
			return deferred.promise;
		}
		
		loadTask.$inject = ['$stateParams','taskManager','logger'];
		/* @ngInject */
		function loadTask($stateParams,taskManager,logger){
			logger.info('Loading Task');
			//if creating a new task
			if($stateParams.taskId === null || $stateParams.taskId.length == 0){						
				return taskManager.getNew();
			}
			return taskManager.get($stateParams.taskId);
		}
	}
})();
