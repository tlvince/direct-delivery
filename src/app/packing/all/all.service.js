'use strict';

angular.module('packing.all')
  .service('packingAllService', function(user, pouchUtil, dbService) {
    this.all = function() {
      var params = pouchUtil.key(user.email);
      params.reduce = false;
      return dbService.getView('daily-deliveries/by-driver', params)
        .then(pouchUtil.pluckValues);
    };
  });
