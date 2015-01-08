'use strict';

angular.module('packing')
  .config(function($stateProvider) {
    $stateProvider.state('packing', {
      abstract: true,
      url: '/packing',
      parent: 'index',
      templateUrl: 'app/packing/packing.html',
      data: {
        label: 'Packing'
      }
    });
  });
