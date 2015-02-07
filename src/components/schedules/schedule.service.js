/**
 * Created by ehealthafrica on 12/12/14.
 */
'use strict';

angular.module('schedules')
  .service('scheduleService', function(AuthService, dbService, pouchUtil, utility) {

    this.all = function(driverID, deliveryDate) {
      driverID = driverID || AuthService.currentUser.name;
      deliveryDate = deliveryDate || new Date();

      var params = pouchUtil.key(driverID + '-' + utility.formatDate(deliveryDate));
      /*eslint-disable camelcase */
      params.include_docs = true;
      /*eslint-enable camelcase */
      return dbService.getView('daily-deliveries/by-driver-date', params);
    };

    this.getDaySchedule = function(driverID, date) {
      return this.all(driverID, date)
        .then(pouchUtil.pluckDocs)
        .then(utility.first);
    };
  });
