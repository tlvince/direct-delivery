'use strict';

angular.module('packing.all')
  .controller('PackingAllCtrl', function(packings, PACKING_LIST_STATES) {
    this.packings = packings;
    this.packingListStates = PACKING_LIST_STATES;
  });
