'use strict';

angular.module('home.packing')
  .config(function($stateProvider) {
    $stateProvider.state('home.packing', {
      url: 'daily-packing',
      templateUrl: 'app/home/packing/home-packing.html',
      onEnter: function($timeout, $state, dailySchedule) {
        if (dailySchedule) {
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
        nextState: 'home.schedule',
        tabbed: true
      }
    });
  });
