'use strict';

angular.module('packingTableCtrlMock', [])
  .constant('dailySchedule', {
    date: '2014',
    packingList: []
  })
  .constant('productStorages', {})
  .constant('log', {})
  .constant('user', {})
  .constant('$state', {
    current: {
      data: {
        tabbed: true,
        nextState: 'home'
      }
    }
  })
  .constant('productStorages', {});
