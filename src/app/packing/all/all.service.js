'use strict';

angular.module('packing.all')
  .service('packingAllService', function(AuthService, pouchUtil, dbService) {
    this.all = function() {
      var params = pouchUtil.key(AuthService.currentUser.name);
      params.reduce = false;
      return dbService.getView('daily-deliveries/by-driver', params)
        .then(pouchUtil.pluckValues);
    };
  });
