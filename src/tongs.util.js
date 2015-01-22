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
    var keys = util.keys(add);
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
    return util.reduce(obj, function(_obj, value, key) {
      if (!(key in util.opt)) return;
      _obj[key] = util.opt[key](obj[key]);
      return _obj;
    }, {});
  },

  keys: require('amp-keys'),
  each: require('amp-each'),
  map: require('amp-map'),
  reduce: require('amp-reduce')
};

module.exports = util;
