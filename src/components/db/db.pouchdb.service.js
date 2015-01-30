'use strict';

/**
 * @name pouchdbService
 *
 */
angular.module('db')
  .service('pouchdbService', function($window, pouchDB){

    var hasWebSQL = function(){
      return $window.openDatabase;
    };

    /**
     * we set default adapter to 'websql' because of the following:
     * 1. it is fast and
     * 2. the target device  "explore rangerx" supports websql by default.
     *
     * @param dbName
     * @returns {*}
     */
    this.create = function(dbName, opt){
      var options = opt || { auto_compaction: true };
      if(hasWebSQL()){
        options.adapter = 'websql';
      }else{
        options.adapter = 'idb';
      }
      return new pouchDB(dbName, options);
    };

    this.remote = function(dbUrl, options){
      return new pouchDB(dbUrl, options)
    };

  });
