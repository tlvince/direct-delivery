'use strict';

angular.module('utility.pouchdb')
  .service('pouchUtil', function() {
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
