'use strict';
angular.module('packingServiceMock', [])
  .constant('user', {
    email: ''
  })
  .service('couchdb', function($q) {
    var mockPackingList = {
      rows: [
        {
          id: 'packeduuid',
          key: 'driver@example.com',
          value: {
            packed: true
          }
        },
        {
          id: 'unpackeduuid',
          key: 'driver@example.com',
          value: {}
        }
      ]
    };

    this.view = function() {
      var deferred = $q.defer();
      deferred.resolve(mockPackingList);
      return {
        $promise: deferred.promise
      };
    };
  });
