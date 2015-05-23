/**
 * Created by ehealthafrica on 1/13/15.
 */

angular.module('schedules.round')
    .controller('SchedulesRoundCtrl', function (scheduleService, scheduleRoundService, rounds,
                                                utility, DELIVERY_STATUS, deliveryService, $state) {
      var _this = this;

      function openRoundTab() {
        if($state.params.roundId) {
          _this.toggleDisplay($state.params.roundId);
        }
      }

      _this.STATUS = DELIVERY_STATUS;
      _this.rounds = rounds;

      _this.getColorCode = function (status, ccsClass) {
        return deliveryService.getStatusColor(status, ccsClass);
      };

      _this.formatDate = function (date) {
        if ((new Date(date)).toString() !== 'Invalid Date') {
          return utility.formatDate(date, "dd, MMM yyyy");
        }
        return 'N/A';
      };

      _this.displayRound = null;
      _this.roundToDisplay = null;
      _this.showDisplayRound = function (roundUUID) {
        scheduleService.getByRound(roundUUID)
            .then(function (res) {
              _this.displayRound = res;
            });
      };

      _this.toggleDisplay = function (roundId) {
        if (roundId === _this.roundToDisplay) {
          _this.roundToDisplay = null;
        } else {
          _this.roundToDisplay = roundId;
          _this.showDisplayRound(roundId);
        }
      }

      openRoundTab();
    });
