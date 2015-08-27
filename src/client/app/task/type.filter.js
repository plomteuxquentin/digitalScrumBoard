(function () {
	'use strict';



	var app = angular.module('app.task');


	//Filter tasks based on thier type
	app.filter('typeFilter',typeFilter);

	typeFilter.$inject = [];
	/* @ngInject */
	function typeFilter() {
		return filter;


		function filter(tasks, types) {	
			var out = [];


			var activeTypeId = [];
			angular.forEach(types,function(type){
				if(type.isActive){
					activeTypeId.push(type.id);
				}
			});
			
			//No filter active
			if(activeTypeId.length === 0){
				return tasks;
			}

			
			angular.forEach(tasks, function(task) {

				if(activeTypeId.indexOf(task.type.id)>=0){
					out.push(task);
				}
			});
			return out;
		}
	}
})();