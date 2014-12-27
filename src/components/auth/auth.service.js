'use strict';

angular.module('auth')
  .factory('AuthService', function($rootScope, $window, $q, $localStorage, $sessionStorage, config) {
    var currentUser = null;

    // cleanup and prepare auth storage
    if ($localStorage.auth) {
      var d = day();
      angular.forEach($localStorage.auth, function(value, key) {
        if (value.day != d)
          delete $localStorage.auth[key];
      });
    }
    else
      $localStorage.auth = {};

    // set current user from session
    currentUser = $sessionStorage.user || null;

    // helpers
    function set(user) {
      if (user !== currentUser) {
        currentUser = user;
        $sessionStorage.user = user;

        $rootScope.$emit('currentUserChanged', user);
      }
    }

    function day() {
      return moment().format('YYYYMMDD');
    }

    function storageKey(username) {
      return username + day();
    }

    function hash(password, salt, iterations) {
      return asmCrypto.PBKDF2_HMAC_SHA256.hex(password, salt, iterations);
    }

    // service
    var service = {};

    service.currentUser = function() {
      return currentUser;
    };

    service.login = function(username, password) {
      var deferred = $q.defer();

      var local = $localStorage.auth[storageKey(username)];
      if (local) {
        if (hash(password, local.salt, local.iterations) === local.derived) {
          set(local.user);
          deferred.resolve(local.user);
        }
        else
          deferred.reject(new Error('Invalid username or password'));
      }
      else {
        service.loginToServer(username, password)
          .then(function(user) {
            deferred.resolve(user);
          })
          .catch(function(err) {
            deferred.reject(err);
          });
      }

      return deferred.promise;
    };

    service.loginToServer = function(username, password) {
      var db = new PouchDB(config.db);
      var deferred = $q.defer();

      db.login(username, password, function(err, response) {
        if (err) {
          if (err.name === 'conflict')
            err = new Error('Invalid username or password');

          deferred.reject(err);
        }
        else {
          var salt = asmCrypto.bytes_to_hex($window.crypto.getRandomValues(new Uint8Array(16)));
          var iterations = 10;
          var derived = hash(password, salt, iterations);

          response.name = username;

          $localStorage.auth[storageKey(username)] = {
            day: day(),
            salt: salt,
            iterations: iterations,
            derived: derived,
            user: response
          };

          set(response);
          deferred.resolve(response);
        }
      });

      return deferred.promise;
    };

    return service;
  });
