'use strict';
/*eslint-env jasmine */
/*global module: false, inject: false */

describe('FooterCtrl', function() {
  beforeEach(module('footer', 'footerCtrlMock'));

  var FooterCtrl;
  beforeEach(inject(function($controller) {
    FooterCtrl = $controller('FooterCtrl');
  }));

  it('should expose the current year', function() {
    var actual = FooterCtrl.year;
    expect(actual).toMatch(/^201/);
  });

  it('should expose config author', function() {
    var actual = FooterCtrl.author;
    expect(actual).toBe('ehealth');
  });
});
