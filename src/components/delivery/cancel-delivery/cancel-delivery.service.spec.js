'use strict';

describe('cancelDeliveryService', function() {
  beforeEach(module('delivery', 'deliveryMock'));

  var cancelDeliveryService, cancelReport, deliveryStatus;
  var facRnd;

  beforeEach(inject(function(_cancelDeliveryService_, _dailyDeliveryMock_, _DELIVERY_STATUS_) {
    cancelDeliveryService = _cancelDeliveryService_;
    cancelReport = cancelDeliveryService.getDefaultCancelReport();
    deliveryStatus = _DELIVERY_STATUS_;
    facRnd = _dailyDeliveryMock_.facilityRounds[0];
  }));


  afterEach(function(){
    facRnd.status = deliveryStatus.UPCOMING_FIRST;
  });

  it('should create and return default cancel report', function() {
    var cancelReport = cancelDeliveryService.getDefaultCancelReport();
    expect(cancelReport).toBeDefined();
  });

  describe('getDefaultCancelReport()', function(){
    it('should return object with "canceledOn" defined.', function(){
      expect(cancelReport.canceledOn).toBeDefined();
    });

    it('should return object with "note" set to empty string.', function(){
      expect(cancelReport.note).toBe('');
    });
  });

  describe('validateCancelReport()', function(){

    it('Should return TRUE if status equals DELIVERY_STATUS.FAILED_CCE', function(){
      expect(cancelDeliveryService.validateCancelReport(facRnd)).toBeFalsy();
      facRnd.status = deliveryStatus.FAILED_CCE;
      expect(cancelDeliveryService.validateCancelReport(facRnd)).toBeTruthy();
    });


    it('Should return TRUE if status equals DELIVERY_STATUS.CANCELED_CCE', function(){
      expect(cancelDeliveryService.validateCancelReport(facRnd)).toBeFalsy();
      facRnd.status = deliveryStatus.CANCELED_CCE;
      expect(cancelDeliveryService.validateCancelReport(facRnd)).toBeTruthy();
    });

    it('Should return TRUE if status equals DELIVERY_STATUS.CANCELED_OTHER', function(){
      expect(cancelDeliveryService.validateCancelReport(facRnd)).toBeFalsy();
      facRnd.status = deliveryStatus.CANCELED_OTHER;
      expect(cancelDeliveryService.validateCancelReport(facRnd)).toBeTruthy();
    });

    it('Should return TRUE if status equals DELIVERY_STATUS.FAILED_OTHER', function(){
      expect(cancelDeliveryService.validateCancelReport(facRnd)).toBeFalsy();
      facRnd.status = deliveryStatus.FAILED_OTHER;
      expect(cancelDeliveryService.validateCancelReport(facRnd)).toBeTruthy();
    });

    it('Should return TRUE if status equals DELIVERY_STATUS.FAILED_STAFF', function(){
      expect(cancelDeliveryService.validateCancelReport(facRnd)).toBeFalsy();
      facRnd.status = deliveryStatus.FAILED_STAFF;
      expect(cancelDeliveryService.validateCancelReport(facRnd)).toBeTruthy();
    });

    it('Should return TRUE if status equals DELIVERY_STATUS.CANCELED_STAFF', function(){
      expect(cancelDeliveryService.validateCancelReport(facRnd)).toBeFalsy();
      facRnd.status = deliveryStatus.CANCELED_STAFF;
      expect(cancelDeliveryService.validateCancelReport(facRnd)).toBeTruthy();
    });

    it('Should return FALSE if status equals DELIVERY_STATUS.UPCOMING_FIRST', function(){
      facRnd.status = deliveryStatus.CANCELED_CCE;
      expect(cancelDeliveryService.validateCancelReport(facRnd)).toBeTruthy();
      facRnd.status = deliveryStatus.UPCOMING_FIRST;
      expect(cancelDeliveryService.validateCancelReport(facRnd)).toBeFalsy();
    });

    it('Should return FALSE if status equals DELIVERY_STATUS.UPCOMING_SECOND', function(){
      facRnd.status = deliveryStatus.CANCELED_CCE;
      expect(cancelDeliveryService.validateCancelReport(facRnd)).toBeTruthy();
      facRnd.status = deliveryStatus.UPCOMING_SECOND;
      expect(cancelDeliveryService.validateCancelReport(facRnd)).toBeFalsy();
    });

    it('Should return FALSE if status equals DELIVERY_STATUS.SUCCESS_FIRST', function(){
      facRnd.status = deliveryStatus.CANCELED_CCE;
      expect(cancelDeliveryService.validateCancelReport(facRnd)).toBeTruthy();
      facRnd.status = deliveryStatus.SUCCESS_FIRST;
      expect(cancelDeliveryService.validateCancelReport(facRnd)).toBeFalsy();
    });

    it('Should return FALSE if status equals DELIVERY_STATUS.SUCCESS_SECOND', function(){
      facRnd.status = deliveryStatus.CANCELED_CCE;
      expect(cancelDeliveryService.validateCancelReport(facRnd)).toBeTruthy();
      facRnd.status = deliveryStatus.SUCCESS_SECOND;
      expect(cancelDeliveryService.validateCancelReport(facRnd)).toBeFalsy();
    });

  });

  describe('isOthers', function(){

    it('Should return True if status equals DELIVERY_STATUS.FAILED_OTHER', function(){
      expect(cancelDeliveryService.isOthers(facRnd)).toBeFalsy();
      facRnd.status = deliveryStatus.FAILED_OTHER;
      expect(cancelDeliveryService.isOthers(facRnd)).toBeTruthy();
    });

    it('Should return True if status equals DELIVERY_STATUS.CANCELED_OTHER', function() {
      expect(cancelDeliveryService.isOthers(facRnd)).toBeFalsy();
      facRnd.status = deliveryStatus.CANCELED_OTHER;
      expect(cancelDeliveryService.isOthers(facRnd)).toBeTruthy();
    });

    it('Should return False if status is SUCCESS_FIRST', function(){
      facRnd.status = deliveryStatus.CANCELED_OTHER;
      expect(cancelDeliveryService.isOthers(facRnd)).toBeTruthy();
      facRnd.status = deliveryStatus.SUCCESS_FIRST;
      expect(cancelDeliveryService.isOthers(facRnd)).toBeFalsy();
    });

    it('Should return False if status is SUCCESS_SECOND', function(){
      facRnd.status = deliveryStatus.CANCELED_OTHER;
      expect(cancelDeliveryService.isOthers(facRnd)).toBeTruthy();
      facRnd.status = deliveryStatus.SUCCESS_SECOND;
      expect(cancelDeliveryService.isOthers(facRnd)).toBeFalsy();
    });

    it('Should return False if status is UPCOMING_FIRST', function(){
      facRnd.status = deliveryStatus.CANCELED_OTHER;
      expect(cancelDeliveryService.isOthers(facRnd)).toBeTruthy();
      facRnd.status = deliveryStatus.UPCOMING_FIRST;
      expect(cancelDeliveryService.isOthers(facRnd)).toBeFalsy();
    });

    it('Should return False if status is UPCOMING_SECOND', function(){
      facRnd.status = deliveryStatus.CANCELED_OTHER;
      expect(cancelDeliveryService.isOthers(facRnd)).toBeTruthy();
      facRnd.status = deliveryStatus.UPCOMING_SECOND;
      expect(cancelDeliveryService.isOthers(facRnd)).toBeFalsy();
    });

    it('Should return False if status is CANCELED_STAFF', function(){
      facRnd.status = deliveryStatus.CANCELED_OTHER;
      expect(cancelDeliveryService.isOthers(facRnd)).toBeTruthy();
      facRnd.status = deliveryStatus.CANCELED_STAFF;
      expect(cancelDeliveryService.isOthers(facRnd)).toBeFalsy();
    });

    it('Should return False if status is FAILED_STAFF', function(){
      facRnd.status = deliveryStatus.CANCELED_OTHER;
      expect(cancelDeliveryService.isOthers(facRnd)).toBeTruthy();
      facRnd.status = deliveryStatus.FAILED_STAFF;
      expect(cancelDeliveryService.isOthers(facRnd)).toBeFalsy();
    });

    it('Should return False if status is FAILED_CCE', function(){
      facRnd.status = deliveryStatus.CANCELED_OTHER;
      expect(cancelDeliveryService.isOthers(facRnd)).toBeTruthy();
      facRnd.status = deliveryStatus.FAILED_CCE;
      expect(cancelDeliveryService.isOthers(facRnd)).toBeFalsy();
    });

    it('Should return False if status is CANCELED_CCE', function(){
      facRnd.status = deliveryStatus.CANCELED_OTHER;
      expect(cancelDeliveryService.isOthers(facRnd)).toBeTruthy();
      facRnd.status = deliveryStatus.CANCELED_CCE;
      expect(cancelDeliveryService.isOthers(facRnd)).toBeFalsy();
    });

  });

  describe('isValidOthers', function(){

    it('Should return True if isOthers() is True and cancelReport.note is not empty string', function(){
      expect(cancelDeliveryService.isValidOthers(facRnd)).toBeFalsy();
      facRnd.cancelReport.note = 'test comment';
      facRnd.status = deliveryStatus.FAILED_OTHER;
      expect(cancelDeliveryService.isOthers(facRnd)).toBeTruthy();
      expect(cancelDeliveryService.isValidOthers(facRnd)).toBeTruthy();
    });

    it('Should return False if isOthers()  is true and cancelReport.note is EMPTY string', function(){
      expect(cancelDeliveryService.isValidOthers(facRnd)).toBeFalsy();
      facRnd.cancelReport.note = '';
      facRnd.status = deliveryStatus.FAILED_OTHER;
      expect(cancelDeliveryService.isOthers(facRnd)).toBeTruthy();
      expect(cancelDeliveryService.isValidOthers(facRnd)).toBeFalsy();
    });

    it('Should return False if isOthers()  is False and cancelReport.note is EMPTY string', function(){
      expect(cancelDeliveryService.isValidOthers(facRnd)).toBeFalsy();
      facRnd.cancelReport.note = '';
      facRnd.status = deliveryStatus.FAILED_CCE;
      expect(cancelDeliveryService.isOthers(facRnd)).toBeFalsy();
      expect(cancelDeliveryService.isValidOthers(facRnd)).toBeFalsy();
    });

    it('Should return False if isOthers()  is False and cancelReport.note is NOT EMPTY string', function(){
      expect(cancelDeliveryService.isValidOthers(facRnd)).toBeFalsy();
      facRnd.cancelReport.note = 'test comment';
      facRnd.status = deliveryStatus.FAILED_CCE;
      expect(cancelDeliveryService.isOthers(facRnd)).toBeFalsy();
      expect(cancelDeliveryService.isValidOthers(facRnd)).toBeFalsy();
    });

  });

});
