'use strict';

angular.module('kpi')
  .service('facilityKPIService', function (scheduleService, utility, deliveryService) {

    var _this = this;

    /**
     * This validates FacilityKPI and returns true if valid
     * else returns Validation Error object.
     *
     * @param {Object} kpi
     * @returns {true | Object} - return true if valid else error object.
     */
    _this.isValidFacilityKPI = function (kpi) {
      var invalid = {
        outreach: !_this.isValidOutreach(kpi.outreachSessions),
        antigensNoImmunized: {}
      };
      var antigen;
      for (var i in kpi.antigensKPI) {
        antigen = kpi.antigensKPI[i];
        if (!angular.isNumber(antigen.noImmunized)) {
          invalid.antigensNoImmunized[antigen.productID] = true;
        }
      }
      var validNoImmunized = Object.keys(invalid.antigensNoImmunized).length === 0;
      if (invalid.outreach === false && validNoImmunized === true) {
        return true;
      }
      return invalid;
    };

    _this.isValidOutreach = function (outreachSessions) {
      return angular.isNumber(outreachSessions);
    };


    _this.loadFacilities = function (driverId, date) {
      function extractFacilityRoundInfo(dailyDelivery) {
        if (!angular.isArray(dailyDelivery.facilityRounds)) {
          return [];
        }
        return dailyDelivery.facilityRounds
          .map(function (facRnd) {
            return {
              id: facRnd.facility.id,
              name: facRnd.facility.name,
              dailyDeliveryId: dailyDelivery._id,
              facilityRound: facRnd
            };
          });
      }

      return scheduleService.getDaySchedule(driverId, date)
        .then(extractFacilityRoundInfo);
    };

    _this.getFacilityKPIFrom = function(facilityId, facilityKPIList) {
      var selected = _this.getFromById(facilityId, facilityKPIList);
      if(selected && selected.facilityRound && selected.facilityRound.facilityKPI){
        return selected.facilityRound.facilityKPI;
      }
    };

    _this.getFromById = function(facilityId, facilityKPIList) {
      function filterByFacilityId(doc){
        return deliveryService.equalString(doc.id, facilityId);
      }
      return utility.first(facilityKPIList.filter(filterByFacilityId));
    };

    /**
     * This validates a Facility KPI object
     * @param kpi
     * @returns {*|boolean}
     */
    _this.isValidKPI = function(kpi) {
      return (angular.isObject(kpi) && angular.isArray(kpi.antigensKPI) && kpi.antigensKPI.length > 0);
    };

  });
