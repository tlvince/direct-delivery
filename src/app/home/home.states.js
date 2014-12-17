'use strict';

angular.module('home')
  .config(function($stateProvider) {
    $stateProvider.state('home', {
      url: '/',
      parent: 'index',
      templateUrl: 'app/home/home.html',
      data: {
        label: 'Home'
      },
      controller: 'homeCtrl'
    })
    .state('facilities', {
      url: '/facilities'
    });
  });
