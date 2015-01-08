'use strict';

angular.module('couchdb')
  .factory('couchdb', function($resource, config) {
    var paramDefaults = {
      docID: '@_id'
    };
    return $resource(config.db + '/:docID', paramDefaults, {
      view: {
        method: 'GET',
        url: config.db + '/_design/:ddoc/_view/:view'
      },
      update: {
        method: 'PUT'
      }
    });
  });
