/**
 * Created by ehealthafrica on 12/11/14.
 */

'use strict';

angular.module('scheduler')
  .config(function($stateProvider){
    $stateProvider.state('schedule', {
        templateUrl:'components/schedules/schedule.html'
    })
  });
