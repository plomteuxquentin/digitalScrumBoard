(function () {
	'use strict';

	angular
		.module('app.sprint')
		.factory('sprintManager',sprintManager);

	sprintManager.$inject = ['$http','$q','Sprint','Task','taskManager'];


	/* @ngInject */
	function sprintManager($http,$q,Entity,Task,taskManager) {


		var _entity = {
			name:'sprint',
			baseUrl:'server/sprints/'
		};


		var service = {
			_entity: _entity,
			_pool: {},
			_retrieveInstance: _retrieveInstance,
			_search: _search,
			_load: _load,
			_remove: _remove,
			_create: _create,
			_update: _update,
			_addTasks: _addTasks,
			_removeTasks: _removeTasks,
			/* Update tasks attribut and update each task in taskManager*/
			_updateTasks: _updateTasks,
			/* Public Methods */
			/* Use this function in order to get an Entity instance by it's id */
			get:getEntity,
			getAll:getEntities,
			/* Use this function in order to get instances of all the entities */
			loadAll: loadAllEntities,
			/*  This function is useful when we got somehow the book data and we wish to store it or update the pool and get a book instance in return */
			upsert: upsertEntity,
			/*	Remove Entity*/
			remove: removeEntity,
			getNew: function(){ return new Entity()}
		};

		return service;
		//////////////////////////////


		//////////// PRIVATE //////////////


		//Add registered Entity to the pool
		//@return the entity
		function _retrieveInstance(id,data) {
			var instance = this._pool[id];

			if (instance) {
				instance.setData(data);
			} else {
				instance = new Entity(data);
				this._pool[data.id] = instance;
			}

			return instance;
		}

		//search the pool
		//@return the entity or undefined
		function _search (id) {
			return this._pool[id];
		}

		//load Entity from server and add it to the pool (or update if already present)
		//@return promise with loaded Entity
		function _load(id, deferred) {
			var scope = this;

			//$http.get(scope._entity.baseURI + id).then(onSuccess,onFailure);

			onFailure("No server available");

			function onSuccess(data){
				var entity = scope._retrieveInstance(data.id,data);
				deferred.resolve(entity);
			}

			function onFailure(reason){
				console.error('unable to load '+scope._entity.name+' from '+scope._entity.baseUrl+id);
				deferred.reject(reason);
			}

		}


		//delete entity from server and remove it from pool.
		//@return promise with the deleted Entity
		function _remove(id,deferred){
			var scope = this;

			//$http.delete(scope.entity.baseURI + id).then(onSuccess,onFailure);

			onSuccess();

			function onSuccess(){
				var entity = scope._pool[id];
				if(entity){
					delete scope._pool[id];
				}
				deferred.resolve(entity);
			}

			function onFailure(reason){
				console.error('unable to delete '+scope._entity.name+' from '+scope._entity.baseUrl+id);
				deferred.reject(reason);
			}
		}

		//post entity to server and add it to the pool
		//@return promise with the create Entity
		function _create(data,deferred){
			var scope = this;

			//$http.post(scope.entity.baseURI,data).then(onSuccess,onFailure);

			onSuccess(data);

			function onSuccess(reponse){
				reponse.id = Date.now()+Math.floor(Math.random()*1000);
				var entity = scope._retrieveInstance(reponse.id,reponse);
				deferred.resolve(entity);
			}

			function onFailure(reason){
				console.error('unable to create member');
				deferred.reject(reason);
			}
		}

		//put entity to server and update/add it to the pool
		//@return promise with the updated Entity
		function _update(data,deferred){
			var scope = this;

			//$http.put(scope.entity.baseURI+data.id,data).then(onSuccess,onFailure);

			onSuccess(data)

			function onSuccess(reponse){
				var entity = scope._retrieveInstance(reponse.id,reponse);
				deferred.resolve(entity);
			}

			function onFailure(reason){
				console.error('unable to update '+scope._entity.name+' from '+scope._entity.baseUrl+id);
				deferred.reject(reason);
			}

		}

		//Update task with new sprint ID
		function _addTasks(id,idsToAdd){
			var deferred = $q.defer();

			var promises = idsToAdd.map(function(taskID){
				var task = {id : taskID, assignToSprint : id};
				return taskManager.upsert(task);
			});
			
			$q.all(promises).then(deferred.resolve,deferred.reject);
			
			return deferred;
		}
		
		function _removeTasks(id,idsToRemove){
			var deferred = $q.defer();

			var promises = idsToRemove.map(function(taskID){
				var task = {id : taskID, assignToSprint : undefined};
				return taskManager.upsert(task);
			});
			
			$q.all(promises).then(deferred.resolve,deferred.reject);
			
			return deferred;
		}
		
		function _updateTasks(sprint,newTasks,deferred){
			//!\ Change reference to task into reference to task ID
			
			
			var idsToRemove = [];
			var idsToAdd = [];
			
			var scope = this;

			var newTaskId = newTasks.map(function(task){
				return task.id;
			});
			
			var oldTaskId = sprint.tasks.map(function(task){
				return task.id;
			});

			//Remove task that are no longer selected
			angular.forEach(oldTaskId, function(taskId){
				/*task id is not in tasksArrayId_NEW*/
				if(newTaskId.indexOf(taskId)<0){
					idsToRemove.push(taskId);
				}
			});

			//Add task that are not in sprint
			angular.forEach(newTaskId,function(taskId){
				/*task id is not is sprint.tasks*/
				if(oldTaskId.indexOf(taskId)<0){
					idsToAdd.push(taskId)
				}
			});

			var addPromise = this._addTasks(sprint.id,idsToAdd);
			var removePromise = this._removeTasks(sprint.id,idsToRemove);

			$q.all([addPromise,removePromise]).then(onTaskUpdateSuccess,onTaskUpdateFailure);

			//If task are update => update sprint
			function onTaskUpdateSuccess(reponse){
				//var message = reponse[0]+' tasks added and '+reponse[1]+' task remove';
				scope._update({id:sprint.id,tasks:newTasks},deferred)
			}

			function onTaskUpdateFailure(reason){
				//var message = reponse[0]+' tasks added and '+reponse[1]+' task remove';
				console.error(reason);
				deferred.reject(reason);
			}
		}

		//////////// PUBLIC //////////////

		function getEntities() {
			var entities = [];
			angular.forEach(this._pool,function (entity) {
				entities.push(entity);
			});
			return entities;
		}

		function getEntity(id) {
			var deferred = $q.defer();
			var entity = this._search(id);
			if (entity) {
				deferred.resolve(entity);
			} else {
				this._load(id, deferred);
			}
			return deferred.promise;
		}

		function loadAllEntities() {
			var deferred = $q.defer();
			var scope = this;

			$http.get(entity.baseUrl).then(onSuccess,onFailure);

			return deferred.promise;

			function onSuccess(entitiesArray) {
				var entities = [];
				entitiesArray.forEach(function (data) {
					var entity = scope._retrieveInstance(data.id, data);
					entities.push(entity);
				});

				deferred.resolve(entities);
			}

			function onFailure(reason){
				console.log(scope);

				console.error('unable to load entities '+scope._entity.name);
				deferred.reject(reason);
			}

		}

		function upsertEntity(data) {					
			var scope = this;
			var midDeferred = $q.defer();
			var deferred = $q.defer();


			//Do the tasks update after
			var tasks = [];
			

			if(data.tasks){
				var tasksTMP = data.tasks;
				delete data.tasks;
				
				tasks = tasksTMP.map(function(task){
					var newTask = new Task();
					newTask.setData(task);
					return newTask;
				});
				
				midDeferred.promise.then(addUpdatedTasks);
			}
					
			if(!data.id){
				scope._create(data, midDeferred);
			}else {
				scope._update(data, midDeferred);
			}
			
			return deferred.promise;
			
			//Update tasks now
			function addUpdatedTasks(sprint){
				scope._updateTasks(sprint,tasks,deferred);
			}
		}

		function removeEntity(data, deferred) {
			var deferred = $q.defer();
			var entity = this._search(data.id);
			if (entity) {
				this._remove(entity.id, deferred);
			} else {
				deferred.reject(entity.name+' id:'+id+' not found.');
			}
			return deferred.promise;

		}
	}
}());