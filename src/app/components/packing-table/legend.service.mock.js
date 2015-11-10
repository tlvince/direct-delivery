'use strict';

angular.module('packingTableLegendServiceMock', [])
  .service('dbService', function(PRODUCT_STORAGE_MOCK) {
    this.getView = function() {
      return {
        then: function(pluck) {
          return {
            then: function(format) {
              return format(pluck(PRODUCT_STORAGE_MOCK));
            }
          };
        }
      };
    };
  });
