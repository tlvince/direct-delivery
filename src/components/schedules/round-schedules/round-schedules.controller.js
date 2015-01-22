/**
 * Created by ehealthafrica on 1/13/15.
 */

angular.module('schedules.round')
  .controller('SchedulesRoundCtrl', function(scheduleService, syncService){

    syncService.dailySyncDown('local', 'http://localhost:5984/deliveries',
      'abdullahi.ahmed@example.com', '2015-01-22');

  });
