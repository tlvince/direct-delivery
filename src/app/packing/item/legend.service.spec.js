'use strict';
/*eslint-env jasmine */
/*global module: false, inject: false */

describe('packingItemLegendService', function() {
  beforeEach(module('packing.item'));
  it('should return a formatted list of storage legends', function() {
    function test(packingItemLegendService) {
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
    }

    module('productStorageMockExpected', 'packingItemLegendServiceMock');
    inject(test);
  });

  it('should handle malformed product storage responses', function() {
    function test(packingItemLegendService) {
      var actual = packingItemLegendService.get();
      var expected = [
        {
          id: undefined,
          label: undefined,
          description: undefined,
          bsClass: ''
        }
      ];
      expect(actual).toEqual(expected);
    }

    module('productStorageMockUnexpected', 'packingItemLegendServiceMock');
    inject(test);
  });
});
