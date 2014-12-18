'use strict';

angular.module('packingServiceMock', [])
  .service('couchdb', function($q) {
    this.view = function() {
      var response = {
        rows: [
          {
            key: null,
            value: 1
          }
        ]
      };
      return {
        $promise: $q.when(response)
      };
    };
  });
