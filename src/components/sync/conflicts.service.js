'use strict';

angular.module('sync')
  .service('conflictsService', function(
    log,
    config,
    pouchdbService,
    deliveryService,
    CONFLICTS_DOCTYPE_WHITELIST
  ) {
    var listening = false;

    function conflictsListener() {
      var db = pouchdbService.remote(config.db);

      function resolveFun(remoteDoc, localDoc) {
        // Remote should always win for doc types not in the whitelist, e.g.
        // those that should not be modified on the phone.
        if (CONFLICTS_DOCTYPE_WHITELIST.indexOf(remoteDoc.doc_type) === -1) {
          log.info('conflictResolved');
          return remoteDoc;
        }

        if (!(remoteDoc.modifiedOn && localDoc.modifiedOn)) {
          // Cannot resolve the conflict
          return null;
        }

        if (localDoc.doc_type === 'dailyDelivery') {
          if (deliveryService.isDelivered(localDoc)) {
            log.info('conflictResolved');
            return localDoc;
          }
        }

        var remoteDate = new Date(remoteDoc.modifiedOn).getTime();
        var localDate = new Date(localDoc.modifiedOn).getTime();

        if (isNaN(remoteDate) || isNaN(localDate)) {
          // modifiedOn was not a valid date
          // Cannot resolve the conflict
          return null;
        }

        if (remoteDate > localDate) {
          log.info('conflictResolved');
          return remoteDoc;
        }

        log.info('conflictResolved');
        return localDoc;
      }

      function changeHandler(change) {
        if (!(change.doc && change.doc._conflicts && change.doc.doc_type)) {
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
