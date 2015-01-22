'use strict';

var util = require('tongs.util');

/**
 *  @constructor
 *
 *  @param {string} name
 *  @param {string} value
 */
var TongsModel = function(name, value, option) {
  this._name = encodeURIComponent(name);
  this._value = encodeURIComponent(value);
  this.attrs = [];
  this.option = option || {};

  this.attrs.push(util.concatKeyVal(this._name, this._value));
  this.updateOptions(this.option);
};

/**
 * @param {string} new_name
 */
TongsModel.prototype.name = function() {
  return this._name;
};

/**
 * @param {string} new_value;
 */
TongsModel.prototype.value = function(new_value) {
  if (!new_value) return decodeURIComponent(this._value);

  this._value = new_value;
  this.attrs[0] = util.concatKeyVal(this._name, this._value);

  return decodeURIComponent(this._value);
};

/**
 * @param {object} option
 * @return {this}
 */
TongsModel.prototype.updateOptions = function(option) {
  this.option = util.extend(this.option, util.constructOptionObject(option));
  
  var options = util.map(this.option, function optionMap(value, key) {
    return value;
  });

  this.attrs.length = 1;
  this.attrs = this.attrs.concat(options);

  return this;
};

/**
 * @return {string}
 */
TongsModel.prototype.toString = function() {
  return this.attrs.join('; ');
};

/**
 * @return {this}
 */
TongsModel.prototype.save = function() {
  document.cookie = this.toString();

  return this;
};

/**
 * @return {this}
 * @return {boolean}
 */
TongsModel.prototype.remove = function(option) {
  option = option || {};
  this.updateOptions(util.extend(option, {expires: new Date(1970, 1, 1)}));
  this.save();
};

module.exports = TongsModel;
