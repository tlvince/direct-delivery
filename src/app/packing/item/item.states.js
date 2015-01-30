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
        dailySchedule: function($stateParams, packingTableService) {
          return packingTableService.get($stateParams.id);
        },
        productStorages: function(packingTableLegendService) {
          return packingTableLegendService.get();
        }
      },
      data: {
        nextState: 'packing.all'
      }
    })
    .state('packing.item.table', {
      url: '',
      templateUrl: 'components/packing-table/packing-table.html'
    });
  });
