angular.module('db')
  .config(function (pouchDBProvider, POUCHDB_METHODS) {
    var persistMethods = {
      persist: 'eventEmitter'
    };

    pouchDBProvider.methods = angular.extend({}, POUCHDB_METHODS, persistMethods);
  });
