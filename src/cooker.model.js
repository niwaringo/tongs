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

  this._pushAttrs(this.name, this.value);
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

/**
 * @param {string} key
 * @param {string} value
 */
CookerModel.prototype._pushAttrs = function(key, value) {
  this.attrs.push(key + '=' + value);
};

module.exports = CookerModel;
