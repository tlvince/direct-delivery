'use strict';

/**
 * @name storageService
 * @desc
 */
angular.module('db')
  .service('dbService', function (pouchdbService, config) {

    var _this = this;
    var LOCAL_DB = config.localDB;
    var local = pouchdbService.create(LOCAL_DB);
    _this.local = local;

    _this.addTimeInfo = function (doc) {
      var now = new Date().toJSON();
      if (!doc.createdOn) {
        doc.createdOn = now;
      }
      doc.modifiedOn = now;
      return doc;
    };

    /**
     * This does the following:
     * 1. Update an existing document.
     * 2. Insert a new document that has _id property.
     * 3. Insert a new document that does not have _id property and assign it an _id.
     *
     * @param {Object} doc - document to be saved.
     * @returns {$promise}
     */
    _this.save = function (doc) {
      doc = _this.addTimeInfo(doc);
      if (doc._id) {
        return _this.update(doc)
          .catch(function () {
            return local.put(doc, doc._id)
              .then(function (res) {
                doc._id = res.id;
                doc._rev = res.rev;
                return doc;
              });
          });
      } else {
        return _this.insert(doc);
      }
    };

    _this.get = function (id) {
      return local.get(id);
    };

    /**
     * removes a document from the database.
     * @param doc - document to be removed requires at least _id and _rev property.
     * @returns {$promise}
     */
    _this.delete = function (doc) {
      return local.remove(doc)
        .then(function (res) {
          return res.id;
        });
    };

    /**
     * Used to save a new document without an _id property, Pouchdb or
     * underlying service should generate the _id.
     *
     * @param doc - a new document without an _id.
     * @returns {$promise}
     * @see http://pouchdb.com/api.html#create_document
     */
    _this.insert = function (doc) {
      doc = _this.addTimeInfo(doc);
      return local.post(doc)
        .then(function (res) {
          doc._id = res.id;
          doc._rev = res.rev;
          return doc;
        });
    };

    /**
     * Updates document only if it exists.
     *
     * @param doc - existing document with _id property.
     * @returns {$promise}
     */
    _this.update = function (doc) {
      doc = _this.addTimeInfo(doc);
      return local.get(doc._id)
        .then(function (res) {
          doc._rev = res._rev;
          return local.put(doc, doc._id)
            .then(function (res) {
              doc._id = res.id;
              doc._rev = res.rev;
              return doc;
            });
        });
    };

  });
