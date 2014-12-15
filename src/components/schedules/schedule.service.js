/**
 * Created by ehealthafrica on 12/12/14.
 */
'use strict';

angular.module('scheduler')
  .service('scheduleService', function(){

     this.scheduleDB = {
      '16':{
        status: 'active',
        startDate: '12-15-2014',
        endDate: '12-15-2014',
        driver:{
          email:'driverA@ehealth.org.ng',
          name:'Driver A'
        },
        deliveries:[
          {
            date: '12-15-2014',
            facilities:[
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
            date: '12-16-2014',
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
            date: '12-17-2014',
            facilities: [
              {
                id: '8',
                name: 'Sitti Basic Health Clinic'
              },
              {
                id: '9',
                name: 'Galadimawa Health Post'
              },
              {
                id: '10',
                name: 'Zabainawa Dansudu Health Post'
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
    }
    this.getCurrentRound = function(){

    }

    this.getAll = function(){

    }
    this.getDaySchedule = function(round){

    }
  })