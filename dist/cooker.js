(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Model = require('cooker.model');

function modelify(cookie) {
  var cookie_key_vals = cookie.split(/=(.+)/);

  return new Model(cookie_key_vals[0], cookie_key_vals[1]);
}

var CookerCollection = function(cookie) {
  this._models = this.toModels(cookie);
};

/**
 * @param {string} cookie
 * @return {array<Model>}
 */
CookerCollection.prototype.toModels = function(cookie) {
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

CookerCollection.prototype.get = function(name) {
  var _model;

  this.each(function(model) {
    if (model.name === name) {
      _model = model;
      return;
    }
  });

  return _model;
};

/**
 * @param {function} callback
 */
CookerCollection.prototype.each = function(callback, thisArg) {
  this._models.forEach(function(model) {
    thisArg = thisArg || this;
    callback.call(thisArg, model);
  });
};

/**
 * @return {array<object>}
 */
CookerCollection.prototype.toJSON = function() {
  return this._models.map(function(model) {
    var json = {};
    json.name = model.name;
    json.value = decodeURIComponent(model.value);

    return json;
  });
};

CookerCollection.prototype.removeAll = function() {
  this.each(function(model) {
    model.remove();
  });
};

module.exports = CookerCollection;

},{"cooker.model":3}],2:[function(require,module,exports){
(function (global){
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
  this.updateCollection();
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
};

/**
 * create is not overwrite
 * @param {string} name
 * @param {string} value
 */
Cooker.prototype.create = function(name, value) {
  if (this.get(name)) return false;
  this.set(name, value);
  return !!this.get(name);
};

/**
 * update is only overwrite
 * @param {string} name
 * @param {string} value
 */
Cooker.prototype.update = function(name, value) {
  if (!this.get(name)) return false;
  this.set(name, value);

  return this.get(name) === value;
};

/**
 * @return {array<object>}
 */
Cooker.prototype.toJSON = function() {
  this.updateCollection();
  return this._collection.toJSON();
};

/**
 * @param {function} callback
 */
Cooker.prototype.each = function(callback, thisArg) {
  this.updateCollection();
  this._collection.each(callback, thisArg);
};

/**
 * @param {string} name
 * @return {boolean}
 */
Cooker.prototype.remove = function(name, option) {
  if (!this.get(name)) return false;

  this.each(function(model) {
    if (model.name === name) {
      model.remove(option);
    }
  });

  return !this.get(name);
};

// removeAll is test only
Cooker.prototype.removeAll = function() {
  this.updateCollection();
  this._collection.removeAll();
};

Cooker.prototype.updateCollection = function() {
  if (document) {
    this._collection = new Collection(document.cookie);
  }
};

module.exports = Cooker;

var instance;
global.cooker = function() {
  if (instance) return instance;

  instance = new Cooker();
  return instance;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"cooker.collection":1,"cooker.model":3}],3:[function(require,module,exports){
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
  this.option = option || {};

  this.attrs.push(concatKeyVal(this.name, this.value));
  this.updateOptions(this.option);
};

/**
 * @param {object} option
 * @return {this}
 */
CookerModel.prototype.updateOptions = function(option) {
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
CookerModel.prototype.toString = function() {
  return this.attrs.join('; ');
};

/**
 * @return {this}
 */
CookerModel.prototype.save = function() {
  document.cookie = this.toString();

  return this;
};

/**
 * @return {this}
 * @return {boolean}
 */
CookerModel.prototype.remove = function(option) {
  option = option || {};
  this.updateOptions(extend(option, {expires: new Date(1970, 1, 1)}));
  this.save();
};

module.exports = CookerModel;

},{}]},{},[2]);
