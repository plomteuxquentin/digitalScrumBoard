(function () {
	'use strict';

	var mod = angular.module('app.task');

	var STATES  = {
		PENDING:{id:0,title:'pending',logo:'fa fa-inbox'},
		IN_PROGRESS:{id:1,title:'in progress',logo:'fa fa-refresh'},
		DONE:{id:2,title:'done',logo:'fa fa-check'},
	} //PENDING,IN PROGRESS,DONE

	var TYPES = {
		FEATURE:{id:0,title:'feature',logo:'fa fa-puzzle-piece'},
		BUG:{id:1,title:'bug',logo:'fa fa-bug'},
		TECHNICAL_WORK:{id:2,title:'technical work',logo:'fa fa-wrench'},
		KNOWLEDGE_ACQUISITION:{id:3,title:'knowledge acquisition',logo:'fa fa-graduation-cap'},
		
	}; //Features,Bug,Technical work, Knowledge acquisition

	var PRIORITIES = {
		LOW:{id:0,title:'low',color:'#ffffff',point:0},
		MEDIUM:{id:1,title:'medium',color:'#5EF2A8',point:100},
		HIGH:{id:2,title:'high',color:'#FF9D00',point:1000},
		EXTREME:{id:3,title:'extreme',color:'#eb4136',point:10000}
	} //LOW,MEDIUM, HIGH, EXTREME
	
	mod.constant('STATES', STATES);
	mod.constant('TYPES', TYPES);
	mod.constant('PRIORITIES', PRIORITIES);
})();
