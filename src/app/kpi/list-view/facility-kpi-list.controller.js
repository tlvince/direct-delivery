'use strict';

angular.module('kpi')
		.controller('FacilityKPIListCtrl', function (kpiSorted, utility, facilityKPIService) {
			var vm = this;
			vm.kpiList = kpiSorted;
			vm.formatDate = utility.formatDate;

			vm.isComplete = function(kpiDoc){
				return (facilityKPIService.isValidFacilityKPI(kpiDoc) === true);
			};

		});
