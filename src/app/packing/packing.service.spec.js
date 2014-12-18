'use strict';
/*eslint-env jasmine */
/*global module: false, inject: false */

describe('packingService', function() {
  beforeEach(module('packing', 'packingServiceMock'));

  var $rootScope;
  var packingService;

  beforeEach(inject(function(_$rootScope_, _packingService_) {
    $rootScope = _$rootScope_;
    packingService = _packingService_;
  }));

  it('should return a count of packing lists for a driver', function(done) {
    var expected = [1];
    function response(actual) {
      expect(actual).toEqual(expected);
      done();
    }
    packingService.count()
      .then(response);
    $rootScope.$digest();
  });
});
