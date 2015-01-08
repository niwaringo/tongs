'use strict';

var Model = require('cooker.model');
var Collection = require('cooker.collection');

var Cooker = function() {
  this.updateCollection();
};

/**
 * @param {string} name
 * @param {string} [value]
 */
Cooker.prototype.cookie = function(name, value, option) {
  if (value) {
    this.set(name, value, option);
    return;
  }

  return this.get(name);
};

/**
 * @param {string} name
 * @return {string}
 */
Cooker.prototype.get = function(name) {
  if (this._collection._models.length === 0 || !this._collection.get(name)) return;
  return decodeURIComponent(this._collection.get(name).value);
};

/**
 *  @param {string} name
 *  @param {string} value
 *  @return {void}
 */
Cooker.prototype.set = function(name, value, option) {
  new Model(name, value, option).save();
  this.updateCollection();
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
 * update is only overwrite
 * @param {string} name
 * @param {string} value
 */
Cooker.prototype.update = function(name, value) {
  if (!this.get(name)) return;
  this.set(name, value);
};

/**
 * @return {array<object>}
 */
Cooker.prototype.toJSON = function() {
  return this._collection.toJSON();
};

/**
 * @param {function} callback
 */
Cooker.prototype.each = function(callback, thisArg) {
  this._collection.each(callback, thisArg);
};

/**
 * @param {string} name
 */
Cooker.prototype.remove = function(name) {
  this._collection.get(name).remove();
  this.updateCollection;
};

Cooker.prototype.removeAll = function() {
  this._collection.removeAll();
  this.updateCollection();
};

Cooker.prototype.updateCollection = function() {
  if (document) {
    this._collection = new Collection(document.cookie);
  }
};

module.exports = Cooker;

global.cooker = function() {
  return new Cooker();
};
