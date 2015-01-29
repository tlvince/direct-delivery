'use strict';

angular.module('packingTable')
  .controller('PackingTableCtrl', function(dailyDelivery, productStorages, packingTableService, STORAGE_ATTRIBUTES) {
    this.date = dailyDelivery.date;
    this.legends = productStorages;
    this.packingList = dailyDelivery.packingList;
    this.storageAttributes = STORAGE_ATTRIBUTES;
    this.save = function() {
      packingTableService.save(dailyDelivery)
        .then(packingTableService.saved)
        .catch(packingTableService.saveFailed);
    };
  });
