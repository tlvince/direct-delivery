'use strict';

angular.module('packing.all')
  .service('packingAllService', function(user, couchUtil, dbService) {
    this.all = function() {
      var params = couchUtil.key(user.email);
      params.reduce = false;
      return dbService.getView('daily-deliveries/by-driver', params)
        .then(couchUtil.pluckValues);
    };
  });
