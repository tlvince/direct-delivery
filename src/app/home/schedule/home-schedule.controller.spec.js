'use strict';
/*eslint-env jasmine */
/*global module: false, inject: false */

describe('HomeScheduleCtrl', function() {
  beforeEach(module('home.schedule', 'deliveryMock', 'sync'));

  var HomeScheduleCtrl, $rootScope, dailySchedule, SYNC_STATUS;

  beforeEach(inject(function($controller, _SYNC_STATUS_, _$rootScope_, _dailyDeliveryMock_) {

    HomeScheduleCtrl = $controller('HomeScheduleCtrl', {
      dailySchedule: _dailyDeliveryMock_,
      $scope: _$rootScope_.$new(),
      $rootScope: _$rootScope_,
      SYNC_STATUS: _SYNC_STATUS_
    });

    dailySchedule = _dailyDeliveryMock_;
    $rootScope = _$rootScope_;
    SYNC_STATUS = _SYNC_STATUS_;

  }));

  it('should expose defined', function(){
    expect(HomeScheduleCtrl).toBeDefined();
  });

  it('Should expose "day"', function(){
    expect(HomeScheduleCtrl.day).toBeDefined();
  });

  describe('showScheduleTable()', function(){

    afterEach(function() {
      HomeScheduleCtrl.day = dailySchedule;
    });

    it('Should return FALSE if HomeScheduleCtrl.day is not an object', function(){
      expect(HomeScheduleCtrl.showScheduleTable()).toBeTruthy();
      HomeScheduleCtrl.day = 'non-object';
      expect(HomeScheduleCtrl.showScheduleTable()).toBeFalsy();
    });

    it('Should return FALSE if HomeScheduleCtrl.day.facilityRounds not defined', function(){
      expect(HomeScheduleCtrl.showScheduleTable()).toBeTruthy();
      HomeScheduleCtrl.day = {};
      expect(HomeScheduleCtrl.showScheduleTable()).toBeFalsy();
    });

    it('Should return FALSE if HomeScheduleCtrl.day.facilityRounds is Empty Array', function(){
      expect(HomeScheduleCtrl.showScheduleTable()).toBeTruthy();
      HomeScheduleCtrl.day = {
        facilityRounds: []
      };
      expect(HomeScheduleCtrl.showScheduleTable()).toBeFalsy();
    });

    it('Should return FALSE if HomeScheduleCtrl.day.facilityRounds is Not an Array', function(){
      expect(HomeScheduleCtrl.showScheduleTable()).toBeTruthy();
      HomeScheduleCtrl.day = {
        facilityRounds: 'String that has length > 0'
      };
      expect(HomeScheduleCtrl.showScheduleTable()).toBeFalsy();
    });

    it('Should return TRUE if HomeScheduleCtrl.day.facilityRounds is Non-Empty Array', function(){
      expect(angular.isArray(HomeScheduleCtrl.day.facilityRounds)).toBeTruthy();
      expect(HomeScheduleCtrl.day.facilityRounds.length).toBeGreaterThan(0);
      expect(HomeScheduleCtrl.showScheduleTable()).toBeTruthy();
    });

  });

});
