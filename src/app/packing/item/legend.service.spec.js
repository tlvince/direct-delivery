'use strict';
/*eslint-env jasmine */
/*global module: false, inject: false */

describe('packingItemLegendService', function() {
  describe('normal response', function() {
    beforeEach(module('packing.item', 'packingItemLegendServiceMock'));

    var packingItemLegendService;
    beforeEach(inject(function(_packingItemLegendService_) {
      packingItemLegendService = _packingItemLegendService_;
    }));

    it('should return a formatted list of storage legends', function() {
      var actual = packingItemLegendService.get();
      var expected = [
        {
          id: 'product-storage/dry',
          label: 'label',
          description: 'description',
          bsClass: 'label-active'
        }
      ];
      expect(actual).toEqual(expected);
    });
  });
});
