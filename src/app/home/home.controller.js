/**
 * Created by ehealthafrica on 12/16/14.
 */


angular.module('home')
  .controller('homeCtrl', function($scope, scheduleService){
    $scope.day = scheduleService.getDaySchedule();

  });