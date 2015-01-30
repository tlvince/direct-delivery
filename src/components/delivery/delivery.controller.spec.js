'use strict';
/*eslint-env jasmine */
/*global module: false, inject: false */

describe('FacilityDeliveryCtrl', function() {
  beforeEach(module('delivery', 'deliveryMock', 'log'));

  var FacilityDeliveryCtrl;

  beforeEach(inject(function($controller, _$state_, _log_, _deliveryService_, _dailyDeliveryMock_, FACILITY_ID) {

    _$state_.params = { facilityId: FACILITY_ID };

    FacilityDeliveryCtrl = $controller('FacilityDeliveryCtrl', {
      state: _$state_,
      deliveryService: _deliveryService_,
      dailyDelivery: _dailyDeliveryMock_,
      log: _log_
    });

  }));

  it('should expose dailyDelivery', function(){
    expect(FacilityDeliveryCtrl.dailyDelivery).toBeDefined();
  });

  it('should expose ddId', function(){
    expect(FacilityDeliveryCtrl.ddId).toBeDefined();
  });

  it('should expose facility', function(){
    expect(FacilityDeliveryCtrl.facility).toBeDefined();
  });

  it('should expose facility kpi', function(){
    expect(FacilityDeliveryCtrl.facilityKPI).toBeDefined();
  });

});
