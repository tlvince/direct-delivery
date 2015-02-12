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

  it('should expose whether the table is within a tab', function() {
    expect(PackingTableCtrl.tabbed).toBe(true);
  });

  it('should expose storage types as legends', function() {
    expect(PackingTableCtrl.legends).toEqual({});
  });

  it('should support caller-defined success state', function() {
    expect(PackingTableCtrl.nextState).toBe('home');
  });
});
