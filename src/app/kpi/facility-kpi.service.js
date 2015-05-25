'use strict';

angular.module('kpi')
  .service('facilityKPIService', function (dbService, pouchUtil, utility) {

    var _this = this;

    _this.getBy = function(driverId, date) {
      var view = 'kpi/by-driver-date';
      var params = {};
      date = utility.formatDate(date);
      var key = [driverId, '-', date].join('');
      if (angular.isString(key) || angular.isArray(key)) {
        params = pouchUtil.key(key);
      }
      /*eslint-disable camelcase */
      params.include_docs = true;
      /*eslint-enable camelcase */

      return dbService.getView(view, params)
          .then(pouchUtil.pluckDocs);
    };

    _this.getKPIFromBy = function(kpiList, facilityId) {
      function byFacilityId(kpi) {
        return kpi.facility.id === facilityId;
      }
      return utility.first(kpiList.filter(byFacilityId));
    };

    _this.isValidFacilityKPI = function (kpi) {
      var invalid = {
        outreach: !_this.isValidOutreach(kpi.outreachSessions),
        antigensNoImmunized: {}
      };
      var antigen;
      for (var i in kpi.antigensKPI) {
        antigen = kpi.antigensKPI[i];
        if (!angular.isNumber(antigen.noImmunized)) {
          invalid.antigensNoImmunized[i] = true;
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

    _this.isValidKPI = function(kpi) {
      return (angular.isObject(kpi) && angular.isArray(kpi.antigensKPI) && kpi.antigensKPI.length > 0);
    };

    _this.save = function(kpiDoc) {
      return dbService.save(kpiDoc);
    };

  });
