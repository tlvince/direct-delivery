/**
 * Created by ehealthafrica on 2/9/15.
 */

angular.module('schedules.round')
  .service('scheduleRoundService',  function(dbService, pouchUtil){
    var _this = this;

    _this.get = function(){
      var params = {
        include_docs: true
      };
       return dbService.getView('delivery-rounds/all', params)
        .then(pouchUtil.pluckDocs)
         .then(pouchUtil.rejectIfEmpty);
    }
  });
