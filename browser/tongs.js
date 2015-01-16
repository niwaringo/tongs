(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Model = require('tongs.model');

function modelify(cookie) {
  var cookie_key_vals = cookie.split(/=(.+)/);

  return new Model(cookie_key_vals[0], cookie_key_vals[1]);
}

var TongsCollection = function(cookie) {
  this._models = this.toModels(cookie);
};

/**
 * @param {string} cookie
 * @return {array<Model>}
 */
TongsCollection.prototype.toModels = function(cookie) {
  if (Object.prototype.toString.call(cookie) === '[object String]') {
    return cookie.split('; ').map(function(cookie) {
      return modelify(cookie);
    });
  }
  // else if (Object.prototype.toString.call(cookie) === '[object Array]') {
  //   return cookie.map(function(cookie) {
  //     return modelify(cookie);
  //   });
  // }
  return [];
};

TongsCollection.prototype.get = function(name) {
  var _model;

  this.each(function(model) {
    if (model.name() === name) {
      _model = model;
      return;
    }
  });

  return _model;
};

/**
 * @param {function} callback
 */
TongsCollection.prototype.each = function(callback, thisArg) {
  this._models.forEach(function(model) {
    thisArg = thisArg || this;
    callback.call(thisArg, model);
  });
};

/**
 * @return {array<object>}
 */
TongsCollection.prototype.toJSON = function() {
  return this._models.map(function(model) {
    var json = {};
    json.name = model.name();
    json.value = model.value();

    return json;
  });
};

TongsCollection.prototype.removeAll = function() {
  this.each(function(model) {
    model.remove();
  });
};

module.exports = TongsCollection;

},{"tongs.model":3}],2:[function(require,module,exports){
(function (global){
'use strict';

var Model = require('tongs.model');
var Collection = require('tongs.collection');

var Tongs = function() {
  this.updateCollection();
};

/**
 * @param {string} name
 * @param {string} [value]
 */
Tongs.prototype.cookie = function(name, value, option) {
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
Tongs.prototype.get = function(name) {
  this.updateCollection();
  if (this._collection._models.length === 0 || !this._collection.get(name)) return '';
  return decodeURIComponent(this._collection.get(name).value());
};

/**
 *  @param {string} name
 *  @param {string} value
 *  @return {void}
 */
Tongs.prototype.set = function(name, value, option) {
  new Model(name, value, option).save();
};

/**
 * create is not overwrite
 * @param {string} name
 * @param {string} value
 */
Tongs.prototype.create = function(name, value) {
  if (this.get(name)) return false;
  this.set(name, value);
  return !!this.get(name);
};

/**
 * update is only overwrite
 * @param {string} name
 * @param {string} value
 */
Tongs.prototype.update = function(name, value) {
  if (!this.get(name)) return false;
  this.set(name, value);

  return this.get(name) === value;
};

/**
 * @return {array<object>}
 */
Tongs.prototype.toJSON = function() {
  this.updateCollection();
  return this._collection.toJSON();
};

/**
 * @param {function} callback
 */
Tongs.prototype.each = function(callback, thisArg) {
  this.updateCollection();
  this._collection.each(callback, thisArg);
};

/**
 * @param {string} name
 * @return {boolean}
 */
Tongs.prototype.remove = function(name, option) {
  if (!this.get(name)) return false;

  this.each(function(model) {
    if (model.name() === name) {
      model.remove(option);
    }
  });

  return !this.get(name);
};

// removeAll is test only
Tongs.prototype.removeAll = function() {
  this.updateCollection();
  this._collection.removeAll();
};

Tongs.prototype.updateCollection = function() {
  if (document) {
    this._collection = new Collection(document.cookie);
  }
};

module.exports = Tongs;

var instance;
global.tongs = function() {
  if (instance) return instance;

  instance = new Tongs();
  return instance;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"tongs.collection":1,"tongs.model":3}],3:[function(require,module,exports){
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
  this._name = encodeURIComponent(name);
  this._value = encodeURIComponent(value);
  this.attrs = [];
  this.option = option || {};

  this.attrs.push(concatKeyVal(this._name, this._value));
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
  this.attrs[0] = concatKeyVal(this._name, this._value);

  return this._value;
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

},{}]},{},[2]);
