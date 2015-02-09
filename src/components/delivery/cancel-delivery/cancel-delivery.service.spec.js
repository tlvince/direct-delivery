'use strict';

describe('cancelDeliveryService', function() {
  beforeEach(module('delivery', 'deliveryMock'));

  var cancelDeliveryService, cancelReport, deliveryStatus;

  beforeEach(inject(function(_cancelDeliveryService_, _dailyDeliveryMock_, _DELIVERY_STATUS_) {
    cancelDeliveryService = _cancelDeliveryService_;
    cancelReport = cancelDeliveryService.getDefaultCancelReport();
    deliveryStatus = _DELIVERY_STATUS_;
  }));

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

    var facRnd;

    beforeEach(inject(function(_dailyDeliveryMock_) {
      facRnd = _dailyDeliveryMock_.facilityRounds[0];
    }));

    afterEach(function(){
      facRnd.status = deliveryStatus.UPCOMING_FIRST;
    });

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

});
