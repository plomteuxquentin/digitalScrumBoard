(function () {
	'use strict';

	var mod = angular.module('app.sprint');

	var oneWeekTime = 1000*60*60*24*7;

	var SPRINT_DURATIONS = {
		ONE_WEEK: {id:'0',title:'one week',time:oneWeekTime},
		TWO_WEEKS: {id:'1',title:'two weeks',time:oneWeekTime*2 },
		TRHEE_WEEKS: {id:'2',title:'three weeks',time:oneWeekTime*3},
		ONE_MONTH: {id:'3',title:'one month',time:oneWeekTime*4},
	};
	
	var STATUSES_ERROR = {
		START : 'Sprint must be planned to start',
		FINISH : 'Sprint must be started to finish',
	};

	var STATUSES = {
		PLANNED: {id: 0, title: 'planned', logo:'fa fa-pencil-square-o', color:'#FF9D00'},
		STARTED: {id: 1, title: 'started', logo:'fa fa-history', color:'#5EF2A8'},
		FINISH: {id: 2, title: 'finish', logo:'fa fa-check', color:'#ffffff'}
	}; //PLANNED,STARTED,FINISHED

	mod.constant('STATUSES', STATUSES);
	mod.constant('STATUSES_ERROR', STATUSES_ERROR);
	mod.constant('SPRINT_DURATIONS',SPRINT_DURATIONS);
})();