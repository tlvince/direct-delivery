'use strict';
/*eslint-env jasmine */
/*global module: false, inject: false */

describe('couchdb', function() {
  beforeEach(module('couchdb', 'couchdbMock'));
  var couchdb;
  beforeEach(inject(function(_couchdb_) {
    couchdb = _couchdb_;
  }));
  it('should expose a view method', function() {
    expect(couchdb.view).toBeDefined();
  });
});
