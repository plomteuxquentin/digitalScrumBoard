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
						nav: 5,
						content: '<i class="fa fa-calendar"></i> Planning'
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
				}
			}
		];
	}
})();
