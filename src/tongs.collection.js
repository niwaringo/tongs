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
