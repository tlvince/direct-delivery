/**
 * Created by ehealthafrica on 3/19/15.
 */

angular.module('home.returned', ['core', 'packingTable'])
  .config(function($stateProvider){
    $stateProvider
      .state('home.returned', {
        url: 'returned',
        templateUrl: 'app/home/returned/index.html',
        controller: 'ReturnedCtrl',
        controllerAs: 'returnedCtrl',
        resolve: {
          dailySchedule: function(log, scheduleService) {
            function errorHandler(error) {
              log.info('dailyScheduleRetrival', error);
              return {};
            }
            return scheduleService.getDaySchedule()
              .catch(errorHandler);
          }
        }
      })
  });