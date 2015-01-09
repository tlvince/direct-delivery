angular.module('delivery')
  .constant('DELIVERY_STEPS', {
    START: 1,
    DELIVER_ITEM: 2,
    COLLECT_KPI: 3,
    SIGN_OFF: 4
  });
