'use strict';

angular.module('delivery')
  .config(function ($stateProvider) {
    $stateProvider
      .state('facilityDelivery', {
        url: '/facility-delivery',
        controller: 'FacilityDeliveryCtrl',
        controllerAs: 'facDevCtrl',
        templateUrl: 'components/delivery/facility-delivery.html',
        parent: 'index',
        resolve: {
          dailyDelivery: function($stateParams, scheduleService){
            return scheduleService.getDaySchedule()
              .then(function(res){
                return res;
              })
              .catch(function(){
                return {};
              });
          }
        }
      })
      .state('facilityDelivery.deliverItems', {
        url: '/deliver-items/:ddId/:facilityId/:preview',
        templateUrl: 'components/delivery/deliver-items/deliver-items.html',
        parent: 'facilityDelivery',
        controllerAs: 'diCtrl',
        controller: 'DeliverItemsCtrl'
      })
      .state('facilityDelivery.facilityKPI', {
        url: '/collect-kpi/:ddId/:facilityId/:preview',
        templateUrl: 'components/delivery/facility-kpi/facility-kpi.html',
        parent: 'facilityDelivery',
        controllerAs: 'facKPICtrl',
        controller: 'FacilityKPICtrl'
      })
      .state('facilityDelivery.signOff', {
        url: '/sign-off/:ddId/:facilityId',
        templateUrl: 'components/delivery/sign-off/sign-off.html',
        parent: 'facilityDelivery',
        controllerAs: 'signOffCtrl',
        controller: 'SignOffCtrl'
      })
      .state('facilityDelivery.childFacilityKPI', {
        url: '/child-facility-kpi',
        templateUrl: 'components/delivery/partials/child-facility/child-facility-form.html',
        parent: 'facilityDelivery'
      })
      .state('facilityDelivery.previewChildFacilityKPI', {
        url: '/preview-child-facility-kpi',
        templateUrl: 'components/delivery/partials/child-facility/preview.html',
        parent: 'facilityDelivery'
      })
      .state('cancelDelivery', {
        url: '/cancel-delivery/:ddId/:facilityId',
        templateUrl: 'components/delivery/cancel-delivery/cancel-delivery.html',
        parent: 'facilityDelivery',
        controllerAs: 'cancelDevCtrl',
        controller: 'CancelDeliveryCtrl'
      });
  });
