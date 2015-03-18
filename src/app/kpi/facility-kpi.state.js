'use strict';

angular
  .module('kpi')
  .config(function($stateProvider) {
    $stateProvider.state('facilityKPI', {
      parent: 'index',
      url: 'facility-kpi',
      templateUrl: 'app/kpi/facility-kpi.html',
      controller: 'FacilityKPICtrl',
      controllerAs: 'facKPICtrl',
      data: {
        label: 'Facility KPI'
      }
    });
  });
