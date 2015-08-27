(function () {
	'use strict';

	angular
		.module('app.sprint')
		.factory('Sprint',sprintEntity);

	sprintEntity.$inject = ['STATUSES','STATUSES_ERROR',];

	/* @ngInject */
	function sprintEntity(STATUSES,STATUSES_ERROR,SPRINT_DURATION) {

		

		function Sprint(data) {
			
			

			this.id = null;
			this.title = '';
			this.number = 0;
			this.goal = '';
			this.status = STATUSES.PLANNED;
			this.duration = null;
			this.tasks = [];
			this.comments = [];
			
			this.dates = {
				creation : new Date(),
				plannedStart : new Date(),
				started : undefined,
				plannedFinish : undefined,
				finish: undefined
			};

			if (data) {
				this.setData(data);
			}
		}

		Sprint.prototype ={
			setData : setData,
			getPoints: getPoints,
			start: start,
			finish: finish,
			isPlanned: isPlanned,
			isStarted: isStarted,
			isFinish: isFinish,
			setPlannedStart: setPlannedStart,
			getPlannedFinish: getPlannedFinish
		};


		return Sprint;

		function setData(data) {
			angular.extend(this,data);
		}		
		
		//return total point of this sprint
		function getPoints(){
			var total = 0;
			
			angular.forEach(this.tasks, function(task){
				total += task.estimation;
			});
			return total;
		}
		
		//start sprint
		function start(){
			if(!isPlanned){
				throw STATUSES_ERROR.START;
			}
			
			this.status = this.statuses.STARTED;
			
			this.dates.started =  Date.now();
		}
		
		//finish sprint
		function finish(){
			if(!isStarted){
				throw STATUSES_ERROR.FINISH;
			}
			this.status = this.statuses.STARTED;

			this.dates.finish =  Date.now();
		}
		
		function isPlanned(){
			return this.status.id == STATUSES.PLANNED.id;
		}
		
		function isStarted(){
			return this.status.id == STATUSES.STARTED.id;
		}
		
		function isFinish(){
			return this.status.id == STATUSES.FINISH.id;
		}
		
		function setPlannedStart(date){
			if(!isPlanned){
				throw STATUSES_ERROR.START;
			}
			this.dates.plannedStart(date);
			this.dates.plannedFinish = this.getPlannedFinish();
		}
		
		//return planned finish date base on started date and duration
		function getPlannedFinish(){
			if(!isStarted){
				throw STATUSES_ERROR.FINISH;
			}
			if(!this.duration){
				console.error("No duration provide");
				return null;
			}
			
			var startDate = (isStarted) ? this.dates.started : this.dates.plannedStart; 
			this.dates.plannedFinish = startDate + duration.time;
		}
	}
}());