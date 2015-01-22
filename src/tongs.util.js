var util = {
  opt: {
    /**
     * @param {string || date} date
     */
    'expires': function(date) {
      var date_str = "";

      switch(Object.prototype.toString.call(date)) {
        case "[object Date]":
          date_str = date.toUTCString();
        break;

        case "[object String]":
          date_str = date;
        break;

        default:
          date_str = "";
      }

      return util.concatKeyVal('expires', date_str);
    },

    'path': function(path) {
      return util.concatKeyVal('path', path);
    },

    'domain': function(domain) {
      return util.concatKeyVal('domain', domain);
    },

    'secure': function(secure) {
      return secure;
    }
  },

  /**
   * @param {string} key
   * @param {string} value
   */
  concatKeyVal: function concatKeyVal(key, value) {
    return key + '=' + value;
  },

  /**
   * copy node-util extend
   */
  extend: function extend(origin, add) {
    var keys = Object.keys(add);
    var i = keys.length;
    while (i--) {
      origin[keys[i]] = add[keys[i]];
    }
    return origin;
  },

  /**
   * @param {object} obj
   * @return {object}
   */
  constructOptionObject: function constructOptionObject(obj) {
    var _obj = {};

    Object.keys(obj).forEach(function(key) {
      if (!(key in util.opt)) return;
      _obj[key] = util.opt[key](obj[key]);
    });

    return _obj;
  },

  each: require('amp-each'),
  map: require('amp-map')

};

module.exports = util;
