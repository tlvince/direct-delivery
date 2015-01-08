'use strict';

angular.module('packing.all')
  .service('packingAllService', function(user, couchdb, couchUtil) {
    function tallyByPackedState(response) {
      var packings = {
        packed: [],
        unpacked: []
      };
      function mapPackingState(packingList) {
        if (packingList.value.packed) {
          return packings.packed.push(packingList.id);
        }
        packings.unpacked.push(packingList.id);
      }
      response.rows.forEach(mapPackingState);
      return packings;
    }

    this.all = function() {
      var params = {
        ddoc: 'daily-deliveries',
        view: 'by-driver',
        reduce: false
      };
      var key = couchUtil.key(user.email);
      angular.extend(params, key);
      return couchdb.view(params).$promise
        .then(tallyByPackedState);
    };
  });
