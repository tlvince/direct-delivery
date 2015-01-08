'use strict';

angular.module('packing.item')
  .controller('PackingItemCtrl', function(dailyDelivery, packingItemService, STORAGE_ATTRIBUTES) {
    this.packingList = dailyDelivery.packingList;
    this.storageAttributes = STORAGE_ATTRIBUTES;
    this.save = function() {
      packingItemService.save(dailyDelivery)
        .then(packingItemService.saved)
        .catch(packingItemService.saveFailed);
    };
  });
