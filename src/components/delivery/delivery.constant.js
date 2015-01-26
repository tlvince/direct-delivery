angular.module('delivery')
  .constant('STATUS', {
    PENDING: 'pending',
    CANCELLED_AHEAD: 'cancelled-ahead',
    CANCELLED: 'cancelled',
    COMPLETE: 'completed'
  });
