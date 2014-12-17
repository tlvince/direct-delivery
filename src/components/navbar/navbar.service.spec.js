'use strict';
/*eslint-env jasmine */
/*global module: false, inject: false */

describe('navbarService', function() {
  beforeEach(module('navbar', 'navbarMock'));

  var navbarService;

  beforeEach(inject(function(_navbarService_) {
    navbarService = _navbarService_;
  }));

  it('should not include child states', function() {
    var items = navbarService.get();
    expect(items.length).toEqual(1);
  });
});
