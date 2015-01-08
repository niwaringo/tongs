'use strict';

var Model = require('cooker.model');

var Cooker = function() {};

/**
 * @param {string} name
 * @param {string} value
 * @param {this}
 */
Cooker.prototype.cookie = function(name, value) {
  var model = new Model(name, value);
  model.save();
};

module.exports = Cooker;

global.cooker = function() {
  new Cooker();
};
