'use strict';

angular.module('packing.item')
  .controller('PackingItemCtrl', function(packings, dailyDelivery, packingItemService, STORAGE_ATTRIBUTES) {
    function updatePackingsTally(saveResponse) {
      packingItemService.updatePackingsTally(packings, saveResponse);
    }
    this.packingList = dailyDelivery.packingList;
    this.storageAttributes = STORAGE_ATTRIBUTES;
    this.save = function() {
      packingItemService.save(dailyDelivery)
        .then(updatePackingsTally)
        .then(packingItemService.saved)
        .catch(packingItemService.saveFailed);
    };
  });
