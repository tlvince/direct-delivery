'use strict';

angular
  .module('facilityKPIMocks', [])
  .constant('facilityKPIMock', {
      "_id": "2164951f4fdd7e506c000a3dc4078ffb",
      "_rev": "2-8ad7f15835a637ad5b3bd1c1cdfd0627",
      "outreachSessions": "",
      "notes": "",
      "doc_type": "kpi",
      "date": "2015-05-27",
      "originRow": "163",
      "deliveryRoundID": "KN-21-2015",
      "driverID": "abdullahi@example.com",
      "version": "2.0.0",
      "worksheetId": "sheetId",
      "spreadsheetId": "uuid",
      "importedAt": "2015-05-16T12:03:26.801Z",
      "antigensKPI": [
        {
          "productID": "BCG",
          "noImmuized": 0
        },
        {
          "productID": "MV",
          "noImmuized": 0
        },
        {
          "productID": "OPV",
          "noImmuized": 0
        },
        {
          "productID": "IPV",
          "noImmuized": 0
        },
        {
          "productID": "TT",
          "noImmuized": 0
        },
        {
          "productID": "Penta",
          "noImmuized": 0
        },
        {
          "productID": "HBV",
          "noImmuized": 0
        }
      ],
      "facility": {
        "zone": "test zone",
        "lga": "test lga",
        "ward": "test ward",
        "name": "Test Health Post",
        "id": "NZ TSA 101",
        "contact": "Test Person",
        "phoneNo": 80232
      }
    });
