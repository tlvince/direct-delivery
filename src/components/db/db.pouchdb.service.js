'use strict';

/**
 * @name pouchdbService
 *
 */
angular.module('db')
  .service('pouchdbService', function(pouchDB) {

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
        /*eslint-disable camelcase */
        auto_compaction: true
        /*eslint-enable camelcase */
      };

      var db = pouchDB(dbName, options);

      if (!db.adapter) {
        // Fallback to default
        db = pouchDB(dbName, {
          /*eslint-disable camelcase */
          auto_compaction: true
          /*eslint-enable camelcase */
        });
      }

      return db;
    };

    this.remote = function(dbUrl, options){
      return pouchDB(dbUrl, options);
    };

  });
