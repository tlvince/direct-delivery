'use strict';

/**
 * @name pouchdbService
 *
 */
angular.module('db')
  .service('pouchdbService', function($window, pouchDB){

    /**
     * we set default adapter to 'websql' because of the following:
     * 1. it is fast and
     * 2. the target device  "explore rangerx" supports websql by default.
     *
     * @param dbName
     * @returns {*}
     */
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

  });
