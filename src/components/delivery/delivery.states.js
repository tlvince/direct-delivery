'use strict';

angular.module('delivery')
  .config(function($stateProvider){
    $stateProvider.state('facilityDelivery', {
      url: '/facility-delivery?facilityName&facilityId',
      controller: 'FacilityDeliveryCtrl',
      controllerAs: 'facDevCtrl',
      templateUrl: 'components/delivery/facility-delivery.html',
      parent: 'index'
    });
  });
