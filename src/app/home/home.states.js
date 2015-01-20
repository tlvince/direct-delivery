'use strict';

angular.module('home')
  .config(function($stateProvider) {
    $stateProvider.state('home', {
      url: '/',
      parent: 'index',
      views :{
        '' : {
          templateUrl: 'app/home/home.html',
          data: {
            label: 'Home'
          }
        },
        'daySchedule@home': {
          templateUrl: '/app/daily-schedules/daily-schedule.html',
          controller: 'SchedulesDailyCtrl',
          controllerAs: 'schedulesDailyCtrl',
          resolve: {
            dailySchedule: function(scheduleService){
              return scheduleService.getDaySchedule()
                .then(function(response){
                  return response;
                })
                .catch(function(err){
                  console.error(err);
                  return [];
                });
            }
          }
        }
      }
    })
  });
