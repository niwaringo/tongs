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
var TongsModel = function(name, value, option) {
  this.name = encodeURIComponent(name);
  this.value = encodeURIComponent(value);
  this.attrs = [];
  this.option = option || {};

  this.attrs.push(concatKeyVal(this.name, this.value));
  this.updateOptions(this.option);
};

/**
 * @param {object} option
 * @return {this}
 */
TongsModel.prototype.updateOptions = function(option) {
  this.option = extend(this.option, constructOptionObject(option));
  this.attrs.length = 1;
  
  var options = Object.keys(this.option).map(function(key) {
    return this.option[key];
  }, this);

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
  this.updateOptions(extend(option, {expires: new Date(1970, 1, 1)}));
  this.save();
};

module.exports = TongsModel;
