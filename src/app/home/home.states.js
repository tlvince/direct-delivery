'use strict';

angular.module('home')
  .config(function ($stateProvider) {
    $stateProvider.state('home', {
      url: '/',
      parent: 'index',
      resolve: {
        dailySchedule: function (scheduleService) {
          return scheduleService.getDaySchedule()
            .then(function (response) {
              return response;
            })
            .catch(function () {
              return [];
            });
        }
      },
      views: {
        '': {
          controller: 'HomeCtrl',
          controllerAs: 'homeCtrl',
          templateUrl: 'app/home/home.html',
          data: {
            label: 'Home'
          }
        },
        'daySchedule@home': {
          url: '/daily-schedule',
          templateUrl: '/app/daily-schedules/daily-schedule.html',
          controller: 'SchedulesDailyCtrl',
          controllerAs: 'schedulesDailyCtrl'
        }
      }
    })
  });
