/**
 * Created by ehealthafrica on 12/12/14.
 */
'use strict';

angular.module('schedules')
  .service('scheduleService', function(user, dbService, pouchUtil, utility) {
    /**
     *
     * @params : key (string || array)
     * @returns {*}
     */
    this.get = function(key) {

      var params = {};
      //TODO: this should use Auth.currentUser.name see #item:1172
      if(angular.isString(key) || angular.isArray(key)) {
        params = pouchUtil.key(user.email + '-' + utility.formatDate(new Date()));
      }
      /*eslint-disable camelcase */
      params.include_docs = true;
      /*eslint-enable camelcase */
      return dbService.getView('daily-deliveries/by-driver-date', params);
    };

    this.getDaySchedule = function() {
      //TODO: this take a driverId(Auth.currentUser.name/email) and date parameter.
      //#see item:1173

      return this.get()
        .then(pouchUtil.pluckDocs)
        .then(utility.first);
    };
    this.getByRound = function(roundId){
      if(!roundId) return;
      return this.pluck(this.get(roundId));

    }
    this.pluck = function(promise){
       return promise
         .then(pouchUtil.pluckDocs)
         .then(utility.first)
    }
  });
