'use strict';

angular.module('facilityKPIMocks', [])
  .constant('facilityKPIMock', {
    "outreachSessions": 0,
    "notes": "",
    "antigensKPI": [
      {
        "productID": "BCG",
        "noImmuized": 0
      },
      {
        "productID": "Men-A",
        "noImmuized": 0
      },
      {
        "productID": "OPV",
        "noImmuized": 0
      }
    ]
  });
