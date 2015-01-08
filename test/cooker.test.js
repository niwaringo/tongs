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
    this.cooker.create('name', 'value');
    this.cooker.create('name', 'new_value');
    assert.strictEqual(document.cookie, 'name=value');
  });

  it('update success', function() {
    this.cooker.create('name', 'value');
    this.cooker.update('name', 'new_value');
    assert.strictEqual(document.cookie, 'name=new_value');
  });

  it('update error', function() {
    this.cooker.update('name', 'value');
    assert.strictEqual(document.cookie, '');
  });

  it('toJson', function() {
    this.cooker.create('name', 'value');
    var jsons = this.cooker.toJSON();
    assert.strictEqual(jsons[0].name, 'name');
  });

  if('each', function() {
    var ar = [];
    this.cooker.create('name1', 'value1');
    this.cooker.create('name2', 'value2');
    this.cooker.each(function(model) {
      ar.push(model.name);
    });

    assert.strictEqual(ar, ['name1', 'name2']);
  });
});
