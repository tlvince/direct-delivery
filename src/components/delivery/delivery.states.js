'use strict';

angular.module('delivery')
  .config(function ($stateProvider) {
    $stateProvider
      .state('facilityDelivery', {
        url: '/facility-delivery',
        controller: 'FacilityDeliveryCtrl',
        controllerAs: 'facDevCtrl',
        templateUrl: 'components/delivery/facility-delivery.html',
        parent: 'index'
      })
      .state('facilityDelivery.deliverItems', {
        url: '/deliver-items?facilityName&facilityId',
        templateUrl: 'components/delivery/partials/deliver-items.html',
        parent: 'facilityDelivery'
      })
      .state('facilityDelivery.collectKPI', {
        url: '/collect-kpi',
        templateUrl: 'components/delivery/partials/collect-kpi.html',
        parent: 'facilityDelivery'
      })
      .state('facilityDelivery.signOff', {
        url: '/sign-off',
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
      .state('facilityDelivery.cancel', {
        url: '/cancel',
        templateUrl: 'components/delivery/partials/cancel-delivery.html',
        parent: 'facilityDelivery'
      });
  });
