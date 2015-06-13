'use strict';

describe('PackingAllCtrl', function() {
	beforeEach(module('home.returned', 'schedules', 'auth', 'delivery', 'db', 'deliveryMock', 'log', 'utility'));

	var ReturnedCtrl;
	var dbService;
	var scheduleService;
	var AuthService;
	var dailySchedule;

	beforeEach(inject(function($controller, _dbService_, _$state_, _scheduleService_,
	                           _AuthService_, _dailyDeliveryMock_, _log_, _utility_) {

		dbService = _dbService_;
		scheduleService = _scheduleService_;
		AuthService = _AuthService_;
		dailySchedule = _dailyDeliveryMock_;

		ReturnedCtrl = $controller('ReturnedCtrl', {
			dailySchedule: dailySchedule,
			dbService: dbService,
			$state: _$state_,
			scheduleService: scheduleService,
			AuthService: AuthService,
			log: _log_,
			utility: _utility_
		});
	}));

	it('Should set ReturnedCtrl.queryDate', function(){
		expect(ReturnedCtrl.queryDate).toBeDefined();
	});

	it('Should set ReturnedCtrl.productLength to packingList.length', function(){
		expect(ReturnedCtrl.productLength).toBeDefined(dailySchedule.packingList.length);
	});

});
