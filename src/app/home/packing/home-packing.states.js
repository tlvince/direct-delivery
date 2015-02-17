'use strict';

angular.module('home.packing')
  .config(function($stateProvider) {
    $stateProvider.state('home.packing', {
      url: 'daily-packing',
      templateUrl: 'components/packing-table/packing-table.html',
      controller: 'PackingTableCtrl',
      controllerAs: 'packingTableCtrl',
      resolve: {
        dailySchedule: function(log, scheduleService) {
          function errorHandler(error) {
            log.info('dailyScheduleRetrival', error);
            return {};
          }
          return scheduleService.getDaySchedule()
            .catch(errorHandler);
        },
        productStorages: function(packingTableLegendService) {
          return packingTableLegendService.get();
        }
      },
      data: {
        nextState: 'home.schedule',
        tabbed: true
      }
    });
  });
