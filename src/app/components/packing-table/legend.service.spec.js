'use strict';
/*eslint-env jasmine */
/*global module: false, inject: false */

describe('packingTableLegendService', function() {
  beforeEach(module('packingTable'));
  it('should return a formatted list of storage legends', function() {
    function test(packingTableLegendService) {
      var actual = packingTableLegendService.get();
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

    module('productStorageMockExpected', 'packingTableLegendServiceMock');
    inject(test);
  });

  it('should handle malformed product storage responses', function() {
    function test(packingTableLegendService) {
      var actual = packingTableLegendService.get();
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

    module('productStorageMockUnexpected', 'packingTableLegendServiceMock');
    inject(test);
  });
});
