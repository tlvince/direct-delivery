'use strict';

describe('utility', function(){

  beforeEach(module('utility', 'config'));

  var utility, dateFormat;
  beforeEach(inject(function(_utility_){
    utility = _utility_;
    dateFormat = 'yyyy-MM-dd'
  }));

  it('should format date', function(){
    var date = "2015-01-22T09:38:50.556Z";
    var expected = "2015-01-22";
    var res = utility.formatDate(date, dateFormat);
    expect(res).toBe(expected);
  });

});
