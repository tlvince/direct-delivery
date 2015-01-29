'use strict';

describe('coreService', function(){

  var coreService, $rootScope, syncService, utility;
  var toDB = 'test';
  var fromDB = 'http://localhost:5984/deliveries';
  var designDocs = ["_design/delivery-rounds", "_design/daily-deliveries"];

  beforeEach(module('core', 'log', 'sync', 'utility'));

  beforeEach(inject(function(_coreService_, _$rootScope_, _syncService_, _utility_){
    coreService = _coreService_;
    $rootScope = _$rootScope_;
    syncService = _syncService_;
    utility = _utility_;
    spyOn(syncService, 'replicateByIds').and.callThrough();
  }));

  it('coreService should be defined', function(){
    expect(coreService).toBeDefined();
  });

  it('Should expose getSyncInProgress() as a function', function(){
    expect(angular.isFunction(coreService.getSyncInProgress)).toBeTruthy();
  });

  describe('hasCompleteDesignDocs', function(){
    it('Should be a function', function(){
      expect(angular.isFunction(coreService.hasCompleteDesignDocs)).toBeTruthy();
    });
  });

  describe('completeSync', function(){

    it('Should turn syncInProgress to True if called.', function(){
      expect(coreService.getSyncInProgress()).toBeFalsy();
      coreService.completeSync('test@yahoo.com', new Date());
      expect(coreService.getSyncInProgress()).toBeTruthy();
    });

    it('Should call syncService.replicateByIds() with expected parameters', function(){
      expect(syncService.replicateByIds).not.toHaveBeenCalled();
      coreService.completeSync('test@test.com', new Date());
      expect(syncService.replicateByIds).toHaveBeenCalledWith(toDB, fromDB, designDocs);
    });
  });

  describe('startSyncAfterLogin', function(){
    it('Should call addCompleteSyncListeners()', function(){
      spyOn(coreService, 'addCompleteSyncListeners').and.callThrough();
      expect(coreService.addCompleteSyncListeners).not.toHaveBeenCalled();
      coreService.startSyncAfterLogin('test@email.com');
      expect(coreService.addCompleteSyncListeners).toHaveBeenCalled();
    });

    it('Should call completeSync() with correct parameters', function(){
      var expectedDate = utility.formatDate(new Date());
      var driverId = 'test@email.com';
      spyOn(coreService, 'completeSync').and.callThrough();
      expect(coreService.completeSync).not.toHaveBeenCalled();
      coreService.startSyncAfterLogin(driverId);
      expect(coreService.completeSync).toHaveBeenCalledWith(driverId, expectedDate);
    });
  });

});