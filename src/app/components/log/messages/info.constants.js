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
    },
    conflictResolved: {
      title: 'Conflict resolved',
      message: 'A record had been changed both on the server and on your local device since the last sync. This has been automatically resolved.'
    },
    dailyPackingTableRetrieval: {
      title: 'Daily Packing List',
      message: 'Could not retrieve your daily packing list',
      remedy: 'Please check your internet connection and try again'
    }
  });
