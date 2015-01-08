var CookerCollection = require('cooker.collection');
var assert = require('assert');
var SAMPLE_COOKE_STR = "__utma=123; __utmc=456; __utmz=789.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none)";
var SAMPLE_COOKE_STR_ENCODED = "__utma=123; __utmc=456; __utmz=789.utmcsr%3D(direct)%7Cutmccn%3D(direct)%7Cutmcmd%3D(none)";

describe('collection', function() {
  before(function() {
    this.col = new CookerCollection(SAMPLE_COOKE_STR);
  });

  it('toModels return array', function() {
    assert.strictEqual(this.col._models.length, 3);
  });

  it('toModels return model array', function() {
    assert.strictEqual(this.col._models[0].name, '__utma');
    assert.strictEqual(this.col._models[2].value, encodeURIComponent('789.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none)'));
  });

  it('get', function() {
    assert.strictEqual(this.col.get('__utmc').value, '456');
  });

  it('toJSON', function() {
    var jsons = this.col.toJSON();

    assert.strictEqual(jsons[0].name, '__utma');
  });

  it('saveAll and removeAll', function() {
    this.col.saveAll();
    assert.strictEqual(document.cookie, SAMPLE_COOKE_STR_ENCODED);
  });

  it('removeAll', function() {
    this.col.saveAll();
    this.col.removeAll();
    assert.strictEqual(document.cookie, '');
  });
});
