'use strict';

angular.module('directDelivery', [
    'core',
    'navbar',
    'footer',
    'home',
    'home.packing',
    'auth',
    'log',
    'login',
    'schedules',
    'schedules.round',
    'schedules.daily',
    'packing',
    'packing.all',
    'packing.item',
    'delivery'
  ])
  .run(function($rootScope, $state, AuthService) {
    $rootScope.$on('$stateChangeStart', function(event, toState) {
      if (!AuthService.isLoggedIn && toState.name !== 'login') {
        $state.transitionTo('login');
        event.preventDefault();
      }
    });
  });
