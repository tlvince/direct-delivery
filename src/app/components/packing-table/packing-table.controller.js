'use strict';

angular.module('packingTable')
  .controller('PackingTableCtrl', function($state, productStorages, packingTableService, STORAGE_ATTRIBUTES, utility, dailyPacking) {
    this.date = dailyPacking.date;
    this.tabbed = $state.current.data.tabbed;
    this.legends = productStorages;
    this.nextState = $state.current.data.nextState;
    this.packingList = dailyPacking.packingList;
    this.storageAttributes = STORAGE_ATTRIBUTES;
    this.showingCurrent = function() {
      var today = utility.formatDate(new Date(), 'yyyy-MM-dd');
      var currentDate = utility.formatDate(this.date, 'yyyy-MM-dd');
      return currentDate === today;
    };
    this.save = function() {
      packingTableService.save(dailyPacking)
        .then(packingTableService.saved)
        .catch(packingTableService.saveFailed);
    };
  });
