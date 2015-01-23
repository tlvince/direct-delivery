/**
 * Created by ehealthafrica on 1/13/15.
 */

angular.module('schedules.daily')
  .controller('SchedulesDailyCtrl', function(dailySchedule){
    this.day= dailySchedule[0];
  });
