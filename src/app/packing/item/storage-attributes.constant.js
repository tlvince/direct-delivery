'use strict';

angular.module('packing.item')
  .constant('STORAGE_ATTRIBUTES', {
    'product-storage/dry': {
      bsClass: 'active'
    },
    'product-storage/frozen': {
      bsClass: 'info'
    },
    'product-storage/refrigerator': {
      bsClass: 'success'
    }
  });
