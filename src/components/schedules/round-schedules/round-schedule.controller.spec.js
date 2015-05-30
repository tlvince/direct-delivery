'use strict';
/*eslint-env jasmine */
/*global module: false, inject: false */

describe('SchedulesRoundCtrl', function() {
  beforeEach(module('schedules', 'schedules.round', 'deliveryMock', 'delivery', 'utility'));

  var SchedulesRoundCtrl;
  var dailySchedule;
  var deliveryService;
  var DELIVERY_STATUS;
  var scheduleService;
  var scheduleRoundService;
  var utility;

  beforeEach(inject(function($controller, _scheduleService_, _deliveryService_, _utility_,
                             _scheduleRoundService_, _DELIVERY_STATUS_, _dailyDeliveryMock_) {

    deliveryService = _deliveryService_;
    DELIVERY_STATUS = _DELIVERY_STATUS_;
    dailySchedule = _dailyDeliveryMock_;
    scheduleService = _scheduleService_;
    scheduleRoundService = _scheduleRoundService_;
    utility = _utility_;
    var rounds = [];

    SchedulesRoundCtrl = $controller('SchedulesRoundCtrl', {
      dailySchedule: _dailyDeliveryMock_,
      deliveryService: deliveryService,
      rounds: rounds,
      scheduleService: scheduleService,
      scheduleRoundService: scheduleRoundService,
      DELIVERY_STATUS: DELIVERY_STATUS,
      utility: utility
    });

    spyOn(deliveryService, 'getStatusColor').and.callThrough();
    spyOn(scheduleService, 'getByRound').and.callThrough();
    spyOn(SchedulesRoundCtrl, 'showDisplayRound').and.callThrough();

  }));

  it('SchedulesRoundCtrl should be defined', function(){
    expect(SchedulesRoundCtrl).toBeDefined();
  });

  it('SShould have STATUS property that equals DELIVERY_STATUS', function(){
    expect(SchedulesRoundCtrl.STATUS).toEqual(DELIVERY_STATUS);
  });

  it('Should expose SchedulesRoundCtrl.displayRound', function() {
    expect(SchedulesRoundCtrl.displayRound).toBeDefined();
  });

  it('Should expose SchedulesRoundCtrl.roundToDisplay', function() {
    expect(SchedulesRoundCtrl.roundToDisplay).toBeDefined();
  });

  it('Should expose SchedulesRoundCtrl.rounds as an array', function() {
    expect(angular.isArray(SchedulesRoundCtrl.rounds)).toBeTruthy();
  });

  it('Should expose SchedulesRoundCtrl.rounds as an array', function() {
    expect(angular.isArray(SchedulesRoundCtrl.rounds)).toBeTruthy();
  });

  describe('formatDate', function() {
    it('Should return "N/A" if invalid date is passed', function() {
      var expected = 'N/A';
      var result = SchedulesRoundCtrl.formatDate('20-123332-1920');
      expect(result).toBe(expected);
    });

    it('Should return valid date in expected format', function() {
      var validDate = new Date();
      var expected = utility.formatDate(validDate, "dd, MMM yyyy");
      var result = SchedulesRoundCtrl.formatDate(validDate);
      expect(result).toBe(expected);
    });
  });

  describe('showDisplayRound()', function() {
    it('Should call scheduleService.getByRound() with expected parameters', function() {
      expect(scheduleService.getByRound).not.toHaveBeenCalled();
      var roundId = 'KN-20';
      SchedulesRoundCtrl.showDisplayRound(roundId);
      expect(scheduleService.getByRound).toHaveBeenCalledWith(roundId);
    });
  });

  describe('toggleDisplay()', function() {
    it('Should set SchedulesRoundCtrl.roundToDisplay to null if called with current id', function() {
      SchedulesRoundCtrl.roundToDisplay = 'KN-20';
      expect(SchedulesRoundCtrl.roundToDisplay).not.toBeNull();
      SchedulesRoundCtrl.toggleDisplay(SchedulesRoundCtrl.roundToDisplay);
      expect(SchedulesRoundCtrl.roundToDisplay).toBeNull();
    });

    it('Should set SchedulesRoundCtrl.roundToDisplay and call showDisplayRound() if different from roundToDisplay', function() {
      SchedulesRoundCtrl.roundToDisplay = null;
      expect(SchedulesRoundCtrl.roundToDisplay).toBeNull();
      var differentRoundId = 'KN-20';
      expect(SchedulesRoundCtrl.showDisplayRound).not.toHaveBeenCalled();
      SchedulesRoundCtrl.toggleDisplay(differentRoundId);
      expect(SchedulesRoundCtrl.roundToDisplay).toBe(differentRoundId);
      expect(SchedulesRoundCtrl.showDisplayRound).toHaveBeenCalledWith(differentRoundId);
    });
  });

  describe('getColorCode()', function() {

    it('Should call deliveryService.getStatusColor() with expected parameters', function() {
      expect(deliveryService.getStatusColor).not.toHaveBeenCalled();
      var status = DELIVERY_STATUS.UPCOMING_FIRST;
      var style = 'alert-success';
      SchedulesRoundCtrl.getColorCode(status, style);
      expect(deliveryService.getStatusColor).toHaveBeenCalledWith(status, style);
    });

    it('Should call deliveryService.getStatusColor() and return same value', function() {
      expect(deliveryService.getStatusColor).not.toHaveBeenCalled();
      var status = DELIVERY_STATUS.UPCOMING_FIRST;
      var style = 'alert-success';
      var result = SchedulesRoundCtrl.getColorCode(status, style);
      expect(deliveryService.getStatusColor).toHaveBeenCalledWith(status, style);
      var expected = deliveryService.getStatusColor(status, style);
      expect(result).toBe(expected);
    });

  });

});
