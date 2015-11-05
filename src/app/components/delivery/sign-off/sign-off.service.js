'use strict';

angular.module('delivery')
  .service('signOffService', function (deliveryService) {
    /**
     * This updates facility round status.
     *
     * @param {Object} dd
     * @param {Object} facRnd
     * @param {Data-URI} signature - image string of the signature in data uri format.
     * @returns {$promise}
     */
    this.signOff = function(dd, facRnd, signature){
      facRnd = deliveryService.setSuccessStatus(facRnd);
      facRnd.signature = {
        dataUrl: signature,
        signedAt: new Date().toJSON()
      };
      dd = deliveryService.updateFacilityRound(dd, facRnd);
      return deliveryService.save(dd);
    };

  });
