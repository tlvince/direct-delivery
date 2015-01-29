'use strict';

angular.module('loadingScreen')
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('loadingScreen', {
        parent: 'index',
        templateUrl: 'components/loading-screen/screen.html',
        url: '/loading-screen',
        controller: 'LoadingScreenCtrl',
        controllerAs: 'lsCtrl'
      })

  });
