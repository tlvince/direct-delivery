'use strict';

angular.module('packing.all')
  .controller('PackingAllCtrl', function(packings) {
    this.packings = packings;
  });
