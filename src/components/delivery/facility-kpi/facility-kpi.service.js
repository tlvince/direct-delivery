'use strict';

angular.module('delivery')
  .service('facilityKPIService', function () {

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

    _this.isValidOutreach = function(outreachSessions){
      return angular.isNumber(outreachSessions);
    };

  });
