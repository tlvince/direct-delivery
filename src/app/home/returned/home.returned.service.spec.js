'use strict';

describe('returnedService', function () {

	beforeEach(module('home.returned', 'deliveryMock', 'sync', 'core', 'auth', 'utility', 'packing.all'));

	var returnedService;
	var packingAllService;

	beforeEach(inject(function (_returnedService_, _packingAllService_) {
		returnedService = _returnedService_;
		packingAllService = _packingAllService_;

		spyOn(packingAllService, 'all')
	}));

	it('Should be defined', function () {
		expect(returnedService).toBeDefined();
	});

	describe('get', function () {

		it('Should call packingAllService.all', function () {
			expect(packingAllService.all).not.toHaveBeenCalled();
			returnedService.get();
			expect(packingAllService.all).toHaveBeenCalled();
		});

	});

});
