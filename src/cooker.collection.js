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
  else if (Object.prototype.toString.call(cookie) === '[object Array]') {
    return cookie.map(function(cookie) {
      return modelify(cookie);
    });
  }

  return [];
};

CookerCollection.prototype.get = function(name) {
  var _model;

  this._models.forEach(function(model) {
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
 * @param {function} callback
 * @return {array}
 */
CookerCollection.prototype.filter = function(callback, thisArg) {
  var cookies = [];

  this._models.map(function(model) {
    thisArg = thisArg || this;
    if (callback.call(thisArg, model)) {
      cookies.push(decodeURIComponent(model.attrs[0]));
    }
  });
  return new CookerCollection(cookies);
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

CookerCollection.prototype.saveAll = function() {
  this._models.forEach(function(model) {
    model.save();
  });
};

CookerCollection.prototype.removeAll = function() {
  this._models.forEach(function(model) {
    model.remove();
  });
};

module.exports = CookerCollection;
