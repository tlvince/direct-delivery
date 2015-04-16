'use strict';
/*eslint-env jasmine */
/*global module: false, inject: false */

describe('FacilityKPICtrl', function() {
  beforeEach(module('kpi'));

  var FacilityKPICtrl;
  var facilityKPIService;
  var AuthService;
  var utility;
  var driverId = 'test@user.com';

  beforeEach(inject(function($controller, _facilityKPIService_, _AuthService_, _scheduleService_,
                             _utility_, _deliveryService_, _log_, _$state_) {

    facilityKPIService = _facilityKPIService_;
    AuthService = _AuthService_;
    utility = _utility_;
    AuthService.setCurrentUser({ name: driverId });

    FacilityKPICtrl = $controller('FacilityKPICtrl', {
      facilityKPIService: facilityKPIService,
      AuthService: AuthService,
      utility: utility,
      scheduleService: _scheduleService_,
      deliveryService: _deliveryService_,
      log: _log_,
      $state: _$state_
    });

    spyOn(facilityKPIService, 'isValidKPI').and.callThrough();
    spyOn(facilityKPIService, 'getFacilityKPIFrom').and.callThrough();
    spyOn(facilityKPIService, 'getFromById').and.callThrough();
    spyOn(facilityKPIService, 'loadFacilities').and.callThrough();
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

  describe('loadFacilityKPI()', function(){
    it('Should set FacilityKPICtrl.selectedLoadKPI to TRUE', function() {
      expect(FacilityKPICtrl.selectedLoadKPI).not.toBeTruthy();
      FacilityKPICtrl.loadFacilityKPI();
      expect(FacilityKPICtrl.selectedLoadKPI).toBeTruthy();
    });

    it('Should call facilityKPIService.getFacilityKPIFrom()', function(){
      expect(facilityKPIService.getFacilityKPIFrom).not.toHaveBeenCalled();
      FacilityKPICtrl.loadFacilityKPI();
      expect(facilityKPIService.getFacilityKPIFrom).toHaveBeenCalled();
    });

    it('Should call facilityKPIService.getFromById()', function(){
      expect(facilityKPIService.getFromById).not.toHaveBeenCalled();
      FacilityKPICtrl.loadFacilityKPI();
      expect(facilityKPIService.getFromById).toHaveBeenCalled();
    });
  });

  describe('loadFacilities()', function() {
    it('Should call facilityKPIService.loadFacilities() with expected parameters', function() {
      var expectedDriverId = driverId;
      var expectedDate = utility.extractDate(new Date());
      expect(facilityKPIService.loadFacilities).not.toHaveBeenCalled();
      FacilityKPICtrl.loadFacilities();
      expect(facilityKPIService.loadFacilities).toHaveBeenCalledWith(expectedDriverId, expectedDate);
    });
  });

});

