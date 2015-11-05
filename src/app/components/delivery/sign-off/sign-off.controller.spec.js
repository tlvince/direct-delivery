'use strict';
/*eslint-env jasmine */
/*global module: false, inject: false */

describe('SignOffCtrl', function () {

  beforeEach(module('delivery', 'deliveryMock', 'log'));

  var SignOffCtrl, deliveryService, signOffService, log;

  beforeEach(inject(function ($controller, _$state_, _dailyDeliveryMock_, _deliveryService_,
                              _log_, FACILITY_ID, _signOffService_) {

    _$state_.params = {facilityId: FACILITY_ID};

    var scope = {
      facDevCtrl: $controller('FacilityDeliveryCtrl', {
        state: _$state_,
        deliveryService: _deliveryService_,
        dailyDelivery: _dailyDeliveryMock_,
        log: _log_
      })
    };

    SignOffCtrl = $controller('SignOffCtrl', {
      state: _$state_,
      deliveryService: _deliveryService_,
      dailyDelivery: _dailyDeliveryMock_,
      $scope: scope,
      log: _log_
    });

    deliveryService = _deliveryService_;
    signOffService = _signOffService_;
    log = _log_;

    spyOn(signOffService, 'signOff').and.callThrough();
    spyOn(log, 'error').and.callThrough();

  }));

  it('Should be defined', function () {
    expect(SignOffCtrl).toBeDefined();
  });

  it('Should set facRnd.receivedBy to facility contact person by default if not set', function(){
    expect(SignOffCtrl.facRnd.receivedBy).toEqual(SignOffCtrl.facRnd.facility.contact);
  });

  it('Should not update facRnd.facility.contact if facRnd.receivedBy is updated', function(){
    expect(SignOffCtrl.facRnd.receivedBy).toEqual(SignOffCtrl.facRnd.facility.contact);
    SignOffCtrl.facRnd.receivedBy = 'new hf name';
    expect(SignOffCtrl.facRnd.receivedBy).not.toEqual(SignOffCtrl.facRnd.facility.contact);
  });


  describe('submit', function () {

    it('should call log.error if facility.receivedBy is invalid', function () {
      SignOffCtrl.facRnd.receivedBy = '';
      var isValid = SignOffCtrl.facRnd.receivedBy !== '';
      expect(isValid).toBeFalsy();
      SignOffCtrl.submit(isValid);
      expect(log.error).toHaveBeenCalledWith('enterRecipientName');
    });

    it('Should not call log.error if facility.receivedBy is valid', function(){
      var isValid = SignOffCtrl.facRnd.receivedBy.length > 0;
      expect(isValid).toBeTruthy();
      SignOffCtrl.submit();
      expect(log.error).not.toHaveBeenCalledWith('enterRecipientName');
    });

    it('Should call signOffService.signOff if SignOffCtrl.isValidSignature() is False', function () {
      spyOn(SignOffCtrl, 'isValidSignature').and.returnValue(false);
      expect(signOffService.signOff).not.toHaveBeenCalledWith();
      SignOffCtrl.submit();
      expect(signOffService.signOff).toHaveBeenCalled();
    });

    it('Should not call signOffService.signOff if signature has not been signed.', function(){
      spyOn(SignOffCtrl, 'isValidSignature').and.returnValue(true);
      expect(SignOffCtrl.isValidSignature()).toBeTruthy();
      SignOffCtrl.submit();
      expect(log.error).toHaveBeenCalledWith('invalidSignature');
      expect(signOffService.signOff).not.toHaveBeenCalledWith();
    });

  });

});
