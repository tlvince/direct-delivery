'use strict';
/*eslint-env jasmine */
/*global module: false, inject: false */

describe('HomeCtrl', function() {
  beforeEach(module('home', 'deliveryMock', 'sync', 'core', 'auth'));

  var HomeCtrl, $rootScope, dailySchedule, SYNC_STATUS, HOME_TABS, coreService,
    AuthService;

  beforeEach(inject(function($controller, _SYNC_STATUS_, _coreService_, _AuthService_,
                             _$rootScope_, _dailyDeliveryMock_, _HOME_TABS_) {

    dailySchedule = _dailyDeliveryMock_;
    $rootScope = _$rootScope_;
    SYNC_STATUS = _SYNC_STATUS_;
    HOME_TABS = _HOME_TABS_;
    coreService = _coreService_;
    AuthService = _AuthService_;

    AuthService.setCurrentUser({ name: 'test@user.com' });

    HomeCtrl = $controller('HomeCtrl', {
      dailySchedule: dailySchedule,
      coreService: coreService,
      AuthService: AuthService,
      $scope: _$rootScope_.$new(),
      $rootScope: $rootScope,
      SYNC_STATUS: SYNC_STATUS,
      HOME_TABS: HOME_TABS
    });

    spyOn(coreService, 'startSyncAfterLogin').and.callThrough();
    spyOn($rootScope, '$on').and.callThrough();

  }));

  it('should be defined', function(){
    expect(HomeCtrl).toBeDefined();
  });

  it('Should expose "today"', function(){
    expect(HomeCtrl.today).toBeDefined();
  });

  it('Should expose HomeCtrl.syncInProgress', function(){
    expect(HomeCtrl.syncInProgress).toBeDefined();
  });

  it('Should set HomeCtrl.syncInProgress to coreService.getSyncInProgress()', function(){
    var expected = coreService.getSyncInProgress();
    expect(HomeCtrl.syncInProgress).toBe(expected);
  });

  it('HomeScheduleCtrl.today should be a date object', function(){
    expect(angular.isDate(HomeCtrl.today)).toBeTruthy();
  });

  it('Should initialize HomeCtrl.tabs to HOME_TABS.', function(){
    expect(HomeCtrl.tabs).toEqual(HOME_TABS);
  });

  it('Should expose HomeCtrl.dailyDelivery', function(){
    expect(HomeCtrl.dailyDelivery).toBeDefined();
  });

  describe('startSync()', function(){

    it('Should be exposed via HomeCtrl.', function(){
      expect(angular.isFunction(HomeCtrl.startSync)).toBeTruthy()
    });

    it('Should call coreService.startSyncAfterLogin() with expected parameter', function(){
      var expectedUsername = AuthService.currentUser.name;
      expect(expectedUsername).toBeDefined();
      expect(coreService.startSyncAfterLogin).not.toHaveBeenCalled();
      HomeCtrl.startSync();
      expect(coreService.startSyncAfterLogin).toHaveBeenCalledWith(expectedUsername);
    });

    it('Should create SYNC Listeners', function(){
      expect($rootScope.$on).not.toHaveBeenCalled();
      HomeCtrl.startSync();
      expect($rootScope.$on).toHaveBeenCalledWith(SYNC_STATUS.IN_PROGRESS,  jasmine.any(Function));
      expect($rootScope.$on).toHaveBeenCalledWith(SYNC_STATUS.COMPLETE, jasmine.any(Function));
    });

  });

});
