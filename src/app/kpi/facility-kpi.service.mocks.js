'use strict';

angular
		.module('facilityKPIMocks', [])
		.constant('validKPI', {
			"_id": "2164951f4fdd7e506c000a3dc4078ffb",
			"_rev": "2-8ad7f15835a637ad5b3bd1c1cdfd0627",
			"outreachSessions": 3,
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
					"noImmunized": 0
				},
				{
					"productID": "MV",
					"noImmunized": 0
				},
				{
					"productID": "OPV",
					"noImmunized": 0
				},
				{
					"productID": "IPV",
					"noImmunized": 0
				},
				{
					"productID": "TT",
					"noImmunized": 0
				},
				{
					"productID": "Penta",
					"noImmunized": 0
				},
				{
					"productID": "HBV",
					"noImmunized": 0
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
		})
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
					"noImmunized": 0
				},
				{
					"productID": "MV",
					"noImmunized": 0
				},
				{
					"productID": "OPV",
					"noImmunized": 0
				},
				{
					"productID": "IPV",
					"noImmunized": 0
				},
				{
					"productID": "TT",
					"noImmunized": 0
				},
				{
					"productID": "Penta",
					"noImmunized": 0
				},
				{
					"productID": "HBV",
					"noImmunized": 0
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
