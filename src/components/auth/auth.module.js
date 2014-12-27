'use strict';

angular.module('auth', [
    'ngStorage',
    'config'
  ])
  .config(function() {
    // seed asmCrypto PRNG for better security when creating random password salts
    asmCrypto.random.seed(window.crypto.getRandomValues(new Uint8Array(128)));
  });
