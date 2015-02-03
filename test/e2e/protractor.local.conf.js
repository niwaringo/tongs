exports.config = {
  baseUrl: 'https://dl.dropboxusercontent.com/u/14041548/index.html',
  seleniumArgs: ['-browserTimeout=60'],
  capabilities: {
    'browserName': 'chrome'
  },
  allScriptsTimeout: 30000,
  specs: ['spec.js']
};
