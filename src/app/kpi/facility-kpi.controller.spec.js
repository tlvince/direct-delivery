'use strict';
/*eslint-env jasmine */
/*global module: false, inject: false */

describe('FacilityKPICtrl', function() {
  beforeEach(module('kpi'));

  var FacilityKPICtrl;

  beforeEach(inject(function($controller, _facilityKPIService_) {

    FacilityKPICtrl = $controller('FacilityKPICtrl', {
      facilityKPIService: _facilityKPIService_
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

