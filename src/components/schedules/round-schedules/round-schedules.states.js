/**
 * Created by ehealthafrica on 1/13/15.
 */

angular.module('schedules.round')
  .config(function($stateProvider){
    $stateProvider.state('schedules.round', {
      url: '',
      templateUrl: 'components/schedules/round-schedules/round.html',
      controller: 'SchedulesRoundCtrl',
      controllerAs: 'schedulesRoundCtrl',
      resolve: {
        rounds : function(log, scheduleRoundService){
          return scheduleRoundService.getSortedByDate()
            .catch(function(err){
              log.error(scheduleRoundResolveErr, err);
              return [];
            })
        }
      }
    })
  });