'use strict';

describe('facilityKPIService', function () {
  beforeEach(module('delivery', 'facilityKPIMocks'));

  var facilityKPIService;
  var facilityKPI;
  beforeEach(inject(function (_facilityKPIService_, _facilityKPIMock_) {
    facilityKPIService = _facilityKPIService_;
    facilityKPI = _facilityKPIMock_;
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

    it('should return validationErr.antigensNoImmunized["BCG"]  set to TRUE', function(){
      var temp = angular.copy(facilityKPI);
      var isValidKPI = facilityKPIService.isValidFacilityKPI(temp);
      expect(isValidKPI).toBeTruthy();
      var index = 0;
      temp.antigensKPI[index].noImmuized = '123'; //non number
      var validationErr = facilityKPIService.isValidFacilityKPI(temp);
      expect(validationErr.antigensNoImmunized[temp.antigensKPI[index].productID]).toBeTruthy();
    });

  });

});
