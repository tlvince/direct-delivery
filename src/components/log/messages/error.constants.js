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
    },
    authInvalid: {
      title: 'Authentication',
      message: 'Invalid username or password',
      remedy: 'Please try again'
    },
    networkError: {
      title: 'Network',
      message: 'Network error',
      remedy: 'Please check your internet connection and try again'
    },
    invalidCancelReport: {
      title: 'Invalid cancel report',
      message: 'Reason not selected',
      remedy: 'Please, select reason for cancelling delivery'
    },
    'invalidSignature': {
      title: 'Invalid signature',
      message: 'Signature not signed',
      remedy: 'Please, sign and click ok'
    },
    'facilityRoundNotSet': {
      title: 'Cancel delivery',
      message: 'Invalid facility round',
      remedy: 'Please, select valid facility round'
    },
    'dailyDeliveryFailed': {
      title: 'Daily Delivery',
      message: 'Saving delivery report failed',
      remedy: 'Please, try again. if it continues, contact support'
    }
  });
