'use strict';
/*eslint-env jasmine */
/*global module: false, inject: false */

describe('FacilityDeliveryCtrl', function() {
  beforeEach(module('delivery'));

  var FacilityDeliveryCtrl;

  beforeEach(inject(function($controller, _$state_, DELIVERY_STEPS) {
    FacilityDeliveryCtrl = $controller('FacilityDeliveryCtrl', {
      state: _$state_,
      DELIVERY_STEPS: DELIVERY_STEPS
    });
  }));

  it('should expose delivery steps', function() {
    expect(FacilityDeliveryCtrl.STEPS).toBeDefined();
  });
});
