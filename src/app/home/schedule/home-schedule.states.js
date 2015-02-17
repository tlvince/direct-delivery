'use strict';

angular.module('home.schedule')
  .config(function($stateProvider) {
    $stateProvider.state('home.schedule', {
      url: 'daily-schedule',
      templateUrl: 'app/home/schedule/home-schedule.html',
      controller: 'HomeScheduleCtrl',
      controllerAs: 'homeScheduleCtrl',
      resolve: {
        dailySchedule: function(log, scheduleService) {
          function errorHandler(error) {
            log.info('dailyScheduleRetrival', error);
            return {};
          }
          return scheduleService.getDaySchedule()
            .catch(errorHandler);
        }
      }
    });
  });
