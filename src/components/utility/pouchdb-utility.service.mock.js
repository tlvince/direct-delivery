'use strict';

angular.module('pouchUtilMock', [])
  .constant('pluckResponseMock', {
    rows: [
      {
        key: 'key1',
        id: 'id1',
        value: 'value1',
        doc: {
          _id: 'doc1'
        }
      },
      {
        key: 'key2',
        id: 'id2',
        value: 'value2',
        doc: {
          _id: 'doc2'
        }
      }
    ]
  });
