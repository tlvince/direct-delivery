/**
 * Created by ehealthafrica on 12/11/14.
 */

'use strict';

angular.module('scheduler')
  .config(function($stateProvider){
    $stateProvider.state('schedules', {
      url: 'schedules',
      controller: 'SchedulesCtrl',
      controllerAs: 'schedulesCtrl',
      templateUrl:'components/schedules/schedule.html',
      parent: 'index',
      data:{
        label: 'schedules'
      }
    })
  });
