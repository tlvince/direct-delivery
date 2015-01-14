'use strict';
/*eslint-env jasmine */
/*global module: false, inject: false */

describe('FacilityDeliveryCtrl', function() {
  beforeEach(module('delivery'));

  var FacilityDeliveryCtrl;

  beforeEach(inject(function($controller) {
    FacilityDeliveryCtrl = $controller('FacilityDeliveryCtrl');
  }));

  it('should expose delivery steps', function() {
    expect(FacilityDeliveryCtrl.STEPS).toBeDefined();
  });
});
