'use strict';

angular.module('packing')
  .controller('PackingCtrl', function(count) {
    this.count = count[0] || 0;
  });
