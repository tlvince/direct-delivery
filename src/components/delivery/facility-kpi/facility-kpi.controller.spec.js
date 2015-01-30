'use strict';
/*eslint-env jasmine */
/*global module: false, inject: false */

describe('FacilityKPICtrl', function() {
  beforeEach(module('delivery', 'deliveryMock', 'log'));

  var FacilityKPICtrl;

  beforeEach(inject(function($controller, _$state_, _deliveryService_, _facilityKPIService_, _dailyDeliveryMock_, _log_, FACILITY_ID) {
    _$state_.params = { facilityId: FACILITY_ID };

    var scope = {
      facDevCtrl: $controller('FacilityDeliveryCtrl', {
        $state: _$state_,
        deliveryService: _deliveryService_,
        dailyDelivery: _dailyDeliveryMock_,
        log: _log_
      })
    };

    FacilityKPICtrl = $controller('FacilityKPICtrl', {
      $state: _$state_,
      deliveryService: _deliveryService_,
      facilityKPIService: _facilityKPIService_,
      $scope: scope
    });

  }));

  it('should expose isValidOutreach()', function() {
    expect(FacilityKPICtrl.isValidOutreach).toBeDefined();
  });

  describe('togglePreview()', function(){
    it('should toggle FacilityKPICtrl.previewKPI', function(){
      var before = FacilityKPICtrl.previewKPI;
      FacilityKPICtrl.togglePreview();
      var after = FacilityKPICtrl.previewKPI;
      expect(before).not.toBe(after)
    });
  });


});
