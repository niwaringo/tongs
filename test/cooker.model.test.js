var TongsModel = require('tongs.model');
var Tongs = require('tongs');
var assert = require('assert');

describe('model', function() {
  afterEach(function() {
    new Tongs().removeAll();
  });
  it('name and value is encoded', function() {
    var co = new TongsModel('ネーム', 'ヴァリュー');

    assert.strictEqual(co.name, '%E3%83%8D%E3%83%BC%E3%83%A0');
    assert.strictEqual(co.value, '%E3%83%B4%E3%82%A1%E3%83%AA%E3%83%A5%E3%83%BC');
  });

  it('toString', function() {
    var co = new TongsModel('name', 'val');

    assert.strictEqual(co.toString(), 'name=val');
  });

  it('save', function() {
    var co = new TongsModel('name', 'val');
    co.save();

    assert.strictEqual(document.cookie, 'name=val');
  });

  it('remove', function() {
    var co = new TongsModel('name', 'val');
    co.save();
    var result = co.remove();

    assert.strictEqual(document.cookie, '');
  });
});
