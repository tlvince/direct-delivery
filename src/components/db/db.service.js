'use strict';

/**
 * @name storageService
 * @desc
 */
angular.module('db')
  .service('dbService', ['pouchdbService', 'config', function (pouchdbService, config) {

    var obj = this;
    var LOCAL_DB = config.localDB;
    var local = pouchdbService.create(LOCAL_DB);
    obj.local = local;

    /**
     * This does the following:
     * 1. Update an existing document.
     * 2. Insert a new document that has _id property.
     * 3. Insert a new document that does not have _id property and assign it an _id.
     *
     * @param {Object} doc - document to be saved.
     * @returns {$promise}
     */
    obj.save = function (doc) {
      if ('_id' in doc) {
        return local.get(doc._id)
          .then(function (res) {
            doc._rev = res._rev;
            return local.put(doc, doc._id);
          })
          .catch(function () {
            return local.put(doc, doc._id);
          });
      } else {
        return obj.insert(doc);
      }
    };

    obj.get = function (id) {
      return local.get(id);
    };

    /**
     * removes a document from the database.
     * @param doc - document to be removed requires at least _id and _rev property.
     * @returns {$promise}
     */
    this.delete = function (doc) {
      return local.remove(doc);
    };

    /**
     * Used to save a new document without an _id property, Pouchdb or
     * underlying service should generate the _id.
     *
     * @param doc - a new document without an _id.
     * @returns {$promise}
     * @see http://pouchdb.com/api.html#create_document
     */
    obj.insert = function (doc) {
      return local.post(doc);
    };

    /**
     * Updates document only if it exists.
     *
     * @param doc - existing document with _id property.
     * @returns {$promise}
     */
    obj.update = function (doc) {
      return local.get(doc._id)
        .then(function (res) {
          doc._rev = res._rev;
          return local.put(doc, doc._id);
        });
    };

  }]);
