(function () {
	'use strict';

	angular
		.module('app.board')
		.controller('BoardController', BoardController);

	BoardController.$inject = ['$modal', 'logger', 'STATES', 'memberManager','sprint','members'];
	/* @ngInject */
	function BoardController($modal, logger, STATES, memberManager,sprint,members) {

		var sprintBoard = this;
		sprintBoard.STATES = [];
		sprintBoard.members = [];
		sprintBoard.sprint = {};
		//$scope.sprintBoard = BoardService.sprintBoard(BoardDataFactory.sprint);
		sprintBoard.sprintSortOptions = {
			accept: function (sourceItemHandleScope, destSortableScope) {console.log("accept");return true},//override to determine drag is allowed or not. default is true.
			itemMoved: function (event) {
				console.log(event.dest);
				//console.log(event.source.itemScope.task);
			//	console.log('moved');
			},
			orderChanged: function(event) {},
			containment: '#board'//optional param.
		};
		
		

		
		sprintBoard.assignNewTask = assignNewTaskModal;
		
		activate();



		function activate() {
			logger.info('Loading board');
			
			//Move into resolve
			for(var stateName in STATES){
				sprintBoard.STATES.push(STATES[stateName]);
			}
			
			sprintBoard.members = angular.copy(members);
			sprintBoard.sprint = angular.copy(sprint);
			
			sprintBoard.members[0].tasks = [sprintBoard.sprint.tasks[0]];

			
			
			logger.info('Activated board View');
		}
		
		function assignNewTaskModal(member){

			var config = {
				title : 'Assign task to '+member.getFullName(),
				modalAction : 'Assign',
				actionTitle : 'Task assigned to '+member.getFullName(),
				tasks : sprintBoard.sprint.tasks,
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
				console.error('TODO');
				member.tasks = tasksSelected;
				console.log(member.tasks);
			}

			function refuse(){
				console.log('modal dismissed');
			}
		}
		
		
		
		
		
		
		
	
	}
})();
