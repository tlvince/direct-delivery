'use strict';
/*eslint-env jasmine */
/*global module: false, inject: false */

describe('DeliverItemsCtrl', function() {
  beforeEach(module('delivery', 'deliveryMock', 'log'));

  var DeliverItemsCtrl;

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

  }));

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


});
