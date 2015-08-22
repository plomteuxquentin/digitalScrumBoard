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
					}
				}
			}
		];
	}
})();
