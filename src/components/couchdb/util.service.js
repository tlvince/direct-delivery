'use strict';

angular.module('couchdb')
  .service('couchUtil', function() {
    function pluck(response, property) {
      function get(row) {
        return row[property];
      }
      return response.rows.map(get);
    }

    this.key = function(key) {
      return {
        startkey: key,
        endkey: key + '\ufff0'
      };
    };

    this.join = function(key) {
      return {
        startkey: JSON.stringify([key]),
        endkey: JSON.stringify([key, 2])
      };
    };

    this.pluckIDs = function(response) {
      return pluck(response, 'id');
    };

    this.pluckValues = function(response) {
      return pluck(response, 'value');
    };

    this.pluckDocs = function(response) {
      return pluck(response, 'doc');
    };
  });
