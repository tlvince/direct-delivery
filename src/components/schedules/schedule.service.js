/**
 * Created by ehealthafrica on 12/12/14.
 */
'use strict';

angular.module('schedules')
  .service('scheduleService', function(user, couchdb, couchUtil, utility) {

    this.all = function() {
      var params = {
        ddoc: 'daily-deliveries',
        view: 'by-driver-date',
        reduce: false,
        /*eslint-disable camelcase */
        include_docs: true
        /*eslint-enable camelcase */
      };
      var key = couchUtil.key(user.email + '-' + utility.formatDate(new Date()));
      angular.extend(params, key);
      return couchdb.view(params).$promise;
    };

    this.getDaySchedule = function() {
      return this.all()
        .then(couchUtil.pluckDocs)
        .then(utility.first);
    };
  });
