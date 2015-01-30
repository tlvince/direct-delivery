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
    dailyScheduleRetrival: {
      title: 'Daily schedule',
      message: 'Could not retrieve your daily schedule',
      remedy: 'Please check your internet connection and try again'
    },
    'requiredDocsFailed': {
      title: 'Incomplete Data',
      message: 'Incomplete required data, app may not function properly',
      remedy: 'Please, try again or contact support'
    }
  });
