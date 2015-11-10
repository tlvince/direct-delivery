'use strict';
/*eslint-env jasmine */
/*global module: false, inject: false */

describe('pouchUtil', function() {
  beforeEach(module('utility.pouchdb', 'pouchUtilMock'));
  var pouchUtil;
  var pluckResponseMock;
  beforeEach(inject(function(_pouchUtil_, _pluckResponseMock_) {
    pouchUtil = _pouchUtil_;
    pluckResponseMock = _pluckResponseMock_;
  }));

  it('should provide exclusive key sugar', function() {
    var key = 'driver1';
    var actual = pouchUtil.key(key);
    var expected = {startkey: 'driver1', endkey: 'driver1\ufff0'};
    expect(actual).toEqual(expected);
  });

  it('should provide a pluck IDs helper', function() {
    var actual = pouchUtil.pluckIDs(pluckResponseMock);
    var expected = ['id1', 'id2'];
    expect(actual).toEqual(expected);
  });

  it('should provide a pluck values helper', function() {
    var actual = pouchUtil.pluckValues(pluckResponseMock);
    var expected = ['value1', 'value2'];
    expect(actual).toEqual(expected);
  });

  it('should provide a pluck docs helper', function() {
    var actual = pouchUtil.pluckDocs(pluckResponseMock);
    var expected = [{_id: 'doc1'}, {_id: 'doc2'}];
    expect(actual).toEqual(expected);
  });
});
