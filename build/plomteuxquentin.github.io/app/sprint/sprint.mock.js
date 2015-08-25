(function () {
	'use strict';

	angular
		.module('app.sprint')
		.run(mock);

	mock.$inject = ['sprintManager','MOCK_UP_MODE','STATUSES','PRIORITIES','STATES','TYPES', 'SPRINT_DURATIONS'];
	/* @ngInject */
	function mock(manager,MOCK_UP_MODE,STATUSES,PRIORITIES,STATES,TYPES, DURATIONS) {		
		if(MOCK_UP_MODE){
			var tasks = [
				{id:'1',title:'Study dragons',content:'get to know about dragon and how to use them',estimation:7,numero:1,priority:{level:PRIORITIES.LOW,point:3},state:STATES.DONE,type:TYPES.KNOWLEDGE_ACQUISITION},
				{id:'2',title:'Build siege engine',content:'build siege engine to destroy fortification',estimation:10,numero:2,priority:{level:PRIORITIES.MEDIUM,point:5},state:STATES.PENDING,type:TYPES.FEATURE},
				{id:'3',title:'Gather food',content:'gather food to feed army',estimation:5,numero:3,priority:{level:PRIORITIES.HIGH,point:8},state:STATES.IN_PROGRESS,type:TYPES.TECHNICAL_WORK},
				{id:'4',title:'Conquere new land',content:'Send army to invade westeros',estimation:15,numero:4,priority:{level:PRIORITIES.HIGH,point:3},state:STATES.PENDING,type:TYPES.FEATURE},
				{id:'5',title:'Find Spies',content:'Expose spies within our rank',estimation:5,numero:5,priority:{level:PRIORITIES.EXTREME,point:0},state:STATES.PENDING,type:TYPES.BUG},
				{id:'6',title:'Find Spies',content:'Expose spies within our rank',estimation:5,numero:5,priority:{level:PRIORITIES.EXTREME,point:0},state:STATES.PENDING,type:TYPES.BUG},
				{id:'7',title:'Find Spies',content:'Expose spies within our rank',estimation:5,numero:5,priority:{level:PRIORITIES.EXTREME,point:0},state:STATES.PENDING,type:TYPES.BUG},
				{id:'8',title:'Find Spies',content:'Expose spies within our rank',estimation:5,numero:5,priority:{level:PRIORITIES.EXTREME,point:0},state:STATES.PENDING,type:TYPES.BUG},
				{id:'9',title:'Find Spies',content:'Expose spies within our rank',estimation:5,numero:5,priority:{level:PRIORITIES.EXTREME,point:0},state:STATES.PENDING,type:TYPES.BUG},
				{id:'10',title:'Find Spies',content:'Expose spies within our rank',estimation:5,numero:5,priority:{level:PRIORITIES.EXTREME,point:0},state:STATES.PENDING,type:TYPES.BUG},
				{id:'11',title:'Find Spies',content:'Expose spies within our rank',estimation:5,numero:5,priority:{level:PRIORITIES.EXTREME,point:0},state:STATES.PENDING,type:TYPES.BUG},
				{id:'12',title:'Find Spies',content:'Expose spies within our rank',estimation:5,numero:5,priority:{level:PRIORITIES.EXTREME,point:0},state:STATES.PENDING,type:TYPES.BUG},
				{id:'13',title:'Find Spies',content:'Expose spies within our rank',estimation:5,numero:5,priority:{level:PRIORITIES.EXTREME,point:0},state:STATES.PENDING,type:TYPES.BUG},
			]
			var mocks = [
				{id:'1',numero:'1', title:'Invade Westeros', goal:'Seize control of the Iron throne', status:STATUSES.PLANNED,tasks:[tasks[3]],duration:DURATIONS.ONE_WEEK},
				{id:'2',numero:'2', title:'Build up army', goal:'Create an army to conquere Westeros', status:STATUSES.STARTED,tasks:[tasks[12],tasks[11],tasks[10],tasks[9],tasks[8],tasks[7],tasks[6],tasks[1],tasks[2],tasks[4]],duration:DURATIONS.ONE_MONTH},
				{id:'3',numero:'3', title:'Free meeren', goal:'Free slaves and take controle of the city', status:STATUSES.FINISH,tasks:[tasks[0]],duration:DURATIONS.TWO_WEEKS}
			];

			angular.forEach(mocks,function(value){
				manager.upsert(value);
			});
		}
	}
})();