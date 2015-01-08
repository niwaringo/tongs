var Cooker = require('cooker');
var assert = require('assert');

describe('Cooker', function() {
  before(function() {
    this.cooker = new Cooker();
  });

  it('set cookie', function() {
    this.cooker.cookie('name', 'value');
    assert.strictEqual(document.cookie, 'name=value');
  });

  it('get cookie', function() {
    this.cooker.cookie('name', 'value');
  });
});
