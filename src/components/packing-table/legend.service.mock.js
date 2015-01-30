'use strict';

angular.module('packingTableLegendServiceMock', [])
  .service('couchdb', function(PRODUCT_STORAGE_MOCK) {
    this.view = function() {
      return {
        $promise: {
          then: function(pluck) {
            return {
              then: function(format) {
                return format(pluck(PRODUCT_STORAGE_MOCK));
              }
            };
          }
        }
      };
    };
  });
