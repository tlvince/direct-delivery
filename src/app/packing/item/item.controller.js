'use strict';

angular.module('packing.item')
  .controller('PackingItemCtrl', function($stateParams, packingLists, packingItemService) {
    this.name = $stateParams.id;
    this.packingLists = packingLists;
    this.isComplete = packingItemService.isComplete;
  });
