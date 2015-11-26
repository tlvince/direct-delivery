/**
 * Created by ehealthafrica on 12/12/14.
 */
'use strict';

angular.module('schedules')
  .service('scheduleService', function(AuthService, dbService, pouchUtil, utility) {
    function flattenRoundsList(dailyDelivery) {
      var flattened = [];
      var rounds = angular.copy(dailyDelivery.facilityRounds);
      delete dailyDelivery.facilityRounds;
      var i = rounds.length;
      while (i--) {
        flattened.push(angular.extend(rounds[i], dailyDelivery));
      }
      return flattened;
    }

    function formatRounds(list) {
      var formattedList = [];
      var i = list.length;
      while (i--) {
        if (list[i].hasOwnProperty('facilityRounds')) {
          formattedList = formattedList.concat(flattenRoundsList(list[i]));
        } else {
          formattedList.push(list[i]);
        }
      }

      formattedList.sort(function (a, b) {
        return a.drop - b.drop;
      });
      return formattedList;
    }

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
        .then(formatRounds);
    };

    this.getByRound = function(roundId){
      return this.get('daily-deliveries/by-round', roundId)
        .then(pouchUtil.pluckDocs)
        .then(pouchUtil.rejectIfEmpty);
    };
  });
