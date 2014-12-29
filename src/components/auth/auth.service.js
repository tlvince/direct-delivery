'use strict';

(function() {
  angular.module('auth').service('AuthService', AuthService);

  function AuthService($rootScope, $window, $q, $localStorage, $sessionStorage, pouchDB, config) {
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

    // init current user from session
    var currentUser = $sessionStorage.user || null;

    // properties
    Object.defineProperty(this, 'currentUser', {
      get: function() {
        return currentUser;
      }
    });

    Object.defineProperty(this, 'isLoggedIn', {
      get: function() {
        return !!currentUser;
      }
    });

    // methods
    this.setCurrentUser = function(user) {
      if (user !== currentUser) {
        currentUser = user;
        $sessionStorage.user = user;

        $rootScope.$emit('currentUserChanged', user);
      }
    };

    this.login = function(username, password) {
      if (!username || !password)
        return $q.reject('authInvalid');

      var local = $localStorage.auth[storageKey(username)];

      if (local) {
        var deferred = $q.defer();

        if (hash(password, local.salt, local.iterations) === local.derived) {
          this.setCurrentUser(local.user);
          deferred.resolve(local.user);
        }
        else
          deferred.reject('authInvalid');

        return deferred.promise;
      }

      return this.loginToServer(username, password);
    };

    this.loginToServer = function(username, password) {
      if (!username || !password)
        return $q.reject('authInvalid');

      var db = new pouchDB(config.db);

      return db.login(username, password)
        .then(function() {
          return db.getUser(username);
        })
        .then(function(response) {
          var salt = asmCrypto.bytes_to_hex($window.crypto.getRandomValues(new Uint8Array(16)));
          var iterations = 10;
          var derived = hash(password, salt, iterations);
          var user = _.pick(response, ['_id', '_rev', 'name', 'roles']);

          $localStorage.auth[storageKey(username)] = {
            day: day(),
            salt: salt,
            iterations: iterations,
            derived: derived,
            user: user
          };

          this.setCurrentUser(user);
          return user;
        }.bind(this))
        .catch(function(err) {
          throw (err.name === 'unauthorized' ? 'authInvalid' : 'networkError');
        });
    };

    this.logout = function() {
      var db = new pouchDB(config.db);

      //TODO do we really need to logout from server??
      return db.logout()
        .catch(function(err) {
          console.warn('Failed to logout from server.');
          console.warn(err);
        })
        .then(function() {
          this.setCurrentUser(null);
        }.bind(this));
    };
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
})();
