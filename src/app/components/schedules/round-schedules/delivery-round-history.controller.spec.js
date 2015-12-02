'use strict';
/*eslint-env jasmine */
/*global module: false, inject: false */

describe('DeliveryRoundHistoryCtrl', function() {
  beforeEach(module('schedules', 'schedules.round', 'deliveryMock', 'delivery', 'utility'));

  var DeliveryRoundHistoryCtrl;
  var facilityRound;
  var $state;

  beforeEach(inject(function($controller, _dailyDeliveryMock_, _$state_) {

    facilityRound = angular.copy(_dailyDeliveryMock_[0]);
    $state = _$state_;
    $state.params.roundId = _dailyDeliveryMock_.deliveryRoundID;


    DeliveryRoundHistoryCtrl = $controller('DeliveryRoundHistoryCtrl', {
      facilityRound: facilityRound,
      $state: $state
    });

  }));

  it('SchedulesRoundCtrl should be defined', function(){
    expect(DeliveryRoundHistoryCtrl).toBeDefined();
  });

  it('Should facRnd property equal to injected facilityRound', function() {
    var result = DeliveryRoundHistoryCtrl.facRnd;
    expect(result).toEqual(facilityRound);
  });

  it('Should have roundId set to $state.params.roundId', function() {
    var result = DeliveryRoundHistoryCtrl.roundId;
    expect(result).toBe($state.params.roundId);
  });

  describe('receivedStockBtwDelivery', function() {

    it('Should return false', function() {
      var index = 0;
      var packedProduct = DeliveryRoundHistoryCtrl.facRnd.packedProduct[index];
      expect(packedProduct.receivedInterimStock).toBeFalsy();
      var result = DeliveryRoundHistoryCtrl.receivedStockBtwDelivery(index);
      expect(result).toBeFalsy();
    });

    it('Should return true', function() {
      var index = 0;
      var packedProduct = DeliveryRoundHistoryCtrl.facRnd.packedProduct[index];
      packedProduct.receivedInterimStock = true;
      expect(packedProduct.receivedInterimStock).toBeTruthy();
      var result = DeliveryRoundHistoryCtrl.receivedStockBtwDelivery(index);
      expect(result).toBeTruthy();
    });

  });

});
