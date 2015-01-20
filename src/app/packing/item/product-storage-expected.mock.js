'use strict';

angular.module('productStorageMockExpected', [])
  .constant('PRODUCT_STORAGE_MOCK', {
    rows: [
      {
        doc: {
          _id: 'product-storage/dry',
          label: 'label',
          description: 'description'
        }
      }
    ]
  });
