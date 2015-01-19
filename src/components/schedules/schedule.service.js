/**
 * Created by ehealthafrica on 12/12/14.
 */
'use strict';

angular.module('schedules')
  .service('scheduleService', function(user, couchdb, couchUtil){

    this.all = function() {
      var params = {
        ddoc: 'daily-deliveries',
        view: 'by-driver-date',
        reduce: false,
        include_docs: true
      };
      var key = couchUtil.key(user.email +"-"+ moment().format("D-M-YYYY"));
      angular.extend(params, key);
      return couchdb.view(params).$promise;

    };
    this.getCurrentRound = function(){
      return this.all()
        .then(function(response){
          return response;
        })
        .catch(function(){
          console.error('server failed to return data');
        });
    };
    this.getDaySchedule = function(){
      return this.getCurrentRound()
        .then(function(response){
          return response.rows.map(function(row){
            return row.doc;
          })
        });
    }
  });