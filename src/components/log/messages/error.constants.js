'use strict';

angular.module('log')
  .constant('ERROR_MESSAGES', {
    stateChangeError: {
      title: 'Application error',
      message: 'Could not load page',
      remedy: 'Please try that again'
    },
    saveFailed: {
      title: 'Save failed',
      message: 'Could not save that item',
      remedy: 'Please ensure the form is valid and try again'
    }
  });
