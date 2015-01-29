'use strict';

angular.module('home')
  .config(function($stateProvider) {
    $stateProvider.state('home', {
      url: '/',
      parent: 'index',
      templateUrl: 'app/home/home.html',
      controller: 'HomeCtrl',
      controllerAs: 'homeCtrl'
    })
    .state('home.schedule', {
      url: 'daily-schedule',
      templateUrl: '/app/daily-schedules/daily-schedule.html',
      controller: 'SchedulesDailyCtrl',
      controllerAs: 'schedulesDailyCtrl',
      resolve: {
        dailySchedule: function(log, scheduleService) {
          return scheduleService.getDaySchedule()
            .then(function(response) {
              return response;
            })
            .catch(function(err) {
              log.error('dailyScheduleRetrival', err);
              return [];
            });
        }
      }
    });
  });
