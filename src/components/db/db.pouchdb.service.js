'use strict';

/**
 * @name pouchdbService
 *
 */
angular.module('db')
  .service('pouchdbService', ['$window', 'pouchDB', function($window, pouchDB){

    this.create = function(dbName){
      var db = pouchDB(dbName, { adapter: 'websql'});
      if (!db.adapter) {
        // Fallback to default
        db = pouchDB(dbName);
      }
      return db;
    };

    this.remote = function(dbUrl, options){
      return new pouchDB(dbUrl, options)
    };

  }]);
