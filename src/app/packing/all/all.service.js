'use strict';

angular.module('packing.all')
  .service('packingAllService', function(AuthService, pouchUtil, dbService) {
    this.all = function() {
      var params = pouchUtil.key(AuthService.currentUser.name);
      return dbService.getView('packing/by-driver', params)
        .then(pouchUtil.pluckValues);
    };
  });
