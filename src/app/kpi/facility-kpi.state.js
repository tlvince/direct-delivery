'use strict';

angular
		.module('kpi')
		.config(function ($stateProvider) {
			$stateProvider
					.state('facilityKPI', {
						parent: 'index',
						url: '/facility-kpi',
						templateUrl: 'app/kpi/facility-kpi.html',
						controller: 'FacilityKPICtrl',
						controllerAs: 'facKPICtrl',
						data: {
							label: 'Facility KPI'
						},
            resolve: {
              kpiTemplate : function (facilityKPIService){
                function handleError(err){
                  console.error('kpi template error', err)
                  return [];
                }
                return facilityKPIService.getTemplate()
                  .then(function(response){
                    return response[0];
                  })
                  .catch(handleError)
              },
              dailySchedule: function(log, scheduleService) {
                function errorHandler(error) {
                  log.info('dailyScheduleRetrival', error);
                  return {};
                }
                return scheduleService.getDaySchedule()
                  .catch(errorHandler);
              }
            }
					})
					.state('facilityKPIListView', {
						parent: 'index',
						url: '/facility-kpi-list-view',
						templateUrl: 'app/kpi/list-view/facility-kpi-list.html',
						controller: 'FacilityKPIListCtrl',
						controllerAs: 'facKPIListCtrl',
						resolve: {
							kpiSorted: function(facilityKPIService, AuthService) {
								function handleError(){
									return [];
								}
								var driverId = AuthService.currentUser.name;
								return facilityKPIService.getByDriverSorted(driverId)
										.catch(handleError);
							}

						}
					});
		});
