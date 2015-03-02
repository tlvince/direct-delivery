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

  describe('submit', function () {

    it('should call log.error if SignOffCtrl.isValidSignature() is True', function () {
      spyOn(SignOffCtrl, 'isValidSignature').and.returnValue(true);
      expect(SignOffCtrl.isValidSignature()).toBeTruthy();
      SignOffCtrl.submit();
      expect(log.error).toHaveBeenCalledWith('invalidSignature');
      expect(signOffService.signOff).not.toHaveBeenCalledWith();
    });

    it('Should call signOffService.signOff if SignOffCtrl.isValidSignature() is False', function () {
      spyOn(SignOffCtrl, 'isValidSignature').and.returnValue(false);
      expect(signOffService.signOff).not.toHaveBeenCalledWith();
      SignOffCtrl.submit();
      expect(signOffService.signOff).toHaveBeenCalled();
    });

  });

});
