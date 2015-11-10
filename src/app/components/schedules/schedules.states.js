/**
 * Created by ehealthafrica on 12/11/14.
 */

'use strict';

angular.module('schedules')
  .config(function ($stateProvider) {
    $stateProvider
      .state('schedules', {
        abstract: true,
        url: '/schedules',
        parent: 'index',
        templateUrl: 'app/components/schedules/schedule.html',
        data: {
          label: 'Schedule'
        }
      })
  });
