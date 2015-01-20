'use strict';

angular.module('packing.item')
  .config(function($stateProvider) {
    $stateProvider.state('packing.item', {
      abstract: true,
      url: '/:id',
      templateUrl: 'app/packing/item/layout.html'
    })
    .state('packing.item.table', {
      url: '',
      views: {
        table: {
          templateUrl: 'app/packing/item/item.html',
          controller: 'PackingItemCtrl',
          controllerAs: 'packingItemCtrl',
          resolve: {
            dailyDelivery: function($stateParams, packingItemService) {
              return packingItemService.get($stateParams.id);
            }
          }
        },
        legend: {
          templateUrl: 'app/packing/item/legend.html',
          controller: 'PackingItemLegendCtrl',
          controllerAs: 'packingItemLegendCtrl',
          resolve: {
            productStorages: function(packingItemLegendService) {
              return packingItemLegendService.get();
            }
          }
        }
      }
    });
  });
