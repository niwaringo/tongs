// spec.js
var optionExec = function(callback) {
  browser.getCapabilities().then(function(s) { 
    if (s.caps_.browserName.match(/chrome|firefox/)) {
      callback();
    }
  });
};

describe('tongs top page', function() {
  browser.ignoreSynchronization = true;

  beforeEach(function() {
    browser.get(browser.baseUrl);
    browser.manage().deleteAllCookies();
  });

  it('read', function() {
    browser.executeScript(function() {
      document.cookie = 'name=value';
    });
    var cookie = browser.executeScript(function() {
      return tongs.cookie('name');
    });
    expect(cookie).toEqual('value');
  });

  it('save', function() {
    browser.executeScript(function() {
      tongs.cookie('name', 'value');
    });
    browser.manage().getCookie('name').then(function(cookie) {
      expect(cookie.name).toEqual('name');
      expect(cookie.value).toEqual('value');
    });
  });

  it('remove', function() {
    var cookie = browser.executeScript(function() {
      document.cookie = 'name=value';
      tongs.remove('name');
    });

    browser.manage().getCookie('name').then(function(cookie) {
      expect(cookie).toBeNull();
    });
  });

  //chrome and firefox only
  optionExec(function() {
    it('expires(date)', function() {
      browser.executeScript(function() {
        var tom = new Date();
        tom.setDate(tom.getDate() + 1);
        tongs.cookie('name', 'value', {expires: tom});
      });

      browser.manage().getCookie('name').then(function(cookie) {
        var tom = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        var _expiry = Math.floor(tom.getTime() / 100000);

        expect(_expiry).toEqual(Math.floor(cookie.expiry / 100));
      });
    });

    it('expires(number)', function() {
      browser.executeScript(function() {
        tongs.cookie('name', 'value', {expires: 1});
      });

      var tom = {};
      tom._date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
      tom.year = tom._date.getFullYear();
      tom.month = tom._date.getMonth();
      tom.date = tom._date.getDate();

      browser.manage().getCookie('name').then(function(cookie) {
        var _expiry = new Date(cookie.expiry * 1000);
        expect(_expiry.getFullYear()).toEqual(tom.year);
        expect(_expiry.getMonth()).toEqual(tom.month);
        expect(_expiry.getDate()).toEqual(tom.date);
      });
    });

    it('path', function() {
      browser.executeScript(function() {
        tongs.cookie('name', 'value', {path: '/'});
      });

      browser.manage().getCookie('name').then(function(cookie) {
        expect(cookie.path).toEqual('/');
      });
    });

    it('secure', function() {
      browser.executeScript(function() {
        tongs.cookie('name', 'value', {secure: true});
      });

      browser.manage().getCookie('name').then(function(cookie) {
        expect(cookie.secure).toEqual(true);
      });
    });

    it('domain', function() {
      browser.executeScript(function() {
        tongs.cookie('name', 'value', {domain: '.dropboxusercontent.com'});
      });

      browser.manage().getCookie('name').then(function(cookie) {
        expect(cookie.domain).toEqual('.dropboxusercontent.com');
      });
    });

    it('remove with path error', function() {
      var result = browser.executeScript(function() {
        tongs.cookie('name', 'value', {path: '/'});
        return tongs.remove('name');
      });

      expect(result).toEqual(false);

      browser.manage().getCookie('name').then(function(cookie) {
        expect(cookie).not.toBeNull();
      });
    });

    it('remove with path success', function() {
      var result = browser.executeScript(function() {
        tongs.cookie('name', 'value', {path: '/'});
        return tongs.remove('name', {path: '/'});
      });

      expect(result).toEqual(true);

      browser.manage().getCookie('name').then(function(cookie) {
        expect(cookie).toBeNull();
      });
    });
  });
});
