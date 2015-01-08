var Model = require('cooker.model');

var CookerCollection = function(cookie) {
  this._models = this.toModels(cookie);
};

function modelify(cookie) {
  var cookie_key_vals = cookie.split(/=(.+)/);

  return new Model(cookie_key_vals[0], cookie_key_vals[1]);
}

/**
 * @param {string} cookie
 * @return {array<Model>}
 */
CookerCollection.prototype.toModels = function(cookie) {
  return cookie.split('; ').map(function(cookie) {
    return modelify(cookie);
  });
};

CookerCollection.prototype.get = function(name) {
  var _model;

  this._models.some(function(model) {
    if (model.name === name) {
      _model = model;
      return;
    }
  });

  return _model;
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
