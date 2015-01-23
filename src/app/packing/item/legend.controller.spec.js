'use strict';
/*eslint-env jasmine */
/*global module: false, inject: false */

describe('PackingItemLegendCtrl', function() {
  beforeEach(module('packing.item', 'packingItemLegendMock'));

  var packingItemLegendCtrl;
  beforeEach(inject(function($controller) {
    packingItemLegendCtrl = $controller('PackingItemLegendCtrl');
  }));

  it('should expose a list of product storage legends', function() {
    expect(angular.isArray(packingItemLegendCtrl.legends)).toBe(true);
  });
});
