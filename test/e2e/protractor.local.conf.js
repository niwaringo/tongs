exports.config = {
  seleniumServerJar: '../../node_modules/protractor/selenium/selenium-server-standalone-2.44.0.jar',
  seleniumArgs: ['-browserTimeout=60'],
  'browserName': 'chrome',
  // baseUrl: 'http://localhost:8000',
  allScriptsTimeout: 30000,
  specs: ['spec.js']
};
