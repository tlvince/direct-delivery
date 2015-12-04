'use strict';

angular.module('kpi')
		.controller('FacilityKPICtrl', function (facilityKPIService, utility, AuthService, log, $state, dailySchedule, kpiTemplate) {

			var vm = this;
			var driverId = AuthService.currentUser.name;
			vm.kpiList = [];
			var shouldShowKPI = false;
			var shouldSkipKPI = false;

			function setKPIList(kpiDocs) {
				vm.kpiList = kpiDocs;
        return kpiDocs
			}

			vm.getByDriverAndDate = function () {
				vm.facilityKPI = null;
				vm.selectedFacilityId = '';
				vm.selectedLoadKPI = false;
				vm.selectedFacility = null;
				facilityKPIService.getBy(driverId, vm.selectedDate)
          .then(fillInEmptyKPI)
          .then(setKPIList)
          .catch(function () {
            setKPIList([]);
          });
			};

			vm.getFacilityKPI = function () {
				vm.selectedLoadKPI = true;
				vm.facilityKPI = facilityKPIService.getKPIFromBy(vm.kpiList, vm.selectedFacilityId);
				if (vm.facilityKPI && vm.facilityKPI.facility) {
					vm.selectedFacility = vm.facilityKPI.facility;
					return;
				}
				vm.selectedFacility = null;
				shouldSkipKPI = false;
				shouldShowKPI = false;
			};

			vm.isValidKPI = function () {
				return facilityKPIService.isValidKPI(vm.facilityKPI);
			};

			function clearValidationError() {
				vm.kpiError = {
					outreach: false,
					antigensNoImmunized: {}
				};
			}

			function initialize() {
				vm.selectedLoadKPI = false;
				vm.previewKPI = false;
				vm.facilityKPI = null;
				vm.selectedFacilityId = null;
				vm.selectedDate = utility.extractDate(new Date());
				vm.getByDriverAndDate();
				setKPIList([]);
				clearValidationError();
			}

			initialize();
      function fillInEmptyKPI (){
        return facilityKPIService.fillInMissingKPI(vm.kpiList, dailySchedule, kpiTemplate)
      }


			vm.togglePreview = function () {
				vm.previewKPI = !vm.previewKPI;
			};

			vm.isValidOutreach = function () {
				vm.kpiError.outreach = !facilityKPIService.isValidOutreach(vm.facilityKPI.outreachSessions);
			};

			vm.preview = function () {
				var res = facilityKPIService.isValidFacilityKPI(vm.facilityKPI);
				if (res === true) {
					clearValidationError();
					vm.togglePreview();
				} else {
					vm.kpiError = res;
				}
			};

			vm.isInvalid = function (index) {
				var antigen = vm.facilityKPI.antigensKPI[index];
				vm.kpiError.antigensNoImmunized[index] = !angular.isNumber(antigen.noImmunized);
			};

			vm.save = function () {
				var kpiDoc = angular.copy(vm.facilityKPI);
				facilityKPIService.save(kpiDoc)
						.then(function () {
							log.success('kpiSaved');
							$state.go('home.schedule');
						})
						.catch(function (err) {
							log.error('saveKPIFail', err);
						});
			};

			vm.skipKPI = function () {
				var kpiDoc = angular.copy(vm.facilityKPI);
				facilityKPIService.save(kpiDoc)
						.then(function () {
							log.success('kpiSaved');
							$state.go('home.schedule');
						})
						.catch(function (err) {
							log.error('saveKPIFail', err);
						});
			};

			vm.shouldAddKPI = function () {
				return shouldShowKPI;
			};

			vm.shouldSkipKPI = function () {
				return shouldSkipKPI;
			};

			vm.showKPIForm = function () {
				shouldShowKPI = true;
				shouldSkipKPI = false;
			};

			vm.showSkipForm = function () {
				shouldShowKPI = false;
				shouldSkipKPI = true;
			};

			vm.hideOptions = function () {
				return (vm.selectedFacilityId === '' || vm.selectedFacility === null);
			};



		});
