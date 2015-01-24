'use strict';
/*eslint-env jasmine */
/*global module: false, inject: false */

describe('FacilityDeliveryCtrl', function() {
  beforeEach(module('delivery', 'deliveryMock'));

  var FacilityDeliveryCtrl;

  beforeEach(inject(function($controller, _$state_, DELIVERY_STEPS, _deliveryService_, _dailyDeliveryMock_) {
    FacilityDeliveryCtrl = $controller('FacilityDeliveryCtrl', {
      state: _$state_,
      DELIVERY_STEPS: DELIVERY_STEPS,
      deliveryService: _deliveryService_,
      dailyDelivery: _dailyDeliveryMock_
    });
  }));

  it('should expose delivery steps', function() {
    expect(FacilityDeliveryCtrl.STEPS).toBeDefined();
  });
});
