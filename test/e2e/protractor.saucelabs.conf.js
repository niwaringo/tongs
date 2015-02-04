var build = 'v0.6.0';

exports.config = {
  multiCapabilities: [{
    //Chrome
    'nama': 'win7-chrome',
    'browserName': 'chrome',
    'platform': 'Windows 7',
    'build': build,
    'passed': true,
    'public': 'public'
  },
  {
    'nama': 'mac-chrome',
    'browserName': 'chrome',
    'platform': 'OS X 10.10',
    'build': build,
    'passed': true,
    'public': 'public'
  },
  {
    'nama': 'linux-chrome',
    'browserName': 'chrome',
    'platform': 'Linux',
    'build': build,
    'passed': true,
    'public': 'public'
  },

  // Firefox
  {
    'name': 'win7-firefox',
    'browserName': 'firefox',
    'platform': 'Windows 7',
    'build': build,
    'passed': true,
    'public': 'public'
  },
  {
    'name': 'mac-firefox',
    'browserName': 'firefox',
    'platform': 'OS X 10.10',
    'build': build,
    'passed': true,
    'public': 'public'
  },
  {
    'name': 'linux-firefox',
    'browserName': 'firefox',
    'platform': 'Linux',
    'build': build,
    'passed': true,
    'public': 'public'
  },

  // Safari
  {
    'name': 'OS X 10.10 safari',
    'browserName': 'safari',
    'platform': 'OS X 10.10',
    'build': build,
    'passed': true,
    'public': 'public'
  },
  {
    'name': 'OS X 10.9 safari',
    'browserName': 'safari',
    'platform': 'OS X 10.9',
    'build': build,
    'passed': true,
    'public': 'public'
  },

  // IE
  {
    'name': 'win7-ie8',
    'browserName': 'internet explorer',
    'version': '8',
    'platform': 'Windows 7',
    'build': build,
    'passed': true,
    'public': 'public'
  },
  {
    'name': 'win7-ie9',
    'browserName': 'internet explorer',
    'version': '9',
    'platform': 'Windows 7',
    'build': build,
    'passed': true,
    'public': 'public'
  },
  {
    'name': 'win7-ie10',
    'browserName': 'internet explorer',
    'version': '10',
    'platform': 'Windows 7',
    'build': build,
    'passed': true,
    'public': 'public'
  },
  {
    'name': 'win7-ie10',
    'browserName': 'internet explorer',
    'version': '10',
    'platform': 'Windows 8',
    'build': build,
    'passed': true,
    'public': 'public'
  },
  {
    'name': 'win7-ie11',
    'browserName': 'internet explorer',
    'version': '11',
    'platform': 'Windows 7',
    'build': build,
    'passed': true,
    'public': 'public'
  },
  {
    'name': 'win8.1-ie11',
    'browserName': 'internet explorer',
    'version': '11',
    'platform': 'Windows 8.1',
    'build': build,
    'passed': true,
    'public': 'public'
  },

  // Android
  {
    'name': 'android-4.4',
    'browserName': 'android',
    'version': '4.4',
    'platform': 'Linux',
    'build': build,
    'passed': true,
    'public': 'public'
  },

  //iOS
  {
    'name': 'iphone-8.1',
    'browserName': 'iphone',
    'version': '8.1',
    'platform': 'OS X 10.10',
    'build': build,
    'passed': true,
    'public': 'public'
  },
  {
    'name': 'iphone-7.1',
    'browserName': 'iphone',
    'version': '7.1',
    'platform': 'OS X 10.10',
    'build': build,
    'passed': true,
    'public': 'public'
  },
  {
    'name': 'ipad-8.1',
    'browserName': 'ipad',
    'version': '8.1',
    'platform': 'OS X 10.10',
    'build': build,
    'passed': true,
    'public': 'public'
  },
  {
    'name': 'ipad-7.1',
    'browserName': 'ipad',
    'version': '7.1',
    'platform': 'OS X 10.10',
    'build': build,
    'passed': true,
    'public': 'public'
  }
  ],
  baseUrl: 'https://dl.dropboxusercontent.com/u/14041548/index.html',
  sauceUser: 'niwaringo_tongs',
  // sauceKey: process.env.SAUCE_ACCESS_KEY,
  sauceKey: 'ba87052e-732e-41bd-b501-576f62aa7ba2',
  // 'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
  specs: ['spec.js']
};
