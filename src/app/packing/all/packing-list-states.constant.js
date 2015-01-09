'use strict';

angular.module('packing.all')
  .constant('PACKING_LIST_STATES', [
    {
      key: 'unpacked',
      label: 'Current'
    },
    {
      key: 'packed',
      label: 'History'
    }
  ]);
