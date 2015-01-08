'use strict';

var Model = require('cooker.model');
var Collection = require('cooker.collection');

var Cooker = function() {
  this._collection = [];

  this.update();
};

/**
 * @param {string} name
 * @param {string} value
 */
Cooker.prototype.cookie = function(name, value) {
  if (value) {
  }
  var model = new Model(name, value);
  model.save();
};

Cooker.prototype.update = function() {
  if (document) {
    this._collection = new Collection(document.cookie);
  }
};

Cooker.prototype.removeAll = function() {
  this.update();
  this._collection.removeAll();
};

module.exports = Cooker;

global.cooker = function() {
  new Cooker();
};
