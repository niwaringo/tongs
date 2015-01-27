'use strict';

function Tongs(cookies) {}

Tongs.prototype.cookie = function(name, value, option) {
  if (!value) return this.read(name);

  this.save(name, value, option);
};

Tongs.prototype.save = function(name, value, option) {
  document.cookie = cookieStringfy(name, encodeURIComponent(value), option);
};

Tongs.prototype.read = function(name) {
  var cookie_stores = document.cookie.split('; ');
  var cookies = [];

  for (var i = 0, l = cookie_stores.length; i < l; i++) {
    cookies = cookie_stores[i].split(/=(.+)/);
    if (cookies[0] === name) return decodeURIComponent(cookies[1]);
  }
};

Tongs.prototype.remove = function(name) {
  document.cookie = cookieStringfy(name, '', {expires: -1});
};

module.exports = Tongs;

function cookieStringfy(name, value, option) {
  var option_str = optionStringfy(option);
  return ([
  name, '=', value,
  option_str
  ].join(''));
}

function optionStringfy(option) {
  if (!option) return '';
  return ([
    option.expires? '; expires=' + expiresString(option.expires): '',
    option.path    ? '; path=' + option.path : '',
    option.domain  ? '; domain=' + option.domain : '',
    option.secure  ? '; secure' : ''
  ].join(''));
}

function expiresString(date) {
  if (Object.prototype.toString.call(date) === '[object Date]') {
    return date.toUTCString();
  }
  if (Object.prototype.toString.call(+date) === '[object Number]') {
    return new Date(+new Date() + (date * 864e+5)).toUTCString();
  }
  return '';
}

// var Model = require('tongs.model');
// var Collection = require('tongs.collection');
//
// var Tongs = function() {
//   this.updateCollection();
// };
//
// /**
//  * @param {string} name
//  * @param {string} [value]
//  */
// Tongs.prototype.cookie = function(name, value, option) {
//   if (value) {
//     this.set(name, value, option);
//     return;
//   }
//
//   return this.get(name);
// };
//
// /**
//  * @param {string} name
//  * @return {string}
//  */
// Tongs.prototype.get = function(name) {
//   this.updateCollection();
//   if (this._collection._models.length === 0 || !this._collection.get(name)) return '';
//   return decodeURIComponent(this._collection.get(name).value());
// };
//
// /**
//  *  @param {string} name
//  *  @param {string} value
//  *  @return {void}
//  */
// Tongs.prototype.set = function(name, value, option) {
//   new Model(name, value, option).save();
// };
//
// /**
//  * create is not overwrite
//  * @param {string} name
//  * @param {string} value
//  */
// Tongs.prototype.create = function(name, value) {
//   if (this.get(name)) return false;
//   this.set(name, value);
//   return !!this.get(name);
// };
//
// /**
//  * update is only overwrite
//  * @param {string} name
//  * @param {string} value
//  */
// Tongs.prototype.update = function(name, value) {
//   if (!this.get(name)) return false;
//   this.set(name, value);
//
//   return this.get(name) === value;
// };
//
// /**
//  * @return {array<object>}
//  */
// Tongs.prototype.toJSON = function() {
//   this.updateCollection();
//   return this._collection.toJSON();
// };
//
// /**
//  * @param {function} callback
//  */
// Tongs.prototype.each = function(callback, thisArg) {
//   this.updateCollection();
//   this._collection.each(callback, thisArg);
// };
//
// /**
//  * @param {string} name
//  * @return {boolean}
//  */
// Tongs.prototype.remove = function(name, option) {
//   if (!this.get(name)) return false;
//
//   this.each(function(model) {
//     if (model.name() === name) {
//       model.remove(option);
//     }
//   });
//
//   return !this.get(name);
// };
//
// // removeAll is test only
// Tongs.prototype.removeAll = function() {
//   this.updateCollection();
//   this._collection.removeAll();
// };
//
// Tongs.prototype.updateCollection = function() {
//   if (document) {
//     this._collection = new Collection(document.cookie);
//   }
// };
//
// module.exports = Tongs;
//
// var instance;
// global.tongs = function() {
//   if (instance) return instance;
//
//   instance = new Tongs();
//   return instance;
// };
