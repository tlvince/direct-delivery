'use strict';

angular.module('auth')
  .config(function(pouchDBProvider, POUCHDB_METHODS) {
    var loginMethods = {
      login: 'qify',
      logout: 'qify',
      getUser: 'qify'
    };

    pouchDBProvider.methods = angular.extend({}, POUCHDB_METHODS, loginMethods);
  });
