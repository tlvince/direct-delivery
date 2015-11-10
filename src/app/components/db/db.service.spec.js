'use strict';

describe('dbService', function () {

  beforeEach(module('db'));

  var dbService;

  beforeEach(inject(function (_dbService_) {
    dbService = _dbService_;
  }));

  it('should expose local db', function () {
    expect(dbService.local).toBeDefined();
  });

  it('should expose get() function', function () {
    expect(dbService.get).toBeDefined();
  });

});
