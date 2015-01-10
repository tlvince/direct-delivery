'use strict';

angular.module('packing.item')
  .config(function($stateProvider) {
    $stateProvider.state('packing.item', {
      url: '/:id',
      templateUrl: 'app/packing/item/item.html',
      controller: 'PackingItemCtrl',
      controllerAs: 'packingItemCtrl',
      resolve: {
        dailyDelivery: function($stateParams, packingItemService) {
          return packingItemService.get($stateParams.id);
        }
      }
    });
  });
