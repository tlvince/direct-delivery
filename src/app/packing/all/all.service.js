'use strict';

angular.module('packing.all')
  .service('packingAllService', function(user, couchdb, couchUtil) {
    this.all = function() {
      var params = {
        ddoc: 'daily-deliveries',
        view: 'by-driver',
        reduce: false
      };
      var key = couchUtil.key(user.email);
      angular.extend(params, key);
      return couchdb.view(params).$promise
        .then(couchUtil.pluckValues);
    };
  });
