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
          templateUrl: '/components/schedules/partials/daily_schedule.html',
          controller: 'SchedulesCtrl',
          controllerAs: 'schedulesCtrl'
        }
      }
    })
  });
