'use strict';

angular.module('home.packing')
  .config(function($stateProvider) {
    $stateProvider.state('home.packing', {
      url: 'daily-packing',
      templateUrl: 'app/components/packing-table/packing-table.html',
      controller: 'PackingTableCtrl',
      controllerAs: 'packingTableCtrl',
      resolve: {
        productStorages: function(packingTableLegendService) {
          return packingTableLegendService.get();
        },
        dailyPacking: function (log, packingTableService) {
          function errorHandler(error) {
            log.info('dailyPackingTableRetrieval', error);
            return {};
          }
          return packingTableService.getDayPacking()
            .catch(errorHandler);
        }
      },
      data: {
        nextState: 'home.schedule',
        tabbed: true
      }
    });
  });
