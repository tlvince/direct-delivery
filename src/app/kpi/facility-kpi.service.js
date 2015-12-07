'use strict';

angular.module('kpi')
  .service('facilityKPIService', function (dbService, pouchUtil, utility) {

    var _this = this;
    var DOC_TYPE = 'kpi'

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

    _this.getByDriverId = function(driverId) {
      var params = {};
      var view = 'kpi/by-driver';
      if (angular.isString(driverId) || angular.isArray(driverId)) {
        params = pouchUtil.key(driverId);
      }
      /*eslint-disable camelcase */
      params.include_docs = true;
      /*eslint-enable camelcase */
      return dbService.getView(view, params);
    };

    _this.getByDriverSorted = function(driverId) {
      function sortByDateDesc(docs) {
        return docs.sort(function(a, b) {
          return - (new Date(a.date) - new Date(b.date));
        });
      }

      return _this.getByDriverId(driverId)
          .then(pouchUtil.pluckDocs)
          .then(pouchUtil.rejectIfEmpty)
          .then(sortByDateDesc);
    };

    _this.getTemplate = function (){
      var view = 'kpi/by-driver-date' //TODO: point this back to kpi-template/all
      var params = {}
      /*eslint-disable camelcase */
      params.include_docs = true;
      /*eslint-enable camelcase */

      return dbService.getView(view, params)
        .then(pouchUtil.pluckDocs);
    }
    function hash (driverId, date, facilityId) {
      return [driverId, date, facilityId].join('-')
    }
    function hashKPI (kpiList) {
      var kpiHash = {}
      kpiList.forEach(function (kpi) {
        if (kpi.facility && kpi.facility.id) {
          var key = hash(kpi.driverID, kpi.date, kpi.facility.id)
          kpiHash[key] = kpi
        }
      })
      return kpiHash
    }
    _this.fillInMissingKPI = function (kpiList, deliveries, kpiTemplate) {

      var result = angular.copy(kpiList)
      var kpiHash = hashKPI(result)

      deliveries
        .forEach(function (row) {

          var recordKey = hash(row.driverID, row.date, row.facility.id)
          if (!kpiHash[recordKey]) {
            var temp = angular.copy(kpiTemplate)
            delete temp._id
            delete temp._rev
            temp.doc_type = DOC_TYPE
            temp.date = row.date
            temp.deliveryRoundID = row.deliveryRoundID
            temp.driverID = row.driverID
            temp.facility = row.facility
            result.push(temp)
          }
        })
      return result
    }
  });
