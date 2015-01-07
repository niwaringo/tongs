/**
 *  @constructor
 *
 *  @param {string} name
 *  @param {string} value
 */
var CookerModel = function(name, value) {
  this.name = encodeURIComponent(name);
  this.value = encodeURIComponent(value);
};

CookerModel.prototype.toString = function() {
  return ([
    this.name + '=' + this.value
  ].join(''));
};

CookerModel.prototype.save = function() {
  document.cookie = this.toString();
};

module.exports = CookerModel;
