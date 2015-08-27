(function () {
	'use strict';

	angular
		.module('app.task')
		.factory('Task',taskEntity);

	taskEntity.$inject = [];

	/* @ngInject */
	function taskEntity() {


		function Task(data) {

			this.id = null;
			this.title = '';
			this.numero = 0;
			this.state = {}; //PENDING,IN PROGRESS,DONE
			this.type = {}; //Features,Bug,Technical work, Knowledge acquisition
			this.content = '';
			this.estimation = 0;
			this.comments = [];
			this.priority = {level:{}, point:0} //LOW,MEDIUM, HIGH, EXTREM
			this.assignToSprint = undefined; //id of sprint where the tasks is assign

			if (data) {
				this.setData(data);
			}
			// Some other initializations related to book
		};

		Task.prototype ={
			setData : setData,
			getPriority : getPriority,
			isAssignedToSprint : isAssignedToSprint,
			isAssignedToSprintId : isAssignedToSprintId
		}


		return Task;

		function setData(data) {	
			angular.extend(this,data);
		}
		
		function getPriority(){
			return this.priority.level.point + this.priority.point;	
		}
		
		function isAssignedToSprint(){
			return this.assignToSprint !== undefined ;
		}
		
		function isAssignedToSprintId(sprintId){
			if(sprintId == null) { 
				return false;
			}
			return this.assignToSprint == sprintId ;
		}
	}
}());