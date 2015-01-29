'use strict';

angular.module('home')
  .config(function($stateProvider) {
    $stateProvider.state('homeLayout', {
      abstract: true,
      url: '/',
      parent: 'index',
      templateUrl: 'app/home/home.html'
    })
    .state('home', {
      url: '',
      parent: 'homeLayout',
      views: {
        dailySchedule: {
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
        }
      }
    });
  });
