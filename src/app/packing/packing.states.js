'use strict';

angular.module('packing')
  .config(function($stateProvider) {
    $stateProvider.state('packing', {
      url: '/packing',
      parent: 'index',
      templateUrl: 'app/packing/packing.html',
      controller: 'PackingCtrl',
      controllerAs: 'packingCtrl',
      resolve: {
        count: function(packingService) {
          return packingService.count();
        }
      },
      data: {
        label: 'Packing'
      }
    });
  });
