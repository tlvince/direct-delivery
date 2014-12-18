'use strict';
/*eslint-env jasmine */
/*global module: false, inject: false */

describe('couchUtil', function() {
  beforeEach(module('couchdb'));
  var couchUtil;
  beforeEach(inject(function(_couchUtil_) {
    couchUtil = _couchUtil_;
  }));

  it('should provide exclusive key sugar', function() {
    var key = 'driver1';
    var actual = couchUtil.key(key);
    var expected = {startkey: '"driver1"', endkey: '"driver1\ufff0"'};
    expect(actual).toEqual(expected);
  });
});
