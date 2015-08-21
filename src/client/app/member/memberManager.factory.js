(function () {
	'use strict';

	angular
		.module('app.member')
		.factory('memberManager',memberManager);

	memberManager.$inject = ['$http','$q','Member'];

	
	/* @ngInject */
	function memberManager($http,$q,Member) {

		
		var entity = {
			name:'member',
			baseUrl:'server/members/'
		};
		
		
		var service = {
			_entity:entity,
			_pool: {},
			_retrieveInstance: retrieveInstance,
			_search: search,
			_load: load,
			_delete: deleteFunction,
			_create: create,
			_update: update,
			/* Public Methods */
			/* Use this function in order to get an Entity instance by it's id */
			getMember:getEntity,
			getMembers:getEntities,
			/* Use this function in order to get instances of all the entities */
			loadAllMembers: loadAllEntities,
			/*  This function is useful when we got somehow the book data and we wish to store it or update the pool and get a book instance in return */
			setMember: upsertEntity,
			/*	Remove Entity*/
			deleteMember: deleteEntity,
		};
				
		return service;
		//////////////////////////////
		
		
		//////////// PRIVATE //////////////
		
		
		//Add registered Entity to the pool
		//@return the entity
		function retrieveInstance(id,data) {
			var instance = this._pool[id];

			if (instance) {
				instance.setData(data);
			} else {
				instance = new Member(data);
				this._pool[data.id] = instance;
			}

			return instance;
		}
		
		//search the pool
		//@return the entity or undefined
		function search (id) {
			return this._pool[id];
		}
		
		//load Entity from server and add it to the pool (or update if already present)
		//@return promise with loaded Entity
		function load(id, deferred) {
			var scope = this;

			$http.get(scope.entity.baseURI + id).then(onSuccess,onFailure);

			
			
			function onSuccess(data){
				var entity = scope._retrieveInstance(data.id,data);
				deferred.resolve(entity);
			}
			
			function onFailure(reason){
				console.error('unable to load member with id:'+id);
				deferred.reject(reason);
			}
			
		}
		
		
		//delete entity from server and remove it from pool.
		//@return promise with the deleted Entity
		function deleteFunction(id,deferred){
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
				console.error('unable to delete '+scope.entity.name+' id:'+id);
				deferred.reject(reason);
			}
		}
		
		//post entity to server and add it to the pool
		//@return promise with the create Entity
		function create(data,deferred){
			var scope = this;

			//$http.post(scope.entity.baseURI,data).then(onSuccess,onFailure);

			data.id = Date.now();
			onSuccess(data);
			
			function onSuccess(reponse){
				console.log(reponse);
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
		function update(data,deferred){
			var scope = this;

			//$http.put(scope.entity.baseURI+data.id,data).then(onSuccess,onFailure);

			onSuccess(data)
			
			function onSuccess(reponse){
				var entity = scope._retrieveInstance(reponse.id,reponse);
				deferred.resolve(entity);
			}

			function onFailure(reason){
				console.error('unable to update member id:'+data.id);
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
				
				console.error('unable to load '+scope._entity.name);
				deferred.reject(reason);
			}

		}
		
		function upsertEntity(data) {					
			var scope = this;
			var deferred = $q.defer();
			
			if(data.id === null){
				this._create(data,deferred)
			}else {
				this._update(data,deferred)
			}
			
			return deferred.promise;

		}
		
		function deleteEntity(data, deferred) {
			var deferred = $q.defer();
			var entity = this._search(data.id);
			if (entity) {
				this._delete(entity.id, deferred);
			} else {
				deferred.reject(entity.name+' id:'+id+' not found.');
			}
			return deferred.promise;

		}
		
	}
}());