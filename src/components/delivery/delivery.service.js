'use strict';

angular.module('delivery')
  .service('deliveryService', function ($q, scheduleService) {

    var _this = this;

    _this.getDefaultCancelReport = function () {
      var defaultCR = {
        cancelledAhead: false,
        others: false,
        hfNotAvailable: false,
        brokenCCE: false,
        noCCE: false,
        note: ''
      };
      return defaultCR;
    };

    _this.validateCancelReport = function (facRnd) {
      if (!facRnd.cancelReport) {
        return false;
      }
      var cr = facRnd.cancelReport;
      var noCRSelected = !(cr.cancelledAhead || cr.hfNotAvailable || cr.brokenCCE || cr.noCCE || cr.others);
      if (noCRSelected) {
        return false;
      }
      var otherOptions = (cr.hfNotAvailable === true || cr.brokenCCE === true || cr.noCCE === true || cr.others === true);
      var cancelledAhead = ((cr.cancelledAhead === true) && !otherOptions);
      if (cancelledAhead) {
        return true;
      }
      return otherOptions;
    };

    _this.save = function (ddDoc) {
      //TODO: replace mock with direct call.
      return $q.when({msg: true});
      //return dbService.save(ddDoc);
    };

    _this.updateFacilityRound = function(dailyDelivery, facRnd){
      var fr;
      for(var i in dailyDelivery.facilityRounds){
        fr = dailyDelivery.facilityRounds[i];
        if(fr.facility.id === facRnd.facility.id){
          dailyDelivery.facilityRounds[i] = facRnd;
          return dailyDelivery;
        }
      }
      dailyDelivery.facilityRounds.push(facRnd);
      return dailyDelivery;
    };

    _this.filterByFacility = function (dd, facilityId) {
      return dd.facilityRounds
        .filter(function (facRnd) {
          return facRnd.facility.id === facilityId;
        });
    };

    _this.calcQty = function(packedProduct){
      var res = {};
      var deliveredQty = (packedProduct.expectedQty - packedProduct.onHandQty);
      var returnedQty = (packedProduct.onHandQty - packedProduct.expectedQty);
      res.deliveredQty = deliveredQty;
      res.returnedQty = 0;
      if(deliveredQty <= 0){
        res.deliveredQty = 0;
        res.returnedQty = returnedQty;
      }
      return res;
    };

    _this.initReturnedQty= function (facilityRnd){
      for(var i in facilityRnd.packedProduct){
        if(isNaN(facilityRnd.packedProduct[i].returnedQty)){
          facilityRnd.packedProduct[i].returnedQty = 0;
        }
      }
      return facilityRnd;
    };

  });
