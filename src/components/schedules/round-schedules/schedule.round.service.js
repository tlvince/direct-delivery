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

    _this.getSortedByDate = function(){
     return _this.get()
        .then(function(res){
          return res.sort(function(a,b){
            return -(new Date(a.startDate)- new Date(b.startDate));
          });
        })
    }
  });
