'use strict';

describe('deliveryService', function () {
  beforeEach(module('delivery', 'deliveryMock', 'db', 'log'));

  var deliveryService, deliveryMock, dbService, DELIVERY_STATUS, log, $state;
  var qty = 25, presentation = 20;

  beforeEach(inject(function (_deliveryService_, dailyDeliveryMock, _dbService_,
                              _DELIVERY_STATUS_, _log_, _$state_) {

    deliveryService = _deliveryService_;
    deliveryMock = dailyDeliveryMock;
    dbService = _dbService_;
    DELIVERY_STATUS = _DELIVERY_STATUS_;
    log = _log_;
    $state = _$state_;

    spyOn(deliveryService, 'roundOffBy').and.callThrough();
    spyOn(dbService, 'save').and.callThrough();
    spyOn(log, 'success').and.callThrough();
    spyOn($state, 'go').and.callFake(function(state){});
    spyOn(log, 'error').and.callFake(function(err){});

  }));

  it('deliveryMock should be defined', function () {
    expect(deliveryMock).toBeDefined();
  });

  it('should expose roundOffBy()', function(){
    expect(angular.isFunction(deliveryService.roundOffBy)).toBeTruthy();
  });


  describe('roundOffBy()', function(){

    it('should be called with expected number of parameters', function(){
      expect(deliveryService.roundOffBy).not.toHaveBeenCalled();
      deliveryService.roundOffBy(qty, presentation);
      expect(deliveryService.roundOffBy).toHaveBeenCalledWith(qty, presentation);
    });

    it('should return expected value.', function(){
      var expectedQty = 40;
      var actualQty = deliveryService.roundOffBy(qty, presentation);
      expect(actualQty).toBe(expectedQty);
    });

    it('should return stockQty if it is a multiple of presentation', function(){
      var stockQty = 60;
      var expectedQty = deliveryService.roundOffBy(stockQty, presentation);
      expect(expectedQty).toBe(stockQty);
    });

  });

  describe('save()', function(){
    it('should call dbService.save() with given document.', function(){
      expect(dbService.save).not.toHaveBeenCalled();
      deliveryService.save(deliveryMock);
      expect(dbService.save).toHaveBeenCalledWith(deliveryMock);
    });
  });

  describe('updateFacilityRound()', function(){

    it('should update a given dailyDelivery\'s facility round', function(){
      var facRound = angular.copy(deliveryMock.facilityRounds[0]);
      facRound.status = DELIVERY_STATUS.SUCCESS_FIRST;
      expect(deliveryMock.facilityRounds[0].status).not.toBe(DELIVERY_STATUS.SUCCESS_FIRST);
      deliveryService.updateFacilityRound(deliveryMock, facRound);
      expect(deliveryMock.facilityRounds[0].status).toBe(DELIVERY_STATUS.SUCCESS_FIRST);
    });

    it('should add facRnd to dailyDelivery.facilityRounds list if it does not exist already', function(){
      var newFacRnd = angular.copy(deliveryMock.facilityRounds[0]);
      newFacRnd.facility.id = 'New-HF-UUID';
      var nrOfFacRnds = deliveryMock.facilityRounds.length;
      var dailyDelivery = deliveryService.updateFacilityRound(deliveryMock, newFacRnd);
      var currentNrOfFacRnds = dailyDelivery.facilityRounds.length;
      expect(currentNrOfFacRnds).toBeGreaterThan(nrOfFacRnds);
    });

  });

  describe('filterByFacility()', function(){

    it('should return a list of FacilityRounds for a given facility id and daily delivery', function(){
      var facilityID = deliveryMock.facilityRounds[0].facility.id;
      var result = deliveryService.filterByFacility(deliveryMock, facilityID);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should return EMPTY array', function(){
      var facilityID = 'NON_EXISTENT_FACILITY_ID';
      var result = deliveryService.filterByFacility(deliveryMock, facilityID);
      expect(result.length).toBe(0);
    });
  });

  describe('calcQty()', function(){

    it('Should returned expected deliveredQty as multiple of presentation.', function(){
      var packedProduct = angular.copy(deliveryMock.facilityRounds[0].packedProduct[0]);
      packedProduct.onHandQty = 20;
      //expected(70) - onhand(20) = 50 when round off by presentation(20) = 60
      var expectedDeliveredQty = 60;
      var res = deliveryService.calcQty(packedProduct);
      expect(expectedDeliveredQty).toBe(res.deliveredQty);
    });

    it('should return exact delivered qty if it is a multiple of presentation size.', function(){
      var packedProduct = angular.copy(deliveryMock.facilityRounds[0].packedProduct[0]);
      packedProduct.onHandQty = 30;
      var expectedDeliveredQty = 40;
      var res = deliveryService.calcQty(packedProduct);
      expect(expectedDeliveredQty).toBe(res.deliveredQty);
    });
  });

  describe('initReturnedQty()', function(){

    it('should initialize returnedQty to zero if it not already a Number', function(){
      var packedProducts = angular.copy(deliveryMock.facilityRounds[0].packedProduct);
      packedProducts[0].returnedQty = '12';
      expect(angular.isNumber(packedProducts[0].returnedQty)).toBeFalsy();
      var res = deliveryService.initReturnedQty(packedProducts);
      expect(res[0].returnedQty).toBe(0);
    });

    it('should Not over-write packedProduct.returnedQty if it is a Number.', function(){
      var packedProducts = angular.copy(deliveryMock.facilityRounds[0].packedProduct);
      var expectedValue = 36;
      packedProducts[0].returnedQty = expectedValue;
      expect(angular.isNumber(packedProducts[0].returnedQty)).toBeTruthy();
      var res = deliveryService.initReturnedQty(packedProducts);
      expect(res[0].returnedQty).toBe(expectedValue);
    });

  });

  describe('saved()', function(){
    it('Should call log.success with expected parameters', function(){
      var res = { ok: true };
      expect(log.success).not.toHaveBeenCalled();
      deliveryService.saved(res);
      expect(log.success).toHaveBeenCalledWith('facilityDeliverySaved', res);
    });

    it('should call $state.go with expected parameter', function(){
      expect($state.go).not.toHaveBeenCalled();
      var res = { ok: true };
      deliveryService.saved(res);
      expect($state.go).toHaveBeenCalledWith('home');
    });
  });

  describe('failed()', function(){
    it('Should call log.error() with expected parameters.', function(){
      var error = { error: 'document conflict' };
      expect(log.error).not.toHaveBeenCalled();
      deliveryService.failed(error);
      expect(log.error).toHaveBeenCalledWith('dailyDeliveryFailed', error);
    });
  });

  describe('setSuccessStatus()', function(){

    it('Should set status to SUCCESS_FIRST if current status is UPCOMING_FIRST', function(){
      var facRnd = angular.copy(deliveryMock.facilityRounds[0]);
      facRnd.status = DELIVERY_STATUS.UPCOMING_FIRST;
      deliveryService.setSuccessStatus(facRnd);
      expect(facRnd.status).toBe(DELIVERY_STATUS.SUCCESS_FIRST);
    });


    it('Should set status to DELIVERY_STATUS.SUCCESS_SECOND, ' +
    'if current status is DELIVERY_STATUS.UPCOMING_SECOND', function(){
      var facRnd = angular.copy(deliveryMock.facilityRounds[0]);
      facRnd.status = DELIVERY_STATUS.UPCOMING_SECOND;
      deliveryService.setSuccessStatus(facRnd);
      expect(facRnd.status).toBe(DELIVERY_STATUS.SUCCESS_SECOND);
    });

  });

  describe('getStatusColor()', function() {
    it('Should return FALSE if status is not a string', function(){
      var result = deliveryService.getStatusColor({}, 'alert-danger');
      expect(result).toBeFalsy();
    });

    it('Should return FALSE if status is invalid', function() {
      var result = deliveryService.getStatusColor('invalid-status', 'alert-danger');
      expect(result).toBeFalsy();
    });

    it('Should return FALSE if status is DELIVERY_STATUS.UPCOMING_FIRST', function() {
      var result = deliveryService.getStatusColor(DELIVERY_STATUS.UPCOMING_FIRST, 'alert-danger');
      expect(result).toBeFalsy();
    });

    it('Should return False if status is DELIVERY_STATUS.UPCOMING_SECOND', function() {
      var result = deliveryService.getStatusColor(DELIVERY_STATUS.UPCOMING_SECOND, 'alert-danger');
      expect(result).toBeFalsy();
    });

    it('Should return TRUE if status is DELIVERY_STATUS.SUCCESS_FIRST and cssClass is "alert-success"', function() {
      var result = deliveryService.getStatusColor(DELIVERY_STATUS.SUCCESS_FIRST, 'alert-success');
      expect(result).toBeTruthy();
    });

    it('Should return false if status is DELIVERY_STATUS.SUCCESS_FIRST and cssClass is not "alert-success"', function() {
      var result = deliveryService.getStatusColor(DELIVERY_STATUS.SUCCESS_FIRST, 'alert-danger');
      expect(result).toBeFalsy();
      result = deliveryService.getStatusColor(DELIVERY_STATUS.FAILED_CCE, 'alert-warning');
      expect(result).toBeFalsy();
    });

    it('Should return TRUE if status is DELIVERY_STATUS.SUCCESS_SECOND and cssClass is "alert-success"', function() {
      var result = deliveryService.getStatusColor(DELIVERY_STATUS.SUCCESS_SECOND, 'alert-success');
      expect(result).toBeTruthy();
    });

    it('Should return false if status is DELIVERY_STATUS.SUCCESS_SECOND and cssClass is not "alert-success"', function() {
      var result = deliveryService.getStatusColor(DELIVERY_STATUS.SUCCESS_SECOND, 'alert-danger');
      expect(result).toBeFalsy();
      result = deliveryService.getStatusColor(DELIVERY_STATUS.FAILED_CCE, 'alert-warning');
      expect(result).toBeFalsy();
    });

    it('Should return TRUE if status is DELIVERY_STATUS.FAILED_CCE and cssClass is "alert-danger"', function() {
      var result = deliveryService.getStatusColor(DELIVERY_STATUS.FAILED_CCE, 'alert-danger');
      expect(result).toBeTruthy();
    });

    it('Should return false if status is DELIVERY_STATUS.FAILED_CCE and cssClass is not "alert-danger"', function() {
      var result = deliveryService.getStatusColor(DELIVERY_STATUS.FAILED_CCE, 'alert-warning');
      expect(result).toBeFalsy();
      result = deliveryService.getStatusColor(DELIVERY_STATUS.FAILED_CCE, 'alert-success');
      expect(result).toBeFalsy();
    });

    it('Should return TRUE if status is DELIVERY_STATUS.FAILED_STAFF and cssClass is "alert-danger"', function() {
      var result = deliveryService.getStatusColor(DELIVERY_STATUS.FAILED_STAFF, 'alert-danger');
      expect(result).toBeTruthy();
    });

    it('Should return false if status is DELIVERY_STATUS.FAILED_STAFF and cssClass is not "alert-danger"', function() {
      var result = deliveryService.getStatusColor(DELIVERY_STATUS.FAILED_STAFF, 'alert-warning');
      expect(result).toBeFalsy();
      result = deliveryService.getStatusColor(DELIVERY_STATUS.FAILED_STAFF, 'alert-success');
      expect(result).toBeFalsy();
    });

    it('Should return TRUE if status is DELIVERY_STATUS.FAILED_OTHER and cssClass is "alert-danger"', function() {
      var result = deliveryService.getStatusColor(DELIVERY_STATUS.FAILED_OTHER, 'alert-danger');
      expect(result).toBeTruthy();
    });

    it('Should return false if status is DELIVERY_STATUS.FAILED_OTHER and cssClass is not "alert-danger"', function() {
      var result = deliveryService.getStatusColor(DELIVERY_STATUS.FAILED_OTHER, 'alert-warning');
      expect(result).toBeFalsy();
      result = deliveryService.getStatusColor(DELIVERY_STATUS.FAILED_OTHER, 'alert-success');
      expect(result).toBeFalsy();
    });

    it('Should return TRUE if status is DELIVERY_STATUS.CANCELED_OTHER and cssClass is "alert-warning"', function() {
      var result = deliveryService.getStatusColor(DELIVERY_STATUS.CANCELED_OTHER, 'alert-warning');
      expect(result).toBeTruthy();
    });

    it('Should return false if status is DELIVERY_STATUS.CANCELED_OTHER and cssClass is not "alert-warning"', function() {
      var result = deliveryService.getStatusColor(DELIVERY_STATUS.CANCELED_OTHER, 'alert-danger');
      expect(result).toBeFalsy();
      result = deliveryService.getStatusColor(DELIVERY_STATUS.CANCELED_OTHER, 'alert-success');
      expect(result).toBeFalsy();
    });

    it('Should return TRUE if status is DELIVERY_STATUS.CANCELED_CCE and cssClass is "alert-warning"', function() {
      var result = deliveryService.getStatusColor(DELIVERY_STATUS.CANCELED_CCE, 'alert-warning');
      expect(result).toBeTruthy();
    });

    it('Should return false if status is DELIVERY_STATUS.CANCELED_CCE and cssClass is not "alert-warning"', function() {
      var result = deliveryService.getStatusColor(DELIVERY_STATUS.CANCELED_CCE, 'alert-danger');
      expect(result).toBeFalsy();
      result = deliveryService.getStatusColor(DELIVERY_STATUS.CANCELED_CCE, 'alert-success');
      expect(result).toBeFalsy();
    });

    it('Should return TRUE if status is DELIVERY_STATUS.CANCELED_STAFF and cssClass is "alert-warning"', function() {
      var result = deliveryService.getStatusColor(DELIVERY_STATUS.CANCELED_STAFF, 'alert-warning');
      expect(result).toBeTruthy();
    });

    it('Should return false if status is DELIVERY_STATUS.CANCELED_STAFF and cssClass is not "alert-warning"', function() {
      var result = deliveryService.getStatusColor(DELIVERY_STATUS.CANCELED_STAFF, 'alert-danger');
      expect(result).toBeFalsy();
      result = deliveryService.getStatusColor(DELIVERY_STATUS.CANCELED_STAFF, 'alert-success');
      expect(result).toBeFalsy();
    });

    it('Should convert to lower case before comparison', function(){
      var UPPER_CASE_STATUS = DELIVERY_STATUS.CANCELED_STAFF.toUpperCase();
      expect(UPPER_CASE_STATUS).not.toEqual(DELIVERY_STATUS.CANCELED_STAFF);
      var result = deliveryService.getStatusColor(UPPER_CASE_STATUS, 'alert-warning');
      expect(result).toBeTruthy();
    });

  });

});
