'use strict';

angular.module('db')
  .config(function(POUCHDB_METHODS) {
    // Register jo/pouch-resolve-conflicts with angular-pouchdb
    POUCHDB_METHODS.resolveConflicts = 'qify';
  });
