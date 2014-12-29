'use strict';

angular.module('auth')
  .config(function(pouchDBProvider, POUCHDB_DEFAULT_METHODS) {
    // seed asmCrypto PRNG for better security when creating random password salts
    asmCrypto.random.seed(window.crypto.getRandomValues(new Uint8Array(128)));

    pouchDBProvider.methods = POUCHDB_DEFAULT_METHODS.concat([
      'login',
      'logout',
      'getUser'
    ]);
  });
