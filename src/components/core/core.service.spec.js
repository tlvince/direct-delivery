'use strict';
/*eslint-env jasmine */
/*global module: false, inject: false */

describe('coreService', function(){

  var coreService, syncService, utility, dbService;
  var toDB = 'deliveries';
  var fromDB = 'http://localhost:5984/deliveries';
  var designDocs =  [
    '_design/delivery-rounds',
    '_design/daily-deliveries',
    '_design/product-storages',
    '_design/replication',
    '_design/kpi',
    '_design/product-storages',
    '_design/docs'
  ];

  beforeEach(module('core', 'log', 'sync', 'utility', 'schedules', 'auth'));

  beforeEach(inject(function(_coreService_, _syncService_, _utility_, _dbService_){
    coreService = _coreService_;
    syncService = _syncService_;
    utility = _utility_;
    dbService = _dbService_;
    spyOn(syncService, 'replicateByIds').and.callThrough();
    spyOn(dbService, 'deleteAfter').and.callThrough();
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

  describe('replicateFromBy', function(){

    it('Should turn syncInProgress to True if called.', function(){
      expect(coreService.getSyncInProgress()).toBeFalsy();
      coreService.replicateFromBy('test@yahoo.com', new Date());
      expect(coreService.getSyncInProgress()).toBeTruthy();
    });

    it('Should call syncService.replicateByIds() with expected parameters', function(){
      expect(syncService.replicateByIds).not.toHaveBeenCalled();
      coreService.replicateFromBy('test@test.com', new Date());
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

    it('Should call replicateFromBy() with correct parameters', function(){
      var expectedDate = utility.formatDate(new Date());
      var driverId = 'test@email.com';
      spyOn(coreService, 'replicateFromBy').and.callThrough();
      expect(coreService.replicateFromBy).not.toHaveBeenCalled();
      coreService.startSyncAfterLogin(driverId);
      expect(coreService.replicateFromBy).toHaveBeenCalledWith(driverId, expectedDate);
    });
  });

  describe('purgeStaleDocuments', function(){
    it('it should call dbService.deleteAfter() with expected parameters', function(){
      var view = 'docs/by-date';
      var THIRTY_DAYS = 30;
      var ONE_YEAR = THIRTY_DAYS * 12;
      var today = new Date();
      var startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() -  ONE_YEAR);
      var endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - THIRTY_DAYS);
      coreService.purgeStaleDocuments();
      expect(dbService.deleteAfter).toHaveBeenCalledWith(startDate, endDate, view);
    });
  });

});
