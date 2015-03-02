'use strict';

describe('signOffService', function () {

  var signOffService, dailyDelivery, deliveryService, signature;

  beforeEach(module('delivery', 'deliveryMock', 'db', 'log'));

  beforeEach(inject(function (_deliveryService_, dailyDeliveryMock,_signOffService_) {

    signOffService = _signOffService_;
    dailyDelivery = dailyDeliveryMock;
    deliveryService = _deliveryService_;
    signature = {
      dataUrl: 'signature mock',
      signedOn: new Date().toJSON()
    };

    spyOn(deliveryService, 'setSuccessStatus').and.callThrough();
    spyOn(deliveryService, 'updateFacilityRound').and.callThrough();
    spyOn(deliveryService, 'save').and.callThrough();

  }));

  describe('signOffService', function() {

    it('signOffService should be defined', function() {
      expect(signOffService).toBeDefined();
    });

  });

  describe('signOff', function() {

    it('should call deliveryService.setSuccessStatus', function(){
      expect(deliveryService.setSuccessStatus).not.toHaveBeenCalled();
      var facilityRound = dailyDelivery.facilityRounds[0];
      signOffService.signOff(dailyDelivery, facilityRound, signature);
      expect(deliveryService.setSuccessStatus).toHaveBeenCalled();
    });

    it('Should call deliveryService.updateFacilityRound', function(){
      expect(deliveryService.updateFacilityRound).not.toHaveBeenCalled();
      var facilityRound = dailyDelivery.facilityRounds[0];
      signOffService.signOff(dailyDelivery, facilityRound, signature);
      expect(deliveryService.setSuccessStatus).toHaveBeenCalled();
    });

    it('Should call deliveryService.save', function() {
      expect(deliveryService.save).not.toHaveBeenCalled();
      var facilityRound = dailyDelivery.facilityRounds[0];
      signOffService.signOff(dailyDelivery, facilityRound, signature);
      expect(deliveryService.save).toHaveBeenCalled();
    });

  });

});
