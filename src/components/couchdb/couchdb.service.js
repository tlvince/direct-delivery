'use strict';

angular.module('couchdb')
  .factory('couchdb', function($resource, config) {
    return $resource(config.db, {}, {
      view: {
        method: 'GET',
        url: config.db + '/_design/:ddoc/_view/:view'
      }
    });
  });
