/**
 * Created by ehealthafrica on 2/13/15.
 */

describe('schedule round service', function(){

  var scheduleRoundService, dbService, pouchUtil;

  beforeEach(module('schedules.round', 'db', 'utility.pouchdb'));

  beforeEach(inject(function(_scheduleRoundService_, _dbService_, _pouchUtil_){
    scheduleRoundService = _scheduleRoundService_;
    dbService = _dbService_;
    pouchUtil = _pouchUtil_;

    spyOn(dbService, 'getView').and.callThrough();
    spyOn(pouchUtil, 'pluckDocs').and.returnValue([{}]);
  }));

  it('should have get() method', function(){
    expect(scheduleRoundService.get).toBeDefined();

  });
  it('should call dbService.getView()', function(){
    scheduleRoundService.get();
    expect(dbService.getView).toHaveBeenCalled();
  });

  it('should have getSortedByDate() method', function(){
    expect(scheduleRoundService.getSortedByDate).toBeDefined();
  });

});