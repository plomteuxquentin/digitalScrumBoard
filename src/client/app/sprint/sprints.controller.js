(function () {
	'use strict';

	angular
		.module('app.sprint')
		.controller('SprintsController', SprintsController);

	SprintsController.$inject = ['$state', 'logger', '$modal','statusesArray','sprints'];
	/* @ngInject */
	function SprintsController($state, logger, $modal, statusesArray,sprints) {
		
		var vm = this;

		vm.title = 'Sprints Planning';
		vm.STATUSES = statusesArray;

		
		vm.goToDetails = goToDetails;
		vm.goToBoard = goToBoard;

		activate(sprints);


		function activate(sprintsToBind) {
			vm.sprints = sprintsToBind;
			logger.info('Activated sprints View');
		}

		
		function goToDetails(entity){
			$state.go('sprint',{sprintId:entity.id});
		}	
		
		function goToBoard(entity){
			$state.go('board',{boardId:entity.id});
		}

	}
})();
