'use strict';

angular.module('log')
  .constant('INFO_MESSAGES', {
    dailyScheduleRetrival: {
      title: 'Daily schedule',
      message: 'Daily schedule does not exist'
    },
    dailyDeliverySaved: {
      title: 'Daily delivery saved',
      message: 'Daily delivery saved so you won\'t lose changes'
    }
  });
