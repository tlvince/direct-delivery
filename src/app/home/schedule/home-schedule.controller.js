'use strict';

angular.module('home.schedule')
  .controller('HomeScheduleCtrl', function(dailySchedule) {
    this.day = dailySchedule;
  });
