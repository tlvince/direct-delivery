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
    })
    .state('home.packing', {
      url: 'daily-packing',
      templateUrl: 'app/home/packing.html',
      resolve: {
        dailyDelivery: function(packingTableService) {
          return packingTableService.getToday();
        }
      },
      onEnter: function($timeout, $state, dailyDelivery) {
        if (dailyDelivery) {
          // XXX: $timeout required to prevent circular references, see:
          // angular-ui/ui-router#1169
          return $timeout(function() {
            $state.go('home.packing.hasPacking');
          });
        }
        $timeout(function() {
          $state.go('home.packing.noPacking');
        });
      }
    })
    .state('home.packing.noPacking', {
      url: '',
      templateUrl: 'components/packing-table/no-packing.html'
    })
    .state('home.packing.hasPacking', {
      url: '',
      templateUrl: 'components/packing-table/packing-table.html',
      controller: 'PackingTableCtrl',
      controllerAs: 'packingTableCtrl',
      resolve: {
        productStorages: function(packingTableLegendService) {
          return packingTableLegendService.get();
        }
      },
      data: {
        nextState: 'home.schedule'
      }
    });
  });
