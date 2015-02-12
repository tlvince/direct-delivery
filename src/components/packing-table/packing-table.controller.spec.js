'use strict';
/*eslint-env jasmine */
/*global module: false, inject: false */

describe('PackingTableCtrl', function() {
  beforeEach(module('packingTable', 'packingTableCtrlMock'));

  var PackingTableCtrl;
  beforeEach(inject(function($controller) {
    PackingTableCtrl = $controller('PackingTableCtrl');
  }));

  it('should expose the daily schedule date', function() {
    expect(PackingTableCtrl.date).toBe('2014');
  });
});
