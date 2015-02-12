var Tongs = require('tongs');
var assert = require('assert');

describe('Tongs', function() {
  beforeEach(function() {
    this.tongs = new Tongs();
    document.cookie.split('; ').forEach(function(_cookie) {
      var cookies = _cookie.split(/=(.+)/);
      this.tongs.remove(cookies[0]);
    }, this);
  });

  it('save', function() {
    this.tongs.save('name', 'value');
    assert.strictEqual(document.cookie, 'name=value');
  });

  it('remove', function() {
    this.tongs.save('name', 'value');
    this.tongs.remove('name');

    assert.strictEqual(document.cookie, '');
  });

  it('read', function() {
    this.tongs.save('name', 'value');
    assert.strictEqual(this.tongs.read('name'), 'value');
  });

  it('read nothing', function() {
    this.tongs.save('name', 'value');
    assert.strictEqual(this.tongs.read('nothing'), undefined);
  });

  it('encode:decode', function() {
    this.tongs.save('name', '値');
    assert.strictEqual(document.cookie, 'name=%E5%80%A4');
    assert.strictEqual(this.tongs.read('name'), '値');
  });

  it('cookie method(read)', function() {
    this.tongs.save('cookie_name', 'value');
    assert.strictEqual(this.tongs.cookie('cookie_name'), 'value');
  });

  it('cookie read(all cookies)', function() {
    this.tongs.save('name1', 'value1');
    this.tongs.save('name2', 'value2');

    assert.strictEqual(this.tongs.cookie()[1].name2, "value2");
  });


  it('cookie method(save)', function() {
    this.tongs.cookie('cookie_name', 'value');
    assert.strictEqual(this.tongs.cookie('cookie_name'), 'value');
  });

  it('read multi equal value', function() {
    document.cookie = "__utmz=789.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none)";
    assert.strictEqual(this.tongs.cookie('__utmz'), '789.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none)');
  });

  it('remove', function() {
    document.cookie = 'n=v';
    this.tongs.remove('n');
    assert.strictEqual(document.cookie, '');
  });
});
