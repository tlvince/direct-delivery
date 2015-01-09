'use strict';
/*eslint-env jasmine */
/*global module: false, inject: false */

describe('PackingAllCtrl', function() {
  beforeEach(module('packing.all', 'packingAllMock'));

  var PackingAllCtrl;

  beforeEach(inject(function($controller) {
    PackingAllCtrl = $controller('PackingAllCtrl');
  }));

  it('should expose a list of packing lists', function() {
    expect(PackingAllCtrl.packings).toBeDefined();
  });
});
