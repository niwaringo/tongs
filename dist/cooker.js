(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

global.CookerModel = require('cooker.model');

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"cooker.model":2}],2:[function(require,module,exports){
'use strict';

var opt = {
  /**
   * @param {string || date} date
   */
  'expires': function(date) {
    var date_str = "";

    switch(Object.prototype.toString.call(date)) {
      case "[object Date]":
        date_str = date.toUTCString();
      break;

      case "[object String]":
        date_str = date;
      break;

      default:
        date_str = "";
    }

    return concatKeyVal('expires', date_str);
  },

  'path': function(path) {
    return concatKeyVal('path', path);
  },

  'domain': function(domain) {
    return concatKeyVal('domain', domain);
  },

  'secure': function(secure) {
    return secure;
  }
};

/**
 * copy node-util extend
 */
function extend(origin, add) {
  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
}

/**
 * @param {string} key
 * @param {string} value
 */
function concatKeyVal(key, value) {
  return key + '=' + value;
}

/**
 * @param {object} obj
 * @return {object}
 */
function constructOptionObject(obj) {
  var _obj = {};

  Object.keys(obj).forEach(function(key) {
    if (!(key in opt)) return;
    _obj[key] = opt[key](obj[key]);
  });

  return _obj;
}

/******************** main ********************/

/**
 *  @constructor
 *
 *  @param {string} name
 *  @param {string} value
 */
var CookerModel = function(name, value, option) {
  this.name = encodeURIComponent(name);
  this.value = encodeURIComponent(value);
  this.attrs = [];
  this.option = {};

  this.attrs.push(concatKeyVal(this.name, this.value));
  this.updateOptions(option);
};

/**
 * @param {object} option
 * @return {void}
 */
CookerModel.prototype.updateOptions = function(option) {
  this.option = extend(this.option, constructOptionObject(option));
  this.attrs.length = 1;
  
  var options = Object.keys(this.option).map(function(key) {
    return this.option[key];
  }, this);

  this.attrs = this.attrs.concat(options);
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

CookerModel.prototype._constructOptions = function(option) {
  if (!option) return;

  var _options = {};
};

module.exports = CookerModel;

},{}]},{},[1]);
