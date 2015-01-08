var CookerCollection = require('cooker.collection');
var assert = require('assert');
var SAMPLE_COOKE_STR = "__utma=123; __utmc=456; __utmz=789.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none)";
var SAMPLE_COOKE_STR_ENCODED = "__utma=123; __utmc=456; __utmz=789.utmcsr%3D(direct)%7Cutmccn%3D(direct)%7Cutmcmd%3D(none)";

describe('collection', function() {
  beforeEach(function() {
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

  it('removeAll', function() {
    this.col.each(function(model) {
      model.save();
    });
    this.col.removeAll();
    assert.strictEqual(document.cookie, '');
  });

  it('each', function() {
    var ar = [];
    this.col.each(function(model) {
      ar.push(model.name);
    });

    assert.strictEqual(ar.toString(), ['__utma', '__utmc', '__utmz'].toString());
  });
});
