/**
 * Created by ehealthafrica on 12/12/14.
 */
'use strict';

angular.module('schedules')
  .service('scheduleService', function(AuthService, dbService, pouchUtil, utility) {

    this.all = function() {
      var params = pouchUtil.key(AuthService.currentUser.name + '-' + utility.formatDate(new Date()));
      /*eslint-disable camelcase */
      params.include_docs = true;
      /*eslint-enable camelcase */
      return dbService.getView('daily-deliveries/by-driver-date', params);
    };

    this.getDaySchedule = function() {
      //TODO: this take a driverId(Auth.currentUser.name/email) and date parameter.
      //#see item:1173
      return this.all()
        .then(pouchUtil.pluckDocs)
        .then(utility.first);
    };
  });
