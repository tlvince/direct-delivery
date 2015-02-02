'use strict';
/*eslint-env jasmine */
/*global module: false, inject: false */

describe('couchUtil', function() {
  beforeEach(module('couchdb', 'couchUtilMock'));
  var couchUtil;
  var pluckResponseMock;
  beforeEach(inject(function(_couchUtil_, _pluckResponseMock_) {
    couchUtil = _couchUtil_;
    pluckResponseMock = _pluckResponseMock_;
  }));

  it('should provide exclusive key sugar', function() {
    var key = 'driver1';
    var actual = couchUtil.key(key);
    var expected = {startkey: 'driver1', endkey: 'driver1\ufff0'};
    expect(actual).toEqual(expected);
  });

  it('should provide a pluck IDs helper', function() {
    var actual = couchUtil.pluckIDs(pluckResponseMock);
    var expected = ['id1', 'id2'];
    expect(actual).toEqual(expected);
  });

  it('should provide a pluck values helper', function() {
    var actual = couchUtil.pluckValues(pluckResponseMock);
    var expected = ['value1', 'value2'];
    expect(actual).toEqual(expected);
  });

  it('should provide a pluck docs helper', function() {
    var actual = couchUtil.pluckDocs(pluckResponseMock);
    var expected = [{_id: 'doc1'}, {_id: 'doc2'}];
    expect(actual).toEqual(expected);
  });
});
