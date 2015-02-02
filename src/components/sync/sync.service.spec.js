'use strict';

describe('syncService', function () {

  var syncService, pouchdbService, toDB, fromDB, filterName, params, ids,
    utility, $rootScope;

  beforeEach(module('sync', 'db', 'utility'));

  beforeEach(inject(function (_syncService_, _pouchdbService_, _utility_, _$rootScope_) {
    syncService = _syncService_;
    pouchdbService = _pouchdbService_;
    utility = _utility_;
    $rootScope = _$rootScope_;

    toDB = 'test';
    fromDB = 'http://localhost:5984/deliveries';
    ids = ['_design/daily-deliveries'];
    filterName= 'docs/by_doc_types';
    params = {
      docTypes: ['product']
    };
    spyOn(pouchdbService, 'create').and.callThrough();
    spyOn(syncService, 'replicateByFilter').and.callThrough();
    spyOn(syncService, 'replicateByIds').and.callThrough();
  }));

  it('syncService should be defined', function () {
    expect(syncService).toBeDefined();
  });

  describe('replicateByFilter', function(){

    it('Should call pouchdbService.create()', function(){
      expect(pouchdbService.create).not.toHaveBeenCalled();
      syncService.replicateByFilter(toDB, fromDB, filterName, params);
      expect(pouchdbService.create).toHaveBeenCalledWith(toDB);
    });

    it('Should have correct parameters', function(){
      expect(syncService.replicateByFilter).not.toHaveBeenCalled();
      syncService.replicateByFilter(toDB, fromDB, filterName, params);
      expect(syncService.replicateByFilter).toHaveBeenCalledWith(toDB, fromDB, filterName, params);
    });

  });

  describe('replicateByIds', function(){
    it('Should call pouchdbService.create()', function(){
      expect(pouchdbService.create).not.toHaveBeenCalled();
      syncService.replicateByIds(toDB, fromDB, ids);
      expect(pouchdbService.create).toHaveBeenCalledWith(toDB);
    });

    it('Should have correct parameters', function(){
      expect(syncService.replicateByIds).not.toHaveBeenCalled();
      syncService.replicateByIds(toDB, fromDB, ids);
      expect(syncService.replicateByIds).toHaveBeenCalledWith(toDB, fromDB, ids);
    });
  });

  describe('dailyByDriver', function(){
    it('Should call replicateByFilter with expected parameters', function(){
      var today = new Date();
      var driverId = 'test@example.com';
      var expectedDate = utility.formatDate(today);
      var expectedFilterName = 'daily-deliveries/by_driver_and_date';
      var expectedParam = {
        date: expectedDate,
        driverId: driverId
      };
      expect(syncService.replicateByFilter).not.toHaveBeenCalled();
      syncService.dailyByDriver(toDB, fromDB, driverId, today);
      expect(syncService.replicateByFilter).toHaveBeenCalledWith(toDB, fromDB, expectedFilterName, expectedParam);
    });
  });

  describe('deliveryRndWithinDate', function(){
    it('should call replicateByFilter with expected parameters with expected parameters.', function(){
      expect(syncService.replicateByFilter).not.toHaveBeenCalled();
      var filter = 'delivery-rounds/within_date';
      var today = new Date();
      var params = { date: utility.formatDate(today) };
      syncService.deliveryRndWithinDate(toDB, fromDB, today);
      expect(syncService.replicateByFilter).toHaveBeenCalledWith(toDB, fromDB, filter, params);
    });
  });

  describe('dailySyncDown', function(){
    it('Should call deliveryRndWithinDate with expected parameters', function(){
      var today = new Date();
      spyOn(syncService, 'deliveryRndWithinDate').and.callThrough();
      expect(syncService.deliveryRndWithinDate).not.toHaveBeenCalled();
      syncService.dailySyncDown(toDB, fromDB, 'test@example.com', today);
      expect(syncService.deliveryRndWithinDate).toHaveBeenCalledWith(toDB, fromDB, utility.formatDate(today));
    });
  });

  describe('replicateByDocTypes', function(){
    it('Should call syncService.replicateByFilter() with expected parameters', function(){
      expect(syncService.replicateByFilter).not.toHaveBeenCalled();
      var docTypes = ['product', 'productStorage'];
      syncService.replicateByDocTypes(toDB, fromDB, docTypes);
      var filter = 'docs/by_doc_types';
      var params = {
        docTypes: JSON.stringify(docTypes)
      };
      expect(syncService.replicateByFilter).toHaveBeenCalledWith(toDB, fromDB, filter, params);
    });
  });

});
