'use strict';
/*eslint-env jasmine */
/*global module: false, inject: false */

describe('DeliverItemsCtrl', function() {
  beforeEach(module('delivery'));

  var DeliverItemsCtrl;

  beforeEach(inject(function($controller, _$state_, _deliveryService_) {
    DeliverItemsCtrl = $controller('DeliverItemsCtrl', {
      state: _$state_,
      deliveryService: _deliveryService_
    });
  }));

  it('should expose calcDeliverQty()', function() {
    expect(DeliverItemsCtrl.calcDeliverQty).toBeDefined();
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
