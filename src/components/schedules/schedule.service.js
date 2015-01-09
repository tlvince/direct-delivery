/**
 * Created by ehealthafrica on 12/12/14.
 */
'use strict';

angular.module('scheduler')
  .service('scheduleService', function(){
    var now = new Date();
    function sameDay(d1, d2){
      return (d1.format("DD-MM-YYYY") == d2.format('DD-MM-YYYY'));
     }
    function dateRange (minDate, maxDate){
      return (moment().isBetween(minDate, maxDate));
    }
    var compareDates = {
      sameDate : sameDay,
      dateRange : dateRange
    };
     this.scheduleDB = [
       {
         round : '16',
         status: 'active',
         startDate: moment('1-1-2015', 'DD-MM-YYYY'),
         endDate: moment('29-1-2015', 'DD-MM-YYYY'),
         driver: {
           email: 'driverA@ehealth.org.ng',
           name: 'Driver A'
         },
         deliveries: [
           {
             date: moment('14-1-2015', 'DD-MM-YYYY'),
             facilities: [
               {
                 id: '2572gs-26gyus',
                 name: 'Dala primary Health Facility'
               },
               {
                 id: '2',
                 name: 'Wudil Primary Health Facility'
               },
               {
                 id: '3',
                 name: 'Nassarawa Primary Health Facility'
               }
             ]
           },
           {
             date: moment('7-1-2015', 'DD-MM-YYYY'),
             facilities: [
               {
                 id: '4',
                 name: 'Gurawa'
               },
               {
                 id: '5',
                 name: 'Kibiya Primary Health Center',
               },
               {
                 id: '6',
                 name: 'Chasko Health Post'
               },
               {
                 id: '7',
                 name: 'Rurum Tsohon Gari Health Post'
               }
             ]
           },
           {
             date: moment('9-1-2015', 'DD-MM-YYYY'),
             facilities: [
               {
                 id: '8',
                 name: 'Ana Dariya Health Post',
                 drop: 1,
                 window: "9am - 11am",
                 zone: 'Rano',
                 lga: 'Bebeji',
                 ward: 'Ana Dariya',
                 contact: 'Ado Isiyaku',
                 number: '08032119746'
               },
               {
                 id: '9',
                 name: 'Tiga General Hospital',
                 drop: 2,
                 window: "11am - 1pm",
                 zone: 'Rano',
                 lga: 'Bebeji',
                 ward: 'Garmai',
                 contact: "HAJARA MOH'D",
                 number: '07067335948'
               },
               {
                 id: '10',
                 name: 'Tiga General Hospital',
                 drop: 3,
                 window: "1pm - 3pm",
                 zone: 'Rano',
                 lga: 'Bebeji',
                 ward: 'Garmai',
                 contact: "HAJARA MOH'D",
                 number: '07067335948'
               },
               {
                 id: '11',
                 name: 'Marika Mahuta Health Center'
               },
               {
                 id: '12',
                 name: 'Kan Iyaka Health Post'
               },
               {
                 id: '13',
                 name: 'Yarzabaina Town Clinic'
               }
             ]
           }
         ]
      }
    ];
    this.getCurrentRound = function(){
      for(var i = 0; i < this.scheduleDB.length; i++ ){
        if( compareDates.dateRange(this.scheduleDB[i].startDate, this.scheduleDB[i].endDate) ){
          return this.scheduleDB[i];
        }
      }
    };

    this.getAll = function(){

    };
    this.getDaySchedule = function(round){
      var roundData = this.getCurrentRound();
      if(angular.isObject(roundData)) {
        for (var i = 0; i < roundData.deliveries.length; i++) {
          if (compareDates.sameDate(roundData.deliveries[i].date, moment())) {
            return roundData.deliveries[i];
          }
        }
      }
      return {};
    }
  });