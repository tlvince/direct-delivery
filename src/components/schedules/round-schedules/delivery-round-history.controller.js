/**
 * Created by ehealthafrica on 1/13/15.
 */

angular.module('schedules.round')
    .controller('DeliveryRoundHistoryCtrl', function(facilityRound, $state){
      this.facRnd = facilityRound;
      this.roundId = $state.params.roundId;

      this.receivedStockBtwDelivery = function(i) {
        return this.facRnd.packedProduct[i].receivedInterimStock == true;
      };

    });
