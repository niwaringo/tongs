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

module.exports = CookerModel;
