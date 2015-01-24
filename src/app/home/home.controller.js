'use strict';

angular.module('home')
  .controller('HomeCtrl', function(dailySchedule){
    var vm = this;
    vm.dailyDelivery= dailySchedule[0];
  });
