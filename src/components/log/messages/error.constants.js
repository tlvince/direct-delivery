'use strict';

angular.module('log')
  .constant('ERROR_MESSAGES', {
    stateChangeError: {
      title: 'Application error',
      message: 'Could not load page',
      remedy: 'Please try that again'
    }
  });
