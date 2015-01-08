'use strict';

global.CookerModel = require('cooker.model');

var Cooker = function() {};

module.exports = Cooker;

global.cooker = function() {
  new Cooker();
};
