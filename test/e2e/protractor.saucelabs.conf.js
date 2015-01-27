exports.config = {
  multiCapabilities: [{
    'nama': 'win7-chrome',
    'browserName': 'chrome',
    'platform': 'Windows 7'
  },
  {
    'name': 'win7-firefox',
    'browserName': 'firefox',
    'platform': 'Windows 7'
  },
  {
    'name': 'safari',
    'browserName': 'safari'
  },
  {
    'name': 'win7-ie8',
    'browserName': 'internet explorer',
    'version': '8',
    'platform': 'Windows 7'
  },
  {
    'name': 'win7-ie9',
    'browserName': 'internet explorer',
    'version': '9',
    'platform': 'Windows 7'
  },
  {
    'name': 'win7-ie10',
    'browserName': 'internet explorer',
    'version': '10',
    'platform': 'Windows 7'
  },
  {
    'name': 'win7-ie11',
    'browserName': 'internet explorer',
    'version': '11',
    'platform': 'Windows 7'
  },
  {
    'name': 'android-4.4',
    'browserName': 'android',
    'version': '4.4',
    'platform': 'Linux'
  },
  {
    'name': 'iphone-8.1',
    'browserName': 'iphone',
    'version': '8.1',
    'platform': 'OS X 10.10'
  }
  ],
  baseUrl: 'http://niwaringo.github.io/tongs/browser',
  sauceUser: 'niwaringo_tongs',
  // sauceKey: process.env.SAUCE_ACCESS_KEY,
  sauceKey: 'ba87052e-732e-41bd-b501-576f62aa7ba2',
  // 'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
  specs: ['spec.js']
};
