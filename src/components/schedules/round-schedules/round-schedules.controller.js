/**
 * Created by ehealthafrica on 1/13/15.
 */

angular.module('schedules.round')
  .controller('SchedulesRoundCtrl', function(scheduleService, scheduleRoundService, rounds, utility){
    var _this = this;

    _this.rounds = rounds;

    _this.formatDate = function(date){
      return utility.formatDate(date, "dd, MMM yyyy");
    };

    _this.displayRound = null;
    _this.roundToDisplay = null;
    _this.showDisplayRound = function(roundUUID){
      scheduleService.getByRound(roundUUID)
        .then(function(res){
          _this.displayRound = res;
        });
    };
    _this.toggleDisplay = function(roundId){
      if(roundId === _this.roundToDisplay){
        _this.roundToDisplay = null;
      }else{
        _this.roundToDisplay = roundId;
        _this.showDisplayRound(roundId);
      }
    }
  });
