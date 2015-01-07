'use strict';

var extend = require('util')._extend;

/**
 * @param {string || date} date
 */
function expireString(date) {
  switch(Object.prototype.toString.call(date)) {
    case "[object String]":
      return date;

    case "[object Date]":
      return date.toUTCString();

    default:
      return "";
  }
}

/**
 * @param {string} key
 * @param {string} value
 */
function concatKeyVal(key, value) {
  return key + '=' + value;
}

/**
 *  @constructor
 *
 *  @param {string} name
 *  @param {string} value
 */
var CookerModel = function(name, value) {
  this.name = encodeURIComponent(name);
  this.value = encodeURIComponent(value);
  this.attrs = [];
  this.attrs.push(concatKeyVal(this.name, this.value));
};

/**
 * @return {string}
 */
CookerModel.prototype.toString = function() {
  return this.attrs.join('; ');
};

CookerModel.prototype.save = function() {
  document.cookie = this.toString();
};

CookerModel.prototype._constructOptions = function(obj) {
};

module.exports = CookerModel;
