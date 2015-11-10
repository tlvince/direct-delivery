'use strict';

angular.module('delivery')
  .config(function ($stateProvider) {
    $stateProvider
      .state('facilityDelivery', {
        url: '/facility-delivery',
        controller: 'FacilityDeliveryCtrl',
        controllerAs: 'facDevCtrl',
        templateUrl: 'app/components/delivery/facility-delivery.html',
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
        templateUrl: 'app/components/delivery/deliver-items/deliver-items.html',
        parent: 'facilityDelivery',
        controllerAs: 'diCtrl',
        controller: 'DeliverItemsCtrl'
      })
      .state('facilityDelivery.signOff', {
        url: '/sign-off/:ddId/:facilityId',
        templateUrl: 'app/components/delivery/sign-off/sign-off.html',
        parent: 'facilityDelivery',
        controllerAs: 'signOffCtrl',
        controller: 'SignOffCtrl'
      })
      .state('cancelDelivery', {
        url: '/cancel-delivery/:ddId/:facilityId',
        templateUrl: 'app/components/delivery/cancel-delivery/cancel-delivery.html',
        parent: 'facilityDelivery',
        controllerAs: 'cancelDevCtrl',
        controller: 'CancelDeliveryCtrl'
      });
  });
