'use strict';
/*eslint-env jasmine */
/*global module: false, inject: false */

describe('FacilityKPICtrl', function() {
  beforeEach(module('kpi', 'facilityKPIMocks'));

  var FacilityKPICtrl;
  var facilityKPIService;
  var AuthService;
  var utility;
  var driverId = 'test@user.com';

  beforeEach(inject(function($controller, _facilityKPIService_, _AuthService_, _utility_, _log_, _$state_, _facilityKPIMock_) {

    facilityKPIService = _facilityKPIService_;
    AuthService = _AuthService_;
    utility = _utility_;
    AuthService.setCurrentUser({ name: driverId });

    FacilityKPICtrl = $controller('FacilityKPICtrl', {
      facilityKPIService: facilityKPIService,
      AuthService: AuthService,
      utility: utility,
      log: _log_,
      $state: _$state_
    });

    spyOn(facilityKPIService, 'isValidKPI').and.callThrough();
    spyOn(facilityKPIService, 'getKPIFromBy').and.returnValue(_facilityKPIMock_);
    spyOn(facilityKPIService, 'getBy').and.callThrough();
    spyOn(facilityKPIService, 'isValidFacilityKPI').and.callThrough();

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

  describe('isValidKPI()', function() {
    it('Should call facilityKPIService.isValidKPI()', function(){
      expect(facilityKPIService.isValidKPI).not.toHaveBeenCalled();
      FacilityKPICtrl.isValidKPI();
      expect(facilityKPIService.isValidKPI).toHaveBeenCalled();
    });
  });

  describe('getFacilityKPI()', function(){
    it('Should set FacilityKPICtrl.selectedLoadKPI to TRUE', function() {
      expect(FacilityKPICtrl.selectedLoadKPI).not.toBeTruthy();
      FacilityKPICtrl.getFacilityKPI();
      expect(FacilityKPICtrl.selectedLoadKPI).toBeTruthy();
    });

    it('Should call facilityKPIService.getKPIFromBy()', function(){
      expect(facilityKPIService.getKPIFromBy).not.toHaveBeenCalled();
      FacilityKPICtrl.getFacilityKPI();
      expect(facilityKPIService.getKPIFromBy).toHaveBeenCalled();
    });

  });

  describe('getByDriverAndDate()', function() {
    it('Should call facilityKPIService.getBy() with expected parameters', function() {
      var expectedDriverId = driverId;
      var expectedDate = utility.extractDate(new Date());
      expect(facilityKPIService.getBy).not.toHaveBeenCalled();

      FacilityKPICtrl.getByDriverAndDate();

      expect(facilityKPIService.getBy).toHaveBeenCalledWith(expectedDriverId, expectedDate);
    });
  });

});

