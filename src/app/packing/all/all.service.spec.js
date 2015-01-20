'use strict';
/*eslint-env jasmine */
/*global module: false, inject: false */

describe('packingAllService', function() {
  beforeEach(module('packing.all', 'packingAllServiceMock'));

  var $rootScope;
  var packingAllService;
  beforeEach(inject(function(_$rootScope_, _packingAllService_) {
    $rootScope = _$rootScope_;
    packingAllService = _packingAllService_;
  }));


  it('should return a list of packings by state', function(done) {
    function success(actual) {
      var expected = [
        {
          id: 'packeduuid',
          packed: true,
          date: '2015-01-20'
        },
        {
          id: 'unpackeduuid',
          date: '2015-01-20'
        }
      ];
      expect(actual).toEqual(expected);
    }

    packingAllService.all()
      .then(success)
      .finally(done);

    $rootScope.$digest();
  });
});
