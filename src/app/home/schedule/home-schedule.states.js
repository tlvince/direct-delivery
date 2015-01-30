'use strict';

angular.module('home.schedule')
  .config(function($stateProvider) {
    $stateProvider.state('home.schedule', {
      url: 'daily-schedule',
      templateUrl: 'app/home/schedule/layout.html',
      onEnter: function($state, $timeout, dailySchedule) {
        if (dailySchedule) {
          return $timeout(function() {
            $state.go('home.schedule.hasSchedule');
          });
        }
        $timeout(function() {
          $state.go('home.schedule.noSchedule');
        });
      }
    })
    .state('home.schedule.noSchedule', {
      url: '',
      templateUrl: 'app/home/schedule/no-schedule.html'
    })
    .state('home.schedule.hasSchedule', {
      templateUrl: 'app/home/schedule/home-schedule.html',
      controller: 'HomeScheduleCtrl',
      controllerAs: 'homeScheduleCtrl'
    });
  });
