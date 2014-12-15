'use strict';

angular.module('packing.all')
  .config(function($stateProvider) {
    $stateProvider.state('packing.all', {
      url: '/all',
      templateUrl: 'app/packing/all/all.html',
      controller: 'PackingAllCtrl',
      controllerAs: 'packingAllCtrl',
      resolve: {
        packings: function(packingAllService) {
          return packingAllService.all();
        }
      }
    });
  });
