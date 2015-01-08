'use strict';

var Model = require('cooker.model');
var Collection = require('cooker.collection');

var Cooker = function() {
  this._collection = [];
};

/**
 * @param {string} name
 * @return {string}
 */
Cooker.prototype.get = function(name) {
  this.updateCollection();
  if (!this._collection.get(name)) return;
  return this._collection.get(name).value;
};

/**
 *  @param {string} name
 *  @param {string} value
 *  @return {void}
 */
Cooker.prototype.set = function(name, value) {
  new Model(name, value).save();
  this.updateCollection();
};

/**
 * @param {string} name
 * @param {string} [value]
 */
Cooker.prototype.cookie = function(name, value) {
  if (value) {
    this.set(name, value);
    return;
  }

  return this.get(name);
};

/**
 * create is not overwrite
 * @param {string} name
 * @param {string} value
 */
Cooker.prototype.create = function(name, value) {
  if (this.get(name)) return;
  this.set(name, value);
};

/**
 * @param {string} name
 */
Cooker.prototype.remove = function(name) {
  this._collection.get(name).remove();
  this.updateCollection;
};

Cooker.prototype.removeAll = function() {
  this.updateCollection();
  this._collection.removeAll();
  this.updateCollection;
};

Cooker.prototype.updateCollection = function() {
  if (document) {
    this._collection = new Collection(document.cookie);
  }
};


module.exports = Cooker;

global.cooker = function() {
  new Cooker();
};
