'use strict';

/**
 * @name pouchdbService
 *
 */
angular.module('db')
  .service('pouchdbService', ['$window', 'pouchDB', function($window, pouchDB){

    this.create = function(dbName){
      var options = {
        adapter: 'websql',
        auto_compaction: true
      };
      var db = pouchDB(dbName, options);
      if (!db.adapter) {
        // Fallback to default
        db = pouchDB(dbName, { auto_compaction: true });
      }
      return db;
    };

    this.remote = function(dbUrl, options){
      return new pouchDB(dbUrl, options)
    };

  }]);
