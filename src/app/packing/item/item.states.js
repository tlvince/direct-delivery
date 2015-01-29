'use strict';

angular.module('packing.item')
  .config(function($stateProvider) {
    $stateProvider.state('packing.item', {
      url: '/:id',
      templateUrl: 'components/packing-table/packing-table.html',
      controller: 'PackingTableCtrl',
      controllerAs: 'packingTableCtrl',
      resolve: {
        dailyDelivery: function($stateParams, packingTableService) {
          return packingTableService.get($stateParams.id);
        },
        productStorages: function(packingTableLegendService) {
          return packingTableLegendService.get();
        }
      }
    });
  });
