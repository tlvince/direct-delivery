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
                console.log(res);
                return res[0];
              })
              .catch(function(){
                return;
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
        url: '/collect-kpi/:ddId/:facilityId',
        templateUrl: 'components/delivery/partials/facility-kpi.html',
        parent: 'facilityDelivery'
      })
      .state('facilityDelivery.signOff', {
        url: '/sign-off/:ddId/:facilityId',
        templateUrl: 'components/delivery/partials/delivery-sign-off.html',
        parent: 'facilityDelivery'
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
