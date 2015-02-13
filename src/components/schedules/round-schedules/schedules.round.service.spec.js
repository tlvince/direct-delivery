/**
 * Created by ehealthafrica on 2/13/15.
 */

describes('schedule round service', function(){

  var scheduleRoundService;

  beforeEach(function(){
    module('scheules.round');

    inject(function(_scheduleRoundService_, _dbService_, _pouchUtil_){
      scheduleRoundService = _scheduleRoundService_;
    })
  })

  it('should')
});