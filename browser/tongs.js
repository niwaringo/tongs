!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.tongs=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Tongs = require('tongs');

module.exports = new Tongs();

},{"tongs":2}],2:[function(require,module,exports){
'use strict';

function Tongs(cookies) {}

Tongs.prototype.cookie = function(name, value, option) {
  if (arguments.length > 0 && !value) return this.read(name);

  if (arguments.length === 0) {
    return this.readAll();
  }

  this.save(name, value, option);
};

Tongs.prototype.save = function(name, value, option) {
  document.cookie = cookieStringfy(name, encodeURIComponent(value), option);
};

Tongs.prototype.each = function(callback) {
  var cookie_stores = document.cookie.split('; ');
  var cookies = [];

  for (var i = 0, l = cookie_stores.length; i < l; i++) {
    cookies = reStructreCookie(cookie_stores[i]);
    callback.call(this, cookies);
  }
};

Tongs.prototype.read = function(name) {
  var value;
  this.each(function(cookie) {
    if (cookie[0] === name) {
      value = decodeURIComponent(cookie[1]);
    }
  });
  return value;
};

Tongs.prototype.readAll = function() {
  var cookies = [];

  this.each(function(cookie) {
    var obj = {};
    obj[cookie[0]] = cookie[1];
    cookies.push(obj);
  });

  return cookies;
};

Tongs.prototype.remove = function(name, option) {
  option = option || {};
  option.expires = -1;
  document.cookie = cookieStringfy(name, '', option);
  return !this.read(name);
};

Tongs.prototype.wideDomain = function() {
  var parts = location.hostname.split('.').reverse();
  var wide_domain = parts.shift();
  var c = '__tongs_test__';

  for (var i = 0, l = parts.length; i < l; i++) {
    wide_domain = parts[i] + '.' + wide_domain;

    if (i === (l - 1)) return wide_domain;

    this.save(c, c);
    if (this.read(c)) {
      this.remove(c);
      return '.' + wide_domain;
    }
  }
};

module.exports = Tongs;

function reStructreCookie(cookie_str) {
  var piece = cookie_str.split(/=/);
  var name = piece.shift();
  var value = piece.join('=');

  return [name, value];
}

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

},{}]},{},[1])(1)
});