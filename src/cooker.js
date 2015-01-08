'use strict';

var Model = require('cooker.model');
var Collection = require('cooker.collection');

var Cooker = function() {
  this._collection = [];
  this.update();
};

/**
 * @param {string} name
 * @return {string}
 */
Cooker.prototype.get = function(name) {
  return this._collection.get(name).value;
};

/**
 *  @param {string} name
 *  @param {string} value
 *  @return {void}
 */
Cooker.prototype.set = function(name, value) {
  new Model(name, value).save();
  this.update();
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

Cooker.prototype.update = function() {
  if (document) {
    this._collection = new Collection(document.cookie);
  }
};

/**
 * @param {string} name
 */
Cooker.prototype.remove = function(name) {
  this._collection.get(name).remove();
};

Cooker.prototype.removeAll = function() {
  this.update();
  this._collection.removeAll();
};

module.exports = Cooker;

global.cooker = function() {
  new Cooker();
};
