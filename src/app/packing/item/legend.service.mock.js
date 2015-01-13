'use strict';


angular.module('packingItemLegendServiceMock', [])
  .service('couchdb', function() {
    var normalResponse = {
      rows: [
        {
          doc: {
            _id: 'product-storage/dry',
            label: 'label',
            description: 'description'
          }
        }
      ]
    };

    this.view = function() {
      return {
        $promise: {
          then: function(pluck) {
            return {
              then: function(format) {
                return format(pluck(normalResponse));
              }
            };
          }
        }
      };
    };
  });
