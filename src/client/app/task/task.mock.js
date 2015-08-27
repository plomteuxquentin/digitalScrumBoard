(function () {
	'use strict';

	angular
		.module('app.task')
		.run(mock);

	mock.$inject = ['taskManager','MOCK_UP_MODE','PRIORITIES','STATES','TYPES'];
	/* @ngInject */
	function mock(manager,MOCK_UP_MODE,PRIORITIES,STATES,TYPES) {

		if(MOCK_UP_MODE){
			
			var mocks = [
				{id:1,title:'Study dragons',content:'get to know about dragon and how to use them',estimation:7,numero:1,priority:{level:PRIORITIES.LOW,point:3},state:STATES.DONE,type:TYPES.KNOWLEDGE_ACQUISITION},
				{id:2,title:'Build siege engine',content:'build siege engine to destroy fortification',estimation:10,numero:2,priority:{level:PRIORITIES.MEDIUM,point:5},state:STATES.PENDING,type:TYPES.FEATURE},
				{id:3,title:'Gather food',content:'gather food to feed army',estimation:5,numero:3,priority:{level:PRIORITIES.HIGH,point:8},state:STATES.IN_PROGRESS,type:TYPES.TECHNICAL_WORK},
				{id:4,title:'Conquere new land',content:'Send army to invade westeros',estimation:15,numero:4,priority:{level:PRIORITIES.HIGH,point:3},state:STATES.PENDING,type:TYPES.FEATURE},
				{id:5,title:'Find Spies',content:'Find spies within our rank',estimation:5,numero:5,priority:{level:PRIORITIES.EXTREME,point:0},state:STATES.PENDING,type:TYPES.BUG},
				{id:6,title:'TODO',content:'TODO',estimation:7,numero:6,priority:{level:PRIORITIES.EXTREME,point:0},state:STATES.PENDING,type:TYPES.FEATURE},
				{id:7,title:'TODO',content:'TODO',estimation:13,numero:7,priority:{level:PRIORITIES.HIGH,point:0},state:STATES.IN_PROGRESS,type:TYPES.KNOWLEDGE_ACQUISITION},
				{id:8,title:'TODO',content:'TODO',estimation:18,numero:8,priority:{level:PRIORITIES.EXTREME,point:0},state:STATES.PENDING,type:TYPES.TECHNICAL_WORK},
				{id:9,title:'TODO',content:'TODO',estimation:3,numero:9,priority:{level:PRIORITIES.MEDIUM,point:0},state:STATES.PENDING,type:TYPES.FEATURE},
				{id:10,title:'TODO',content:'TODO',estimation:2,numero:10,priority:{level:PRIORITIES.MEDIUM,point:0},state:STATES.PENDING,type:TYPES.FEATURE},
				{id:11,title:'TODO',content:'TODO',estimation:5,numero:11,priority:{level:PRIORITIES.LOW,point:0},state:STATES.PENDING,type:TYPES.BUG},
				{id:12,title:'TODO',content:'TODO',estimation:2,numero:12,priority:{level:PRIORITIES.LOW,point:0},state:STATES.DONE,type:TYPES.BUG},
				{id:13,title:'TODO',content:'TODO',estimation:8,numero:13,priority:{level:PRIORITIES.HIGH,point:0},state:STATES.IN_PROGRESS,type:TYPES.BUG},
			]
			
			angular.forEach(mocks,function(value){
				manager.upsert(value);
			});
		}
	}

})();