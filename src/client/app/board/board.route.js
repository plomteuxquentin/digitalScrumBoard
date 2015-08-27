(function() {
	'use strict';

	angular
		.module('app.board')
		.run(appRun);

	appRun.$inject = ['routerHelper'];
	/* @ngInject */
	function appRun(routerHelper) {
		routerHelper.configureStates(getStates());
	}

	function getStates() {
		return [
			{
				state: 'board',
				config: {
					url: '/board/:boardId',
					templateUrl: 'app/board/board.html',
					controller: 'BoardController',
					controllerAs: 'sprintBoard',
					title: 'Board',
					resolve: {
						sprint: getSprint,
						members : getMembers,
					}
				}
			}
		];
		
		
		getSprint.$inject = ['$stateParams','sprintManager'];
		/* @ngInject */
		function getSprint($stateParams,sprintManager){
			return sprintManager.get($stateParams.boardId);
		}
		
		getMembers.$inject = ['memberManager'];
		/* @ngInject */
		function getMembers(memberManager){
			return memberManager.getAll();
		}
	}
})();
