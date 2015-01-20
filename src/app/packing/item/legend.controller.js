'use strict';

angular.module('packing.item')
  .controller('PackingItemLegendCtrl', function(productStorages) {
    this.legends = productStorages;
  });
