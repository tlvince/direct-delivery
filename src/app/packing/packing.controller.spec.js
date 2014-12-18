'use strict';
/*eslint-env jasmine */
/*global module: false, inject: false */

describe('packingService', function() {
  beforeEach(module('packing', 'packingCtrlMock'));

  var PackingCtrl;

  beforeEach(inject(function($controller) {
    PackingCtrl = $controller('PackingCtrl');
  }));

  it('should expose a packing count', function() {
    expect(PackingCtrl.count).toBe(1);
  });
});
