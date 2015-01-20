exports.config = {
  // seleniumServerJar: '../../node_modules/protractor/selenium/selenium-server-standalone-2.44.0.jar',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  baseUrl: 'http://niwaringo.github.io/tongs/browser',
  seleniumArgs: ['-browserTimeout=60'],
  'browserName': 'chrome',
  allScriptsTimeout: 30000,
  specs: ['spec.js']
};
