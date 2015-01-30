'use strict';

angular.module('home')
  .controller('HomeCtrl', function(HOME_TABS) {
    this.tabs = HOME_TABS;
  });
