'use strict';

angular
		.module('kpi')
		.config(function ($stateProvider) {
			$stateProvider
					.state('facilityKPI', {
						parent: 'index',
						url: 'facility-kpi',
						templateUrl: 'app/kpi/facility-kpi.html',
						controller: 'FacilityKPICtrl',
						controllerAs: 'facKPICtrl'
					})
					.state('facilityKPIListView', {
						parent: 'index',
						url: 'facility-kpi-list-view',
						templateUrl: 'app/kpi/list-view/facility-kpi-list.html',
						controller: 'FacilityKPIListCtrl',
						controllerAs: 'facKPIListCtrl',
						data: {
							label: 'Facility KPI'
						},
						resolve: {
							kpiSorted: function(facilityKPIService, AuthService) {
								var driverId = AuthService.currentUser.name;
								return facilityKPIService.getByDriverSorted(driverId);
							}
						}
					});
		});
