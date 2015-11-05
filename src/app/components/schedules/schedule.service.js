/**
 * Created by ehealthafrica on 12/12/14.
 */
'use strict';

angular.module('schedules')
  .service('scheduleService', function(AuthService, dbService, pouchUtil, utility) {

    this.get = function(view, key) {

      var params = {};
      if (angular.isString(key) || angular.isArray(key)) {
        params = pouchUtil.key(key);
      }
      /*eslint-disable camelcase */
      params.include_docs = true;
      /*eslint-enable camelcase */
      return dbService.getView(view, params);
    };

    this.getDaySchedule = function(driverID, date) {
      driverID = driverID || AuthService.currentUser.name;
      var deliveryDate = date || new Date();
      var key = driverID + '-' + utility.formatDate(deliveryDate);
      return this.get('daily-deliveries/by-driver-date', key)
        .then(pouchUtil.pluckDocs)
        .then(pouchUtil.rejectIfEmpty)
        .then(utility.first);
    };

    this.getByRound = function(roundId){
      return this.get('daily-deliveries/by-round', roundId)
        .then(pouchUtil.pluckDocs)
        .then(pouchUtil.rejectIfEmpty);
    };

  });
