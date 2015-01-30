'use strict';

angular.module('home')
  .constant('HOME_TABS', [
    {
      heading: 'Schedule',
      route: 'home.schedule'
    },
    {
      heading: 'Packing',
      route: 'home.packing'
    }
  ]);
