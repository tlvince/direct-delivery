/**
 * Created by ehealthafrica on 12/11/14.
 */
'use strict';

angular.module('scheduler')
  .controller('SchedulesCtrl', function(scheduleService){
   this.currentSchedule = scheduleService.scheduleDB[0];
   this.day = scheduleService.getDaySchedule();
  });
