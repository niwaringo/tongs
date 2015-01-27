// spec.js
describe('tongs top page', function() {
  browser.ignoreSynchronization = true;
  console.log(browser.baseUrl);
  beforeEach(function() {
    browser.get(browser.baseUrl);
    browser.manage().deleteAllCookies();
  });

  it('set', function() {
    element(by.id('set')).click();
    var obj = browser.manage().getCookie('name');
    browser.manage().getCookie('name').then(function(cookie) {
      expect(cookie.name).toEqual('name');
    });
  });

  it('set expires with date', function() {
    var tom_str = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toString();
    element(by.id('expires-date')).sendKeys(tom_str);
    element(by.id('set-with-option-expires-date')).click();

    browser.manage().getCookie('name').then(function(cookie) {
      var _expiry = Math.floor(new Date(tom_str).getTime() / 1000);
      expect(_expiry).toEqual(cookie.expiry);
    });
  });

  it('set expires with number', function() {
    var tom = {};
    tom._date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    tom.year = tom._date.getFullYear();
    tom.month = tom._date.getMonth();
    tom.date = tom._date.getDate();

    element(by.id('expires-number')).sendKeys(1);
    element(by.id('set-with-option-expires-number')).click();

    browser.manage().getCookie('name').then(function(cookie) {
      var _expiry = new Date(cookie.expiry * 1000);
      expect(_expiry.getFullYear()).toEqual(tom.year);
      expect(_expiry.getMonth()).toEqual(tom.month);
      expect(_expiry.getDate()).toEqual(tom.date);
    });
  });

});
//
//   it('set with option', function() {
//     var tom_str = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toString();
//     element(by.id('date')).sendKeys(tom_str);
//     element(by.id('set-with-option')).click();
//
//     browser.manage().getCookie('name').then(function(cookie) {
//       var _expiry = Math.floor(new Date(tom_str).getTime() / 1000);
//       expect(_expiry).toEqual(cookie.expiry);
//     });
//   });
//
//   it('get', function() {
//     element(by.id('set')).click();
//     element(by.id('get-and-display-cookievalue')).click();
//     expect(element(by.id('display')).getText()).toEqual('value');
//   });
//
//   it('remove', function() {
//     element(by.id('set')).click();
//     element(by.id('del')).click();
//     browser.manage().getCookie('name').then(function(cookie) {
//       expect(cookie).toBeNull();
//     });
//   });
//
//   it('each', function() {
//     element(by.id('each')).click();
//     browser.manage().getCookies().then(function(cookies) {
//       expect(cookies.length).toEqual(2);
//     });
//   });
//
//   it('create success', function() {
//     element(by.id('create')).click();
//     browser.manage().getCookie('name').then(function(cookie) {
//       expect(cookie.value).toEqual('new_value');
//     });
//   });
//
//   it('create fail', function() {
//     element(by.id('set')).click();
//     element(by.id('create')).click();
//     browser.manage().getCookie('name').then(function(cookie) {
//       expect(cookie.value).toEqual('value');
//     });
//   });
//
//   it('update success', function() {
//     element(by.id('set')).click();
//     element(by.id('update')).click();
//     browser.manage().getCookie('name').then(function(cookie) {
//       expect(cookie.value).toEqual('updated_value');
//     });
//   });
//
//   it('update fail', function() {
//     element(by.id('update')).click();
//     browser.manage().getCookie('name').then(function(cookie) {
//       expect(cookie).toBeNull();
//     });
//   });
// });
//
// describe('tongs top page', function() {
//   browser.ignoreSynchronization = true;
//   beforeEach(function() {
//     browser.get(browser.baseUrl + '/pathcheck/');
//     browser.manage().deleteAllCookies();
//   });
//
//   it('set no option', function() {
//     element(by.id('set-not-option')).click();
//     browser.manage().getCookie('name').then(function(cookie) {
//       var cookie_path = cookie.path.replace(/\/$/,'');
//       expect(cookie_path).toEqual('/tongs/browser/pathcheck');
//     });
//   });
//
//   it('set no option', function() {
//     element(by.id('set-with-option')).click();
//     browser.manage().getCookie('name').then(function(cookie) {
//       expect(cookie.path).toEqual('/');
//     });
//   });
