'use strict';
/*eslint-env jasmine */
/*global module: false, inject: false */

describe('HomeScheduleCtrl', function() {
  beforeEach(module('home.schedule', 'deliveryMock', 'sync', 'delivery'));

  var HomeScheduleCtrl, $rootScope, dailySchedule, SYNC_STATUS, deliveryService,
    DELIVERY_STATUS;

  beforeEach(inject(function($controller, _SYNC_STATUS_, _deliveryService_, _$rootScope_, _DELIVERY_STATUS_, _dailyDeliveryMock_) {

    deliveryService = _deliveryService_;
    DELIVERY_STATUS = _DELIVERY_STATUS_;
    dailySchedule = _dailyDeliveryMock_;
    $rootScope = _$rootScope_;
    SYNC_STATUS = _SYNC_STATUS_;

    HomeScheduleCtrl = $controller('HomeScheduleCtrl', {
      dailySchedule: _dailyDeliveryMock_,
      $scope: _$rootScope_.$new(),
      deliveryService: deliveryService,
      $rootScope: $rootScope,
      SYNC_STATUS: SYNC_STATUS,
      DELIVERY_STATUS: DELIVERY_STATUS
    });

    spyOn(deliveryService, 'getStatusColor').and.callThrough();

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

    it('Should return FALSE if HomeScheduleCtrl.day not defined', function(){
      expect(HomeScheduleCtrl.showScheduleTable()).toBeTruthy();
      HomeScheduleCtrl.day = {};
      expect(HomeScheduleCtrl.showScheduleTable()).toBeFalsy();
    });

    it('Should return FALSE if HomeScheduleCtrl.day is Empty Array', function(){
      expect(HomeScheduleCtrl.showScheduleTable()).toBeTruthy();
      HomeScheduleCtrl.day = {
        facilityRounds: []
      };
      expect(HomeScheduleCtrl.showScheduleTable()).toBeFalsy();
    });

    it('Should return FALSE if HomeScheduleCtrl.day is Not an Array', function(){
      expect(HomeScheduleCtrl.showScheduleTable()).toBeTruthy();
      HomeScheduleCtrl.day = {
        facilityRounds: 'String that has length > 0'
      };
      expect(HomeScheduleCtrl.showScheduleTable()).toBeFalsy();
    });

    it('Should return TRUE if HomeScheduleCtrl.day is Non-Empty Array', function(){
      expect(angular.isArray(HomeScheduleCtrl.day)).toBeTruthy();
      expect(HomeScheduleCtrl.day.length).toBeGreaterThan(0);
      expect(HomeScheduleCtrl.showScheduleTable()).toBeTruthy();
    });

  });

  describe('getColorCode()', function() {

    it('Should call deliveryService.getStatusColor() with expected parameters', function() {
      expect(deliveryService.getStatusColor).not.toHaveBeenCalled();
      var status = DELIVERY_STATUS.UPCOMING_FIRST;
      var style = 'alert-success';
      HomeScheduleCtrl.getColorCode(status, style);
      expect(deliveryService.getStatusColor).toHaveBeenCalledWith(status, style);
    });

    it('Should call deliveryService.getStatusColor() and return same value', function() {
      expect(deliveryService.getStatusColor).not.toHaveBeenCalled();
      var status = DELIVERY_STATUS.UPCOMING_FIRST;
      var style = 'alert-success';
      var result = HomeScheduleCtrl.getColorCode(status, style);
      expect(deliveryService.getStatusColor).toHaveBeenCalledWith(status, style);
      var expected = deliveryService.getStatusColor(status, style);
      expect(result).toBe(expected);
    });

  });

});
