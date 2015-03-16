'use strict';
/*eslint-env jasmine */
/*global module: false, inject: false */

describe('CancelDeliveryCtrl', function () {

  beforeEach(module('delivery', 'deliveryMock', 'log'));

  var CancelDeliveryCtrl, deliveryService, scope, cancelDeliveryService,
    DELIVERY_STATUS, log;

  beforeEach(inject(function ($controller, _$state_, _dailyDeliveryMock_, _deliveryService_,
                              _log_, FACILITY_ID, _$rootScope_, _cancelDeliveryService_, _DELIVERY_STATUS_) {

    _$state_.params = {facilityId: FACILITY_ID};
    scope = _$rootScope_.$new();
    cancelDeliveryService = _cancelDeliveryService_;

    scope.facDevCtrl = $controller('FacilityDeliveryCtrl', {
      state: _$state_,
      deliveryService: _deliveryService_,
      dailyDelivery: _dailyDeliveryMock_,
      log: _log_
    });

    CancelDeliveryCtrl = $controller('CancelDeliveryCtrl', {
      state: _$state_,
      deliveryService: _deliveryService_,
      $scope: scope,
      log: _log_,
      dailyDelivery: _dailyDeliveryMock_,
      DELIVERY_STATUS: _DELIVERY_STATUS_
    });

    deliveryService = _deliveryService_;
    DELIVERY_STATUS = _DELIVERY_STATUS_;
    log = _log_;

    spyOn(CancelDeliveryCtrl, 'isOthersAndInvalid').and.callThrough();
    spyOn(log, 'error').and.callThrough();
    spyOn(cancelDeliveryService, 'validateCancelReport').and.callThrough();

  }));

  it('Should be defined', function() {
    expect(CancelDeliveryCtrl).toBeDefined();
  });

  it('facRnd should be defined', function () {
    expect(CancelDeliveryCtrl.facRnd).toBeDefined();
  });

  it('should expose facRnd facility object', function () {
    expect(CancelDeliveryCtrl.facRnd.facility).toBeDefined();
  });

  it('Should expose status that matches DELIVERY_STATUS constant', function() {
    expect(CancelDeliveryCtrl.status).toEqual(DELIVERY_STATUS);
  });

  describe('isSelected', function() {
    it('Should return FALSE if option does NOT EQUAL facility round status', function() {
      var testOption = DELIVERY_STATUS.CANCELED_CCE;
      expect(testOption).toBeDefined();
      expect(testOption).not.toEqual(CancelDeliveryCtrl.facRnd.status);
      expect(CancelDeliveryCtrl.isSelected(testOption)).toBeFalsy();
    });

    it('Should return TRUE if option equals facility round status', function() {
      var testOption = DELIVERY_STATUS.UPCOMING_FIRST;
      expect(testOption).toBeDefined();
      expect(testOption).toEqual(CancelDeliveryCtrl.facRnd.status);
      expect(CancelDeliveryCtrl.isSelected(testOption)).toBeTruthy()
    });
  });

  describe('isOthersAndInvalid', function() {
    it('Should return FALSE if facility round status is NOT CANCELED_OTHER or FAILED_OTHER', function(){
      var roundStatus = CancelDeliveryCtrl.facRnd.status;
      expect(roundStatus).not.toBe(DELIVERY_STATUS.CANCELED_OTHER);
      expect(roundStatus).not.toBe(DELIVERY_STATUS.FAILED_OTHER);
      var result = CancelDeliveryCtrl.isOthersAndInvalid();
      expect(result).toBeFalsy();
    });

    it('Should return FALSE if facility round status is "CANCELED_OTHER" and ' +
      ' cancel report note is NOT EMPTY string', function(){

        CancelDeliveryCtrl.facRnd.status = DELIVERY_STATUS.CANCELED_OTHER;
        CancelDeliveryCtrl.facRnd.cancelReport.note = 'test string';
        var result = CancelDeliveryCtrl.isOthersAndInvalid();
        expect(result).toBeFalsy();
    });

    it('Should return FALSE if facility round status is "FAILED_OTHER" and ' +
      ' cancel report note is NOT EMPTY string', function() {

        CancelDeliveryCtrl.facRnd.status = DELIVERY_STATUS.FAILED_OTHER;
        CancelDeliveryCtrl.facRnd.cancelReport.note = 'test string';
        var result = CancelDeliveryCtrl.isOthersAndInvalid();
        expect(result).toBeFalsy();
    });

    it('Should return TRUE if facility round status is "FAILED_OTHER" and ' +
        ' cancel report note is EMPTY string', function() {

          expect(CancelDeliveryCtrl.isOthersAndInvalid()).toBeFalsy();
          CancelDeliveryCtrl.facRnd.status = DELIVERY_STATUS.FAILED_OTHER;
          CancelDeliveryCtrl.facRnd.cancelReport.note = '';
          var result = CancelDeliveryCtrl.isOthersAndInvalid();
          expect(result).toBeTruthy();
    });

    it('Should return TRUE if facility round status is "CANCELED_OTHER" and ' +
      ' cancel report note is EMPTY string', function() {

        CancelDeliveryCtrl.facRnd.cancelReport.note = 'non empty';
        expect(CancelDeliveryCtrl.isOthersAndInvalid()).toBeFalsy();
        CancelDeliveryCtrl.facRnd.status = DELIVERY_STATUS.CANCELED_OTHER;
        CancelDeliveryCtrl.facRnd.cancelReport.note = '';
        var result = CancelDeliveryCtrl.isOthersAndInvalid();
        expect(result).toBeTruthy();
    });

  });

  describe('cancel', function() {
    it('Should call CancelDeliveryCtrl.isOthersAndInvalid()', function() {
      expect(CancelDeliveryCtrl.isOthersAndInvalid).not.toHaveBeenCalled();
      CancelDeliveryCtrl.cancel();
      expect(CancelDeliveryCtrl.isOthersAndInvalid).toHaveBeenCalled();
    });

    it('Should call log.error() if CancelDeliveryCtrl.isOthersAndInvalid() is true.', function() {
      expect(log.error).not.toHaveBeenCalled();
      expect(CancelDeliveryCtrl.isOthersAndInvalid()).toBeTruthy();
      CancelDeliveryCtrl.cancel();
      expect(log.error).toHaveBeenCalled();
    });

    it('Should NOT proceed if CancelDeliveryCtrl.isOthersAndInvalid() is TRUE.', function() {
      expect(log.error).not.toHaveBeenCalled();
      expect(CancelDeliveryCtrl.isOthersAndInvalid()).toBeTruthy();
      CancelDeliveryCtrl.cancel();
      expect(log.error).toHaveBeenCalled();
      expect(cancelDeliveryService.validateCancelReport).not.toHaveBeenCalled();
    });

    it('Should proceed further if CancelDeliveryCtrl.isOthersAndInvalid() is FALSE', function() {
      expect(cancelDeliveryService.validateCancelReport).not.toHaveBeenCalled();
      CancelDeliveryCtrl.facRnd.status = DELIVERY_STATUS.CANCELED_CCE;
      expect(CancelDeliveryCtrl.isOthersAndInvalid()).toBeFalsy();
      CancelDeliveryCtrl.cancel();
      expect(cancelDeliveryService.validateCancelReport).toHaveBeenCalled();
    });

  });

});
