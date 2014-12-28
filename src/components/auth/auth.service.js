'use strict';

angular.module('auth')
  .factory('AuthService', function($rootScope, $window, $q, $log, $localStorage, $sessionStorage, config) {
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
      var local = $localStorage.auth[storageKey(username)];

      if (local) {
        var deferred = $q.defer();

        if (hash(password, local.salt, local.iterations) === local.derived) {
          set(local.user);
          deferred.resolve(local.user);
        }
        else
          deferred.reject('authInvalid');

        return deferred.promise;
      }
      else {
        return service.loginToServer(username, password);
      }

    };

    service.loginToServer = function(username, password) {
      var db = new PouchDB(config.db);

      return db.login(username, password)
        .then(function(response) {
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
          return response;
        })
        .catch(function(err) {
          throw (err.name === 'unauthorized' ? 'authInvalid' : 'networkError');
        });
    };

    service.logout = function() {
      var db = new PouchDB(config.db);

      //TODO do we really need to logout from server??
      return db.logout()
        .catch(function(err) {
          console.warn('Failed to logout from server.');
          console.warn(err);
        })
        .then(function() {
          set(null);
        });
    };

    return service;
  });
