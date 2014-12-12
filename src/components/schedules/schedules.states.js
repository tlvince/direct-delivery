/**
 * Created by ehealthafrica on 12/11/14.
 */

'use strict';

angular.module('scheduler')
  .config(function($stateProvider){
    $stateProvider.state('schedules', {
        url: 'schedules',
        controller: 'schedulesCtrl',
        templateUrl:'components/schedules/schedule.html',
        parent: 'index',
        data:{
          label: 'schedules'
        }
    })
    .state('schedule-info', {
        templateUrl: 'components/schedules/schedule-info.html',
        controller: 'schedulesCtrl',
        //parent: 'home'
     })
      .state('schedule-day', {
        
      })
  });
