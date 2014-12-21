'use strict';

angular.module('packing.item')
  .controller('PackingItemCtrl', function(dailyDelivery, packingItemService) {
    this.packingList = dailyDelivery.packingList;
    packingItemService.attachStorage(dailyDelivery.packingList);
    this.save = function() {
      packingItemService.save(dailyDelivery)
        .then(packingItemService.saved)
        .catch(packingItemService.saveFailed);
    };
  });
