'use strict';

angular.module('directDelivery', [
    'core',
    'navbar',
    'footer',
    'home',
    'home.schedule',
    'home.packing',
    'home.returned',
    'auth',
    'log',
    'login',
    'schedules',
    'schedules.round',
    'packing',
    'packing.all',
    'packing.item',
    'delivery',
    'loadingScreen',
    'db',
    'sync',
    'kpi'
  ])
  .run(function($rootScope, $state, AuthService, coreService) {

    function purgeStaleDocs() {
      coreService.purgeStaleDocuments();
    }

    function startSyncIfUserIsLoggedIn() {
      if (AuthService.isLoggedIn === true
          && AuthService.currentUser
          && angular.isString(AuthService.currentUser.name)) {
        coreService.startSyncAfterLogin(AuthService.currentUser.name);
      }
    }

    startSyncIfUserIsLoggedIn();
    purgeStaleDocs();

    $rootScope.$on('$stateChangeStart', function(event, toState) {
      if (!AuthService.isLoggedIn && toState.name !== 'login') {
        $state.transitionTo('login');
        event.preventDefault();
      }
    });

  });
