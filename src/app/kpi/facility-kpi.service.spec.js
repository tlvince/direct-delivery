'use strict';

describe('facilityKPIService', function () {
  beforeEach(module('kpi', 'delivery', 'facilityKPIMocks', 'db', 'utility.pouchdb'));

  var facilityKPIService;
  var facilityKPI;
  var dbService;
  var pouchUtil;

  beforeEach(inject(function (_facilityKPIService_, _facilityKPIMock_, _dbService_, _pouchUtil_) {
    facilityKPIService = _facilityKPIService_;
    facilityKPI = _facilityKPIMock_;
    dbService = _dbService_;
    pouchUtil = _pouchUtil_;

    spyOn(dbService, 'save').and.callThrough();
    spyOn(dbService, 'getView').and.callThrough();
    spyOn(facilityKPIService, 'getByDriverId').and.callThrough();

  }));

  it('facilityKPI should be defined', function () {
    expect(facilityKPI).toBeDefined();
  });

  it('Should expose facilityKPIService.isValidOutreach()', function () {
    expect(angular.isFunction(facilityKPIService.isValidOutreach)).toBeTruthy();
  });

  it('Should expose facilityKPIService.isValidFacilityKPI()', function () {
    expect(angular.isFunction(facilityKPIService.isValidFacilityKPI)).toBeTruthy();
  });

  describe('isValidOutreach()', function () {
    it('isValidOutreach() should return TRUE for numbers', function () {
      var outreach = 3;
      var res = facilityKPIService.isValidOutreach(outreach);
      expect(res).toBeTruthy();
    });

    it('isValidOutreach() should return FALSE for non-numbers.', function () {
      var outreach = '123';
      expect(facilityKPIService.isValidOutreach(outreach)).toBeFalsy();
    });
  });

  describe('isValidFacilityKPI()', function(){
    it('should return TRUE for valid KPI', function(){
      var res = facilityKPIService.isValidFacilityKPI(facilityKPI);
      expect(res).toBeTruthy();
    });

    it('should return validationErr.outreach set to TRUE', function(){
      var temp = angular.copy(facilityKPI);
      var isValidKPI = facilityKPIService.isValidFacilityKPI(temp);
      expect(isValidKPI).toBeTruthy();
      temp.outreachSessions = '123'; //non number
      var validationErr = facilityKPIService.isValidFacilityKPI(temp);
      expect(validationErr.outreach).toBeTruthy();
    });

    it('should return validationErr.antigensNoImmunized[index]  set to TRUE', function(){
      var temp = angular.copy(facilityKPI);
      var isValidKPI = facilityKPIService.isValidFacilityKPI(temp);
      expect(isValidKPI).toBeTruthy();
      var index = 0;
      temp.antigensKPI[index].noImmunized = '123'; //non number
      var validationErr = facilityKPIService.isValidFacilityKPI(temp);
      expect(validationErr.antigensNoImmunized[index]).toBeTruthy();
    });

  });

  describe('save', function() {
    it('Should call dbService.save() with given doc', function() {
      expect(dbService.save).not.toHaveBeenCalled();
      facilityKPIService.save(facilityKPI);
      expect(dbService.save).toHaveBeenCalledWith(facilityKPI);
    });
  });

  describe('getBy', function() {
    it('Should call dbService.getView() with expected parameters', function() {
      expect(dbService.getView).not.toHaveBeenCalled();
      var testDriverId = 'test@example.com';
      var testDate = '2015-04-12';
      var view = 'kpi/by-driver-date';
      facilityKPIService.getBy(testDriverId, testDate);
      var key = testDriverId + '-' + testDate;
      var params = pouchUtil.key(key);
      params.include_docs = true;
      expect(dbService.getView).toHaveBeenCalledWith(view, params);
    });
  });

  describe('getKPIFromBy', function() {
    it('Should return KPI that matches given facility id from list', function() {
      var kpiList = [facilityKPI];
      var facilityId = facilityKPI.facility.id;
      var result = facilityKPIService.getKPIFromBy(kpiList, facilityId);
      expect(result).toBe(facilityKPI);
    });

    it('Should return undefined if KPI with matching facility id does not exist in the list', function(){
      var kpiList = [facilityKPI];
      var facilityId = 'ID-DOES-NOT-EXIST-IN-LIST';
      var result = facilityKPIService.getKPIFromBy(kpiList, facilityId);
      expect(result).toBeUndefined();
    });
  });

  describe('getByDriverId', function() {
    it('Should call dbService.getView() with expected parameters', function(){
      var testDriverId = 'test@example.com';
      var params = pouchUtil.key(testDriverId);
      params.include_docs = true;
      var view = 'kpi/by-driver';
      expect(dbService.getView).not.toHaveBeenCalled();
      facilityKPIService.getByDriverId(testDriverId);
      expect(dbService.getView).toHaveBeenCalledWith(view, params);
    });
  });

  describe('getByDriverSorted', function(){
    it('Should call dbService.getView() with expected parameters', function() {
      var testDriverId = 'test@example.com';
      var params = pouchUtil.key(testDriverId);
      params.include_docs = true;
      var view = 'kpi/by-driver';
      expect(dbService.getView).not.toHaveBeenCalled();
      facilityKPIService.getByDriverId(testDriverId);
      expect(dbService.getView).toHaveBeenCalledWith(view, params);
    });
  });

});
