"use strict";

function reStructreCookie(cookieStr) {
  var piece = cookieStr.split(/=/);
  var name = piece.shift();
  var value = piece.join("=");
  return [name, value];
}

function expiresString(date) {
  if (Object.prototype.toString.call(date) === "[object Date]") {
    return date.toUTCString();
  }
  if (Object.prototype.toString.call(+date) === "[object Number]") {
    return new Date(+new Date() + (date * 864e+5)).toUTCString();
  }
  return "";
}


function optionStringfy(option) {
  if (!option) return "";
  return ([
    option.expires ? "; expires=" + expiresString(option.expires) : "",
    option.path ? "; path=" + option.path : "",
    option.domain ? "; domain=" + option.domain : "",
    option.secure ? "; secure" : ""
  ].join(""));
}

function cookieStringfy(name, value, option) {
  var optionStr = optionStringfy(option);
  return ([
  name, "=", value,
  optionStr
  ].join(""));
}

function Tongs() {}

Tongs.prototype.cookie = function cookie(name, value, option) {
  if (arguments.length > 0 && !value) return this.read(name);

  if (arguments.length === 0) return this.readAll();

  this.save(name, value, option);
};

Tongs.prototype.save = function(name, value, option) {
  document.cookie = cookieStringfy(name, encodeURIComponent(value), option);
};

Tongs.prototype.each = function(callback) {
  var cookieStores = document.cookie.split("; ");
  var cookies = [];

  for (var i = 0, l = cookieStores.length; i < l; i++) {
    cookies = reStructreCookie(cookieStores[i]);
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
  document.cookie = cookieStringfy(name, "", option);
  return !this.read(name);
};

Tongs.prototype.wideDomain = function() {
  var parts = location.hostname.split(".").reverse();
  var wideDomain = parts.shift();
  var c = "__tongs_test__";

  for (var i = 0, l = parts.length; i < l; i++) {
    wideDomain = parts[i] + "." + wideDomain;

    if (i === (l - 1)) return wideDomain;

    this.save(c, c);
    if (this.read(c)) {
      this.remove(c);
      return "." + wideDomain;
    }
  }
};

module.exports = Tongs;
