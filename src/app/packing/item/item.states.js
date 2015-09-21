'use strict';

angular.module('packing.item')
  .config(function($stateProvider) {
    $stateProvider.state('packing.item', {
      url: '/:id',
      abstract: true,
      templateUrl: 'app/packing/item/item.html',
      controller: 'PackingTableCtrl',
      controllerAs: 'packingTableCtrl',
      resolve: {
        productStorages: function(packingTableLegendService) {
          return packingTableLegendService.get();
        },
        dailyPacking: function ($stateParams, packingTableService) {
          return packingTableService.get($stateParams.id);
        }
      },
      data: {
        nextState: 'packing.all'
      }
    })
    .state('packing.item.table', {
      url: '',
      templateUrl: 'app/components/packing-table/packing-table.html'
    });
  });
