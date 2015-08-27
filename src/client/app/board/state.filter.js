(function () {
	'use strict';



	var app = angular.module('app.board');



	app.filter('stateFilter',stateFilter);

	stateFilter.$inject = [];
	/* @ngInject */
	function stateFilter() {
		return filter;


		function filter(tasks, state) {	
			var out = [];


			angular.forEach(tasks, function(task) {
				if(task.state.id === state.id){
						out.push(task);
				}
			});
			return out;
		}
	}
})();