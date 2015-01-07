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

module.exports = CookerModel;
