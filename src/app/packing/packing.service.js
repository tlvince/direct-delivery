'use strict';

angular.module('packing')
  .service('packingService', function(user, couchdb, couchUtil) {
    this.count = function() {
      var params = {
        ddoc: 'daily-deliveries',
        view: 'by-driver'
      };
      var key = couchUtil.key(user.email);
      angular.extend(params, key);
      return couchdb.view(params).$promise
        .then(couchUtil.pluckValues);
    };
  });
