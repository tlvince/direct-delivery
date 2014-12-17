/**
 * Created by ehealthafrica on 12/12/14.
 */
'use strict';

angular.module('scheduler')
  .service('scheduleService', function(){
     var now = new Date();
     function sameDate(d1, d2){
       if(
            d1.getFullYear() == d2.getFullYear() &
            d1.getMonth()  == d2.getMonth() &
            d1.getDate()   == d2.getDate()
         ){
          return true;
       }
       return false;
     }
    function dateRange (day, minDate, maxDate){
        var ms_in_day = 1000 * 60 * 60 * 24;
        var dayms = day.getTime();
        var minDatems = minDate.getTime();
        var maxDatems = maxDate.getTime() + ms_in_day;

        return (dayms >= minDatems) && (dayms <= maxDatems)
    }
    var compareDates = {
      sameDate : sameDate,
      dateRange : dateRange
    }
     this.scheduleDB = [
       {
         round : '16',
         status: 'active',
         startDate: new Date('12-15-2014'),
         endDate: new Date('12-17-2014'),
         driver: {
           email: 'driverA@ehealth.org.ng',
           name: 'Driver A'
         },
         deliveries: [
           {
             date: new Date('12-15-2014'),
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
             date: new Date('12-16-2014'),
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
             date: new Date('12-17-2014'),
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
                 window: "9am - 11am",
                 zone: 'Rano',
                 lga: 'Bebeji',
                 ward: 'Garmai',
                 contact: "HAJARA MOH'D",
                 number: '07067335948'
               },
               {
                 id: '10',
                 name: 'Tiga General Hospital',
                 drop: 2,
                 window: "9am - 11am",
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
    ]
    this.getCurrentRound = function(){
      for(var i = 0; i < this.scheduleDB.length; i++ ){
        if( compareDates.dateRange(now, this.scheduleDB[i].startDate, this.scheduleDB[i].endDate) ){
          return this.scheduleDB[i];
        }
      }
    }

    this.getAll = function(){

    }
    this.getDaySchedule = function(round){
      var roundData = this.getCurrentRound();

      for(var i = 0; i < roundData.deliveries.length; i++){
        if(compareDates.sameDate(roundData.deliveries[i].date, now)){
          return roundData.deliveries[i];
        }
      }
    }
  })