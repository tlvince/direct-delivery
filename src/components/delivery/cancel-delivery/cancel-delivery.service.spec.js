'use strict';

describe('cancelDeliveryService', function() {
  beforeEach(module('delivery'));

  var cancelDeliveryService;
  var cancelReport;
  beforeEach(inject(function(_cancelDeliveryService_) {
    cancelDeliveryService = _cancelDeliveryService_;
    cancelReport = cancelDeliveryService.getDefaultCancelReport();
  }));

  it('should create and return default cancel report', function() {
    var cancelReport = cancelDeliveryService.getDefaultCancelReport();
    expect(cancelReport).toBeDefined();
  });

  describe('getDefaultCancelReport()', function(){
    it('should return object with "hfNotAvailable" set to FALSE.', function(){
      expect(cancelReport.hfNotAvailable).toBeFalsy();
    });

    it('should return object with "cancelledAhead" set to FALSE.', function(){
      expect(cancelReport.cancelledAhead).toBeFalsy();
    });

    it('should return object with "others" set to FALSE.', function(){
      expect(cancelReport.others).toBeFalsy();
    });

    it('should return object with "brokenCCE" set to FALSE.', function(){
      expect(cancelReport.brokenCCE).toBeFalsy();
    });

    it('should return object with "noCCE" set to FALSE.', function(){
      expect(cancelReport.noCCE).toBeFalsy();
    });

    it('should return object with "note" set to empty string.', function(){
      expect(cancelReport.note).toBe('');
    });
  });

  describe('validateCancelReport()', function(){

    it('should return true if cancelReport is valid i.e either cancelledAhead or ' +
    '(noCCE, others, hfNotAvailable and/or brokenCCE) is set to true.', function(){
      var cr = cancelDeliveryService.getDefaultCancelReport();
      var res = cancelDeliveryService.validateCancelReport(cr);
      expect(res).not.toBeTruthy();
      cr.cancelledAhead = true;
      res = cancelDeliveryService.validateCancelReport(cr);
      expect(res).toBeTruthy();
    });

    it('should return FALSE if no status is set to true.', function(){
      var cr = cancelDeliveryService.getDefaultCancelReport();
      var res = cancelDeliveryService.validateCancelReport(cr);
      expect(res).toBeFalsy();
    });

    it('should return TRUE, if cancelledAhead is set to TRUE and another status property is set to TRUE',
      function(){
        var cr = cancelDeliveryService.getDefaultCancelReport();
        var res = cancelDeliveryService.validateCancelReport(cr);
        expect(res).not.toBeTruthy();
        cr.cancelledAhead = true;
        cr.noCCE = true;
        res = cancelDeliveryService.validateCancelReport(cr);
        expect(res).toBeTruthy();
      });

  });

});
