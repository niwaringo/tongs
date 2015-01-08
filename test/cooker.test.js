var Cooker = require('cooker');
var assert = require('assert');

describe('Cooker', function() {
  beforeEach(function() {
    this.cooker = new Cooker();
  });

  afterEach(function() {
    this.cooker.removeAll();
  });

  it('set cookie', function() {
    this.cooker.cookie('name', 'value');
    assert.strictEqual(document.cookie, 'name=value');
  });

  it('get cookie', function() {
    this.cooker.cookie('name', 'value');
    assert.strictEqual(this.cooker.cookie('name'), 'value');
  });

  it('remove', function() {
    this.cooker.cookie('name', 'value');
    this.cooker.remove('name');
    assert.strictEqual(document.cookie, '');
  });

  it('create sccess', function() {
    this.cooker.create('name', 'value');
    assert.strictEqual(document.cookie, 'name=value');
  });

  it('create error', function() {
    console.log(document.cookie);
    this.cooker.create('name', 'value');
    // this.cooker.create('name', 'new_value');
    assert.strictEqual(document.cookie, 'name=value');
  });
});
