'use strict';

angular.module('packing.all')
  .config(function($stateProvider) {
    $stateProvider.state('packing.all', {
      url: '',
      resolve: {
        packings: function(packingAllService) {
          return packingAllService.all();
        }
      },
      templateUrl: 'app/packing/all/all.html',
      controller: 'PackingAllCtrl',
      controllerAs: 'packingAllCtrl'
    });
  });
