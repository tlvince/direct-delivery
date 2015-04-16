'use strict';
/*eslint-env jasmine */
/*global module: false, inject: false */

describe('FacilityKPICtrl', function() {
  beforeEach(module('kpi'));

  var FacilityKPICtrl;

  beforeEach(inject(function($controller, _facilityKPIService_, _AuthService_, _scheduleService_,
                             _utility_, _deliveryService_, _log_, _$state_) {

    _AuthService_.setCurrentUser({ name: 'test@user.com' });

    FacilityKPICtrl = $controller('FacilityKPICtrl', {
      facilityKPIService: _facilityKPIService_,
      AuthService: _AuthService_,
      utility: _utility_,
      scheduleService: _scheduleService_,
      deliveryService: _deliveryService_,
      log: _log_,
      $state: _$state_
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

