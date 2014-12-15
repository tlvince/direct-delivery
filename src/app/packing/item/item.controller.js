'use strict';

angular.module('packing.item')
  .controller('PackingItemCtrl', function($stateParams, packingLists) {
    this.name = $stateParams.id;
    this.packingLists = packingLists;
  });
