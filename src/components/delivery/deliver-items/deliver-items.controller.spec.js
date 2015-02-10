'use strict';
/*eslint-env jasmine */
/*global module: false, inject: false */

describe('DeliverItemsCtrl', function() {

  beforeEach(module('delivery', 'deliveryMock', 'log'));

  var DeliverItemsCtrl, deliveryService;

  beforeEach(inject(function($controller, _$state_, _dailyDeliveryMock_, _deliveryService_, _log_, FACILITY_ID) {

    _$state_.params = { facilityId: FACILITY_ID };

    var scope = {
      facDevCtrl: $controller('FacilityDeliveryCtrl', {
        state: _$state_,
        deliveryService: _deliveryService_,
        dailyDelivery: _dailyDeliveryMock_,
        log: _log_
      })
    };

    DeliverItemsCtrl = $controller('DeliverItemsCtrl', {
      state: _$state_,
      deliveryService: _deliveryService_,
      $scope: scope
    });

    deliveryService = _deliveryService_;

    spyOn(deliveryService, 'shouldHideSignOff').and.callThrough();
    spyOn(deliveryService, 'updateFacilityRound').and.callThrough();
    spyOn(deliveryService, 'save').and.callThrough();

  }));

  it('facRnd should be defined', function(){
    expect(DeliverItemsCtrl.facRnd).toBeDefined();
  });

  it('should expose calcDeliverQty()', function() {
    expect(DeliverItemsCtrl.calcDeliverQty).toBeDefined();
  });

  it('should expose facRnd', function(){
    expect(DeliverItemsCtrl.facRnd.facility).toBeDefined();
  });

  describe('togglePreview()', function(){
    it('should toggle DeliverItemsCtrl.previewDelivery', function(){
      var before = DeliverItemsCtrl.previewDelivery;
      DeliverItemsCtrl.togglePreview();
      var after = DeliverItemsCtrl.previewDelivery;
      expect(before).not.toBe(after)
    });

  });

  describe('shouldHideSignOff()', function(){

    it('Should call deliveryService.shouldHideSignOff with expected parameter', function(){
      expect(deliveryService.shouldHideSignOff).not.toHaveBeenCalled();
      DeliverItemsCtrl.shouldHideSignOff();
      expect(deliveryService.shouldHideSignOff).toHaveBeenCalledWith(DeliverItemsCtrl.facRnd);
    });

  });

  describe('submit()', function(){

    it('Should call deliveryService.updateFacilityRound', function(){
      expect(deliveryService.updateFacilityRound).not.toHaveBeenCalled();
      DeliverItemsCtrl.submit();
      expect(deliveryService.updateFacilityRound)
        .toHaveBeenCalledWith(DeliverItemsCtrl.dailyDelivery, DeliverItemsCtrl.facRnd);
    });

    it('Should call deliveryService.save()', function(){
      expect(deliveryService.save).not.toHaveBeenCalled();
      DeliverItemsCtrl.submit();
      expect(deliveryService.save).toHaveBeenCalled();
    });

  });

});
