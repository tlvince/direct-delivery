'use strict';


describe('FacilityKPIListCtrl', function() {
	beforeEach(module('kpi', 'facilityKPIMocks'));

	var FacilityKPIListCtrl;
	var utility;
	var driverId = 'test@user.com';
	var facilityKPIMock;
	var facilityKPIService;
	var validKPI;

	beforeEach(inject(function($controller, _facilityKPIService_, _utility_, AuthService, _facilityKPIMock_, _validKPI_) {
		utility = _utility_;
		facilityKPIMock = _facilityKPIMock_;
		facilityKPIService = _facilityKPIService_;
		validKPI = _validKPI_;

		AuthService.setCurrentUser({ name: driverId });

		FacilityKPIListCtrl = $controller('FacilityKPIListCtrl', {
			facilityKPIService: facilityKPIService,
			utility: utility,
			kpiSorted: [facilityKPIMock, validKPI]
		});

		spyOn(utility, 'formatDate').and.callThrough();

	}));

	it('Should set FacilityKPIListCtrl.kpiList to an Array', function() {
		expect(angular.isArray(FacilityKPIListCtrl.kpiList)).toBeTruthy();
	});

	describe('formatDate', function(){
		it('Should call utility.formatDate() with parameter passed to it.', function(){
			expect(utility.formatDate).not.toHaveBeenCalled();
			var date = new Date();
			FacilityKPIListCtrl.formatDate(date);
			expect(utility.formatDate).toHaveBeenCalledWith(date);
		});

		it('Should return same value as utility.formatDate()', function(){
			var testDate = new Date();
			var result = FacilityKPIListCtrl.formatDate(testDate);
			var expected = utility.formatDate(testDate);
			expect(result).toBe(expected);
		});
	});

	describe('isComplete', function(){
		it('Should return TRUE if kpiDoc is VALID', function(){
			expect(facilityKPIService.isValidFacilityKPI(validKPI)).toBeTruthy();
			var result = FacilityKPIListCtrl.isComplete(validKPI);
			expect(result).toBeTruthy();
		});

		it('Should return FALSE if kpiDoc is INVALID', function() {
			var err = angular.isObject(facilityKPIService.isValidFacilityKPI(facilityKPIMock));
			expect(err).toBeTruthy();
			var result = FacilityKPIListCtrl.isComplete(facilityKPIMock);
			expect(result).toBeFalsy();
		});
	});

	describe('showTable', function() {
		it('Should return TRUE if FacilityKPIListCtrl.kpiList is not EMPTY Array', function(){
			expect(angular.isArray(FacilityKPIListCtrl.kpiList)).toBeTruthy();
			expect(FacilityKPIListCtrl.kpiList.length).toBeGreaterThan(0);
			var result = FacilityKPIListCtrl.showTable();
			expect(result).toBeTruthy();
		});

    it('Should return FALSE if FacilityKPIListCtrl.kpiList is EMPTY Array', function() {
	    FacilityKPIListCtrl.kpiList = [];
	    expect(angular.isArray(FacilityKPIListCtrl.kpiList)).toBeTruthy();
	    expect(FacilityKPIListCtrl.kpiList.length).toBe(0);
	    var result = FacilityKPIListCtrl.showTable();
	    expect(result).toBeFalsy();
    });

		it('Should return FALSE if FacilityKPIListCtrl.kpiList is not an Array', function(){
			FacilityKPIListCtrl.kpiList = {};
			expect(angular.isArray(FacilityKPIListCtrl.kpiList)).toBeFalsy();
			var result = FacilityKPIListCtrl.showTable();
			expect(result).toBeFalsy();
		});

	});

});

