(function () {
	'use strict';



	var app = angular.module('app.sprint');



	//Filter sprint base on thier status
	app.filter('statusFilter',statusFilter);

	statusFilter.$inject = [];
	/* @ngInject */
	function statusFilter() {
		return filter;


		function filter(sprints, statuses) {	
			var out = [];


			var activeTypeId = [];
			angular.forEach(statuses,function(status){
				if(status.isActive){
					activeTypeId.push(status.id);
				}
			});

			//No filter active
			if(activeTypeId.length === 0) {
				return sprints;
			}


			angular.forEach(sprints, function(sprint) {

				if(activeTypeId.indexOf(sprint.status.id)>=0){
					out.push(sprint);
				}
			});
			return out;
		};
	}
})();