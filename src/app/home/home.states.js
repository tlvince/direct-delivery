'use strict';

angular.module('home')
  .config(function($stateProvider) {
    $stateProvider.state('home', {
      url: '/',
      parent: 'index',
      templateUrl: 'app/home/home.html',
      controller: 'HomeCtrl',
      controllerAs: 'homeCtrl',
      resolve: {
        dailySchedule: function(log, scheduleService) {
          function errorHandler(error) {
            log.error('dailyScheduleRetrival', error);
            return {};
          }
          return scheduleService.getDaySchedule()
            .catch(errorHandler);
        }
      }
    });
  });
