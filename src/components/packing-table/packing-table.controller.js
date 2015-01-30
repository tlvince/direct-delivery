'use strict';

angular.module('packingTable')
  .controller('PackingTableCtrl', function($state, dailySchedule, productStorages, packingTableService, STORAGE_ATTRIBUTES) {
    this.date = dailySchedule.date;
    this.tabbed = $state.current.data.tabbed;
    this.legends = productStorages;
    this.nextState = $state.current.data.nextState;
    this.packingList = dailySchedule.packingList;
    this.storageAttributes = STORAGE_ATTRIBUTES;
    this.save = function() {
      packingTableService.save(dailySchedule)
        .then(packingTableService.saved)
        .catch(packingTableService.saveFailed);
    };
  });
