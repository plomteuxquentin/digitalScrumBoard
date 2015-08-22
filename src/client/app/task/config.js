(function () {
	'use strict';

	var mod = angular.module('app.task');





	


	

	var STATES  = {
	PENDING:{id:0,title:'pending'},
		IN_PROGRESS:{id:1,title:'in progress'},
		DONE:{id:2,title:'done'},
	} //PENDING,IN PROGRESS,DONE

	var TYPES = {
		FEATURE:{id:0,title:'feature',logo:'fa fa-cube'},
		BUG:{id:1,title:'bug',logo:'fa fa-bug'},
		TECHNICAL_WORK:{id:2,title:'technical work',logo:'fa fa-wrench'},
		KNOWLEDGE_ACQUISITION:{id:3,title:'knowledge acquisition',logo:'fa fa-graduation-cap'},
		
	}; //Features,Bug,Technical work, Knowledge acquisition

	var PRIORITIES = {
		LOW:{id:0,title:'low',color:'#ffffff'},
		MEDIUM:{id:1,title:'medium',color:'#31b1f7'},
		HIGH:{id:2,title:'high',color:'#FF9D00'},
		EXTREME:{id:3,title:'extreme',color:'#eb4136'}
	} //LOW,MEDIUM, HIGH, EXTREME
	
	
	
	

	mod.constant('STATES', STATES);
	mod.constant('TYPES', TYPES);
	mod.constant('PRIORITIES', PRIORITIES);


	mod.run(configure);

	configure.$inject = ['taskManager'];
	/* @ngInject */
	function configure(taskManager) {
		
		var mocks = [
			{title:'Study dragons',content:'get to know about dragon and how to use them',estimation:7,numero:1,priority:{level:PRIORITIES.LOW,point:3},state:STATES.DONE,type:TYPES.KNOWLEDGE_ACQUISITION},
			{title:'Build siege engine',content:'build siege engine to destroy fortification',estimation:10,numero:2,priority:{level:PRIORITIES.MEDIUM,point:5},state:STATES.PENDING,type:TYPES.FEATURE},
			{title:'Gather food',content:'gather food to feed army',estimation:5,numero:3,priority:{level:PRIORITIES.HIGH,point:8},state:STATES.IN_PROGRESS,type:TYPES.TECHNICAL_WORK},
			{title:'Conquere new land',content:'Send army to invade westeros',estimation:15,numero:4,priority:{level:PRIORITIES.HIGH,point:3},state:STATES.PENDING,type:TYPES.FEATURE},
			{title:'Find Spies',content:'Expose spies within our rank',estimation:5,numero:5,priority:{level:PRIORITIES.EXTREME,point:0},state:STATES.PENDING,type:TYPES.BUG},
		]

		angular.forEach(mocks,function(value){
			taskManager.upsert(value);
		});
	}

})();
