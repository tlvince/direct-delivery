'use strict';

angular.module('log')
  .constant('WARNING_MESSAGES', {
    dailyDeliveryUpdateNotSaved: {
      title: 'Daily delivery not saved',
      message: 'Daily delivery changes, if any, was not saved'
    },
    failedServerLogout: {
      title: 'Server logout',
      message: 'Failed to logout from server properly.'
    }
  });
