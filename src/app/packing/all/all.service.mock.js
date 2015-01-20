'use strict';
angular.module('packingAllServiceMock', [])
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
            id: 'packeduuid',
            packed: true,
            date: '2015-01-20'
          }
        },
        {
          id: 'unpackeduuid',
          key: 'driver@example.com',
          value: {
            id: 'unpackeduuid',
            date: '2015-01-20'
          }
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
