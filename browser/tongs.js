(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var objKeys = require('amp-keys');
var createCallback = require('amp-create-callback');


module.exports = function each(obj, iteratee, context) {
    if (obj == null) return obj;
    iteratee = createCallback(iteratee, context);
    var i, length = obj.length;
    if (length === +length) {
        for (i = 0; i < length; i++) {
            iteratee(obj[i], i, obj);
        }
    } else {
        var keys = objKeys(obj);
        for (i = 0, length = keys.length; i < length; i++) {
            iteratee(obj[keys[i]], keys[i], obj);
        }
    }
    return obj;
};

},{"amp-create-callback":2,"amp-keys":3}],2:[function(require,module,exports){
module.exports = function createCallback(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount) {
    case 1: 
        return function(value) {
            return func.call(context, value);
        };
    case 2: 
        return function(value, other) {
            return func.call(context, value, other);
        };
    case 3: 
        return function(value, index, collection) {
            return func.call(context, value, index, collection);
        };
    case 4: 
        return function(accumulator, value, index, collection) {
            return func.call(context, accumulator, value, index, collection);
        };
    }
    return function() {
        return func.apply(context, arguments);
    };
};

},{}],3:[function(require,module,exports){
var has = require('amp-has');
var indexOf = require('amp-index-of');
var isObject = require('amp-is-object');
var nativeKeys = Object.keys;
var hasEnumBug = !({toString: null}).propertyIsEnumerable('toString');
var nonEnumerableProps = ['constructor', 'valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];


module.exports = function keys(obj) {
    if (!isObject(obj)) return [];
    if (nativeKeys) {
        return nativeKeys(obj);
    }
    var result = [];
    for (var key in obj) if (has(obj, key)) result.push(key);
    // IE < 9
    if (hasEnumBug) {
        var nonEnumIdx = nonEnumerableProps.length;
        while (nonEnumIdx--) {
            var prop = nonEnumerableProps[nonEnumIdx];
            if (has(obj, prop) && indexOf(result, prop) === -1) result.push(prop);
        }
    }
    return result;
};

},{"amp-has":4,"amp-index-of":5,"amp-is-object":7}],4:[function(require,module,exports){
var hasOwn = Object.prototype.hasOwnProperty;


module.exports = function has(obj, key) {
    return obj != null && hasOwn.call(obj, key);
};

},{}],5:[function(require,module,exports){
var isNumber = require('amp-is-number');


module.exports = function indexOf(arr, item, from) {
    var i = 0;
    var l = arr && arr.length;
    if (isNumber(from)) {
        i = from < 0 ? Math.max(0, l + from) : from;
    }
    for (; i < l; i++) {
        if (arr[i] === item) return i;
    }
    return -1;
};

},{"amp-is-number":6}],6:[function(require,module,exports){
var toString = Object.prototype.toString;


module.exports = function isNumber(obj) {
    return toString.call(obj) === '[object Number]';
};

},{}],7:[function(require,module,exports){
module.exports = function isObject(obj) {
    var type = typeof obj;
    return !!obj && (type === 'function' || type === 'object');
};

},{}],8:[function(require,module,exports){
var createIteratee = require('amp-iteratee');
var objKeys = require('amp-keys');


module.exports = function map(obj, iteratee, context) {
    if (obj == null) return [];
    iteratee = createIteratee(iteratee, context, 3);
    var keys = obj.length !== +obj.length && objKeys(obj);
    var length = (keys || obj).length;
    var results = Array(length);
    var currentKey;
    var index = 0;
    for (; index < length; index++) {
        currentKey = keys ? keys[index] : index;
        results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
};

},{"amp-iteratee":9,"amp-keys":16}],9:[function(require,module,exports){
var isFunction = require('amp-is-function');
var isObject = require('amp-is-object');
var createCallback = require('amp-create-callback');
var matches = require('amp-matches');
var property = require('amp-property');
var identity = function (val) { return val; };


module.exports = function iteratee(value, context, argCount) {
    if (value == null) return identity;
    if (isFunction(value)) return createCallback(value, context, argCount);
    if (isObject(value)) return matches(value);
    return property(value);
};

},{"amp-create-callback":10,"amp-is-function":11,"amp-is-object":12,"amp-matches":13,"amp-property":15}],10:[function(require,module,exports){
arguments[4][2][0].apply(exports,arguments)
},{"dup":2}],11:[function(require,module,exports){
var toString = Object.prototype.toString;
var func = function isFunction(obj) {
    return toString.call(obj) === '[object Function]';
};

// Optimize `isFunction` if appropriate. Work around an IE 11 bug.
if (typeof /./ !== 'function') {
    func = function isFunction(obj) {
      return typeof obj == 'function' || false;
    };
}

module.exports = func;

},{}],12:[function(require,module,exports){
arguments[4][7][0].apply(exports,arguments)
},{"dup":7}],13:[function(require,module,exports){
var getPairs = require('amp-pairs');


module.exports = function matches(attrs) {
    var pairs = getPairs(attrs);
    var length = pairs.length;
    return function(obj) {
        if (obj == null) return !length;
        obj = new Object(obj);
        for (var i = 0; i < length; i++) {
            var pair = pairs[i], key = pair[0];
            if (pair[1] !== obj[key] || !(key in obj)) return false;
        }
        return true;
    };
};

},{"amp-pairs":14}],14:[function(require,module,exports){
var objKeys = require('amp-keys');


module.exports = function pairs(obj) {
    var keys = objKeys(obj);
    var length = keys.length;
    var result = Array(length);
    for (var i = 0; i < length; i++) {
        result[i] = [keys[i], obj[keys[i]]];
    }
    return result;
};

},{"amp-keys":16}],15:[function(require,module,exports){
module.exports = function property(key) {
    return function(obj) {
        return obj == null ? void 0 : obj[key];
    };
};

},{}],16:[function(require,module,exports){
arguments[4][3][0].apply(exports,arguments)
},{"amp-has":17,"amp-index-of":18,"amp-is-object":20,"dup":3}],17:[function(require,module,exports){
arguments[4][4][0].apply(exports,arguments)
},{"dup":4}],18:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"amp-is-number":19,"dup":5}],19:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],20:[function(require,module,exports){
arguments[4][7][0].apply(exports,arguments)
},{"dup":7}],21:[function(require,module,exports){
arguments[4][2][0].apply(exports,arguments)
},{"dup":2}],22:[function(require,module,exports){
arguments[4][3][0].apply(exports,arguments)
},{"amp-has":23,"amp-index-of":24,"amp-is-object":26,"dup":3}],23:[function(require,module,exports){
arguments[4][4][0].apply(exports,arguments)
},{"dup":4}],24:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"amp-is-number":25,"dup":5}],25:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],26:[function(require,module,exports){
arguments[4][7][0].apply(exports,arguments)
},{"dup":7}],27:[function(require,module,exports){
var createCallback = require('amp-create-callback');
var objKeys = require('amp-keys');


module.exports = function reduce(obj, iteratee, memo, context) {
    if (obj == null) obj = [];
    iteratee = createCallback(iteratee, context, 4);
    var keys = obj.length !== +obj.length && objKeys(obj);
    var length = (keys || obj).length;
    var index = 0;
    var currentKey;
    if (arguments.length < 3) {
        if (!length) {
            throw new TypeError('Reduce of empty array with no initial value');
        }
        memo = obj[keys ? keys[index++] : index++];
    }
    for (; index < length; index++) {
        currentKey = keys ? keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
    }
    return memo;
};

},{"amp-create-callback":21,"amp-keys":22}],28:[function(require,module,exports){
var Model = require('tongs.model');
var util = require('tongs.util');

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
    return util.map(cookie.split('; '), function(cookie) {
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
  util.each(this._models, function(model) {
    thisArg = thisArg || this;
    callback.call(thisArg, model);
  });
};

/**
 * @return {array<object>}
 */
TongsCollection.prototype.toJSON = function() {
  return util.map(this._models, function(model) {
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

},{"tongs.model":30,"tongs.util":31}],29:[function(require,module,exports){
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
},{"tongs.collection":28,"tongs.model":30}],30:[function(require,module,exports){
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

},{"tongs.util":31}],31:[function(require,module,exports){
var util = {
  opt: {
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

      return util.concatKeyVal('expires', date_str);
    },

    'path': function(path) {
      return util.concatKeyVal('path', path);
    },

    'domain': function(domain) {
      return util.concatKeyVal('domain', domain);
    },

    'secure': function(secure) {
      return secure;
    }
  },

  /**
   * @param {string} key
   * @param {string} value
   */
  concatKeyVal: function concatKeyVal(key, value) {
    return key + '=' + value;
  },

  /**
   * copy node-util extend
   */
  extend: function extend(origin, add) {
    var keys = Object.keys(add);
    var i = keys.length;
    while (i--) {
      origin[keys[i]] = add[keys[i]];
    }
    return origin;
  },

  /**
   * @param {object} obj
   * @return {object}
   */
  constructOptionObject: function constructOptionObject(obj) {
    return util.reduce(obj, function(_obj, value, key) {
      if (!(key in util.opt)) return;
      _obj[key] = util.opt[key](obj[key]);
      return _obj;
    }, {});
  },

  each: require('amp-each'),
  map: require('amp-map'),
  reduce: require('amp-reduce')
};

module.exports = util;

},{"amp-each":1,"amp-map":8,"amp-reduce":27}]},{},[29]);
