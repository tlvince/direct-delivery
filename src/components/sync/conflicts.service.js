'use strict';

angular.module('sync')
  .service('conflictsService', function(
    config,
    pouchdbService
  ) {
    var listening = false;

    function conflictsListener() {
      var db = pouchdbService.remote(config.db);

      function resolveFun(remoteDoc, localDoc) {
        if (!(remoteDoc.modifiedOn && localDoc.modifiedOn)) {
          // Cannot resolve the conflict
          return null;
        }

        var remoteDate = new Date(remoteDoc.modifiedOn).getTime();
        var localDate = new Date(localDoc.modifiedOn).getTime();

        if (isNaN(remoteDate) || isNaN(localDate)) {
          // modifiedOn was not a valid data
          // Cannot resolve the conflict
          return null;
        }

        if (remoteDate > localDate) {
          return remoteDoc;
        }

        return localDoc;
      }

      function changeHandler(change) {
        if (!(change.doc && change.doc._conflicts)) {
          return;
        }
        db.resolveConflicts(change.doc, resolveFun);
      }

      function toggleListening() {
        listening = false;
      }

      var options = {
        live: true,
        /*eslint-disable camelcase */
        include_docs: true,
        /*eslint-enable camelcase */
        conflicts: true
      };

      db.changes(options)
        .on('change', changeHandler)
        .on('complete', toggleListening)
        .on('error', toggleListening);

      listening = true;
    }

    this.maybeListenForConflicts = function() {
      if (listening) {
        return;
      }
      conflictsListener();
    };
  });
