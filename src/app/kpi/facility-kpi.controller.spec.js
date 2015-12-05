'use strict';
/*eslint-env jasmine */
/*global module: false, inject: false */

describe('FacilityKPICtrl', function() {
  beforeEach(module('kpi', 'facilityKPIMocks', 'schedules'));

  var FacilityKPICtrl;
  var facilityKPIService;
  var scheduleService;
  var AuthService;
  var utility;
  var driverId = 'test@user.com';

  beforeEach(inject(function($controller, _facilityKPIService_, _AuthService_, _utility_, _log_, _$state_, _facilityKPIMock_, $q, _scheduleService_) {

    facilityKPIService = _facilityKPIService_;
    scheduleService = _scheduleService_;
    AuthService = _AuthService_;
    utility = _utility_;
    AuthService.setCurrentUser({ name: driverId });

    FacilityKPICtrl = $controller('FacilityKPICtrl', {
      facilityKPIService: facilityKPIService,
      AuthService: AuthService,
      utility: utility,
      log: _log_,
      $state: _$state_,
      dailySchedule: [],
      kpiTemplate: {}
    });

    spyOn(facilityKPIService, 'isValidKPI').and.callThrough();
    spyOn(facilityKPIService, 'getKPIFromBy').and.returnValue(_facilityKPIMock_);
    spyOn(facilityKPIService, 'getBy').and.callThrough();
    spyOn(facilityKPIService, 'isValidFacilityKPI').and.callThrough();
    spyOn(facilityKPIService, 'save').and.callFake(function(){
      return $q.when({});
    });
    spyOn(scheduleService, 'getDaySchedule').and.callFake(function(){
      return $q.when([])
    })

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

  describe('hideOptions', function() {
    it('Should return FALSE if FacilityKPICtrl.selectedFacilityId !== "" ' +
        'and FacilityKPICtrl.selectedFacility is NOT null', function(){
      FacilityKPICtrl.selectedFacilityId = 'KNS HF 102 TEST';
      FacilityKPICtrl.selectedFacility = {};
      expect(FacilityKPICtrl.selectedFacilityId).not.toBe('');
      expect(FacilityKPICtrl.selectedFacility).not.toBeNull();
      expect(FacilityKPICtrl.hideOptions()).toBeFalsy();
    });

    it('Should return TRUE if FacilityKPICtrl.selectedFacilityId === "" and ' +
        ' and FacilityKPICtrl.selectedFacility is NOT null', function(){
      FacilityKPICtrl.selectedFacility = {};
      expect(FacilityKPICtrl.selectedFacilityId).toBe('');
      expect(FacilityKPICtrl.selectedFacility).not.toBeNull();
      expect(FacilityKPICtrl.hideOptions()).toBeTruthy();
    });

    it('Should return TRUE if FacilityKPICtrl.selectedFacility is null and ' +
        ' FacilityKPICtrl.selectedFacilityId !== "" ', function(){
      FacilityKPICtrl.selectedFacilityId = 'KN HF 12K';
      expect(FacilityKPICtrl.selectedFacilityId).not.toBe('');
      expect(FacilityKPICtrl.selectedFacility).toBeNull();
      expect(FacilityKPICtrl.hideOptions()).toBeTruthy();
    });

    it('Should return TRUE if FacilityKPICtrl.selectedFacility is null and ' +
        ' FacilityKPICtrl.selectedFacilityId === "" ', function(){
      expect(FacilityKPICtrl.selectedFacilityId).toBe('');
      expect(FacilityKPICtrl.selectedFacility).toBeNull();
      expect(FacilityKPICtrl.hideOptions()).toBeTruthy();
    });
  });

  describe('showSkipForm', function() {
    it('Should set shouldSkipKPI to TRUE', function(){
      expect(FacilityKPICtrl.shouldSkipKPI()).toBeFalsy();
      FacilityKPICtrl.showSkipForm();
      expect(FacilityKPICtrl.shouldSkipKPI()).toBeTruthy();
    });

    it('Should set shouldShowKPI to FALSE', function(){
      FacilityKPICtrl.showKPIForm();
      expect(FacilityKPICtrl.shouldAddKPI()).toBeTruthy();
      FacilityKPICtrl.showSkipForm();
      expect(FacilityKPICtrl.shouldAddKPI()).toBeFalsy();
    });
  });

  describe('showKPIForm', function(){
    it('Should set shouldShowKPI to TRUE', function(){
      expect(FacilityKPICtrl.shouldAddKPI()).toBeFalsy();
      FacilityKPICtrl.showKPIForm();
      expect(FacilityKPICtrl.shouldAddKPI()).toBeTruthy();
    });

    it('Should set shouldSkipKPI to FALSE', function(){
      FacilityKPICtrl.showSkipForm();
      expect(FacilityKPICtrl.shouldSkipKPI()).toBeTruthy();
      FacilityKPICtrl.showKPIForm();
      expect(FacilityKPICtrl.shouldSkipKPI()).toBeFalsy();
    });
  });

  describe('skipKPI', function() {
    it('should call facilityKPIService.save()', function(){
      expect(facilityKPIService.save).not.toHaveBeenCalled();
      FacilityKPICtrl.skipKPI();
      expect(facilityKPIService.save).toHaveBeenCalled();
    });
  });

});

