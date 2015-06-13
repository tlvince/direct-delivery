'use strict';

angular
		.module('kpi')
		.controller('FacilityKPIListCtrl', function (kpiSorted, utility, facilityKPIService) {

			var vm = this;
			vm.kpiList = kpiSorted;

			vm.formatDate = function(date) {
				return utility.formatDate(date);
			};

			vm.isComplete = function(kpiDoc){
				return (facilityKPIService.isValidFacilityKPI(kpiDoc) === true);
			};

			vm.showTable = function(){
				return (angular.isArray(vm.kpiList) && vm.kpiList.length > 0);
			};

		});
