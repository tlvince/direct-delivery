/**
 * Created by ehealthafrica on 1/13/15.
 */

angular.module('schedules.round')
  .config(function($stateProvider){
    $stateProvider.state('schedules.round', {
      url: '/schedules-round/:roundId',
      templateUrl: 'components/schedules/round-schedules/round.html',
      controller: 'SchedulesRoundCtrl',
      controllerAs: 'schedulesRoundCtrl',
      resolve: {
        rounds : function(log, scheduleRoundService){
          return scheduleRoundService.getSortedByDate()
            .catch(function(err){
              log.error('scheduleRoundResolveErr', err);
              return [];
            })
        }
      }
    }).state('schedules.viewDeliveryRound', {
      url: '/view-delivery-round/:ddId/:facilityId/:roundId',
      controller: 'DeliveryRoundHistoryCtrl',
      controllerAs: 'drhCtrl',
      templateUrl: 'components/schedules/round-schedules/delivery-item-history.html',
      resolve: {
        facilityRound: function(dbService, $stateParams, log, $q, utility, deliveryService) {
          var id = $stateParams.ddId;
          var facilityId = $stateParams.facilityId;

          function errorHandler (err){
            log.error('dailyScheduleWithGivenIdDoesNotExists', err);
            return $q.reject(err); //prevent state transition.
          }

          return dbService.get(id)
              .then(function(dd) {
                var facilityRounds = deliveryService.filterByFacility(dd, facilityId);
                var facilityRound = utility.first(facilityRounds);
                if(!angular.isObject(facilityRound)) {
                  return errorHandler('Facility round with given id is missing');
                }
                return facilityRound;
              })
              .catch(errorHandler);
        }
      }
    });
  });
