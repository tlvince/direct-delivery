'use strict';

/**
 * @name pouchdbService
 *
 */
angular.module('db')
  .service('pouchdbService', ['$window', 'pouchDB', function($window, pouchDB){

    var hasWebSQL = function(){
      return $window.openDatabase;
    };

    this.create = function(dbName, opt){
      var options = opt || {};
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

  }]);
