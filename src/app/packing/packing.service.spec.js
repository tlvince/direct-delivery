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


  it('should return a list of packings by state', function(done) {
    function success(actual) {
      var expected = {
        packed: [
          'packeduuid'
        ],
        unpacked: [
          'unpackeduuid'
        ]
      };
      expect(actual).toEqual(expected);
    }

    packingService.all()
      .then(success)
      .finally(done);

    $rootScope.$digest();
  });
});
