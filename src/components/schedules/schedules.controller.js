/**
 * Created by ehealthafrica on 12/11/14.
 */
'use strict';

angular.module('scheduler')
  .controller('schedulesCtrl', function($scope, scheduleService){
    $scope.currentSchedule = scheduleService.scheduleDB[0];

  })
