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
    cookies = reStructreCookie(cookie_stores[i]);
    if (cookies[0] === name) return decodeURIComponent(cookies[1]);
  }
};

Tongs.prototype.remove = function(name, option) {
  option = option || {};
  option.expires = -1;
  document.cookie = cookieStringfy(name, '', option);
  return !this.read(name);
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
