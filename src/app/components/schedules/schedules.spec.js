/**
 * Created by ehealthafrica on 12/18/14.
 */


describe('unit: scheduleService', function(){

  var AuthService,
      dbService,
      pouchUtil,
      utility,
      scheduleService;

  beforeEach(module('schedules', 'core', 'utility', 'utility.pouchdb'));

  beforeEach(inject(function(_scheduleService_, _AuthService_, _dbService_, _pouchUtil_, _utility_){

    AuthService = _AuthService_;
    dbService = _dbService_;
    pouchUtil = _pouchUtil_;
    utility = _utility_;
    scheduleService = _scheduleService_;


    spyOn(dbService, 'getView').and.callThrough();
    spyOn(pouchUtil, 'pluckDocs').and.returnValue([{}]);
    spyOn(pouchUtil, 'rejectIfEmpty').and.callThrough();
    spyOn(utility, 'first').and.returnValue({});
    spyOn(utility, 'formatDate').and.callThrough();
    spyOn(pouchUtil, 'key').and. callThrough();
  }));

  it('should have get method', function(){
    expect(scheduleService.get).toBeDefined();
  });

  it('should have getDaySchedule', function(){
    expect(scheduleService.getDaySchedule).toBeDefined();
  });

  it('should have getByRound method', function(){
    expect(scheduleService.getByRound).toBeDefined();
  });

  describe('AuthService', function(){

    it('should be defined', function(){
      expect(AuthService).toBeDefined();
    });

    it('should have currentUser prop', function(){
      expect(AuthService.currentUser).toBeDefined();
    });
  });

  describe('schedule.get() ', function(){

    beforeEach(function(){
      scheduleService.get('viewName', 'key');
    });

    it('should call pouchUtil.key', function(){
      expect(pouchUtil.key).toHaveBeenCalled()
    });

    it('should have called dbService.getView', function(){
      expect(dbService.getView).toHaveBeenCalled();
    })
  });

  describe('scheduleService.getDaySchedule', function(){

    beforeEach(function(){
      //;
    })
    it('should call utility.formatDate', function(){
      expect(utility.formatDate).not.toHaveBeenCalled();
      scheduleService.getDaySchedule('abdullahi.ahmed@example.com', '2015-02-17');
      expect(utility.formatDate).toHaveBeenCalled();
    });

  });
});
