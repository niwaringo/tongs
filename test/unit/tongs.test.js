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

  it('encode:decode', function() {
    this.tongs.save('name', '値');
    assert.strictEqual(document.cookie, 'name=%E5%80%A4');
    assert.strictEqual(this.tongs.read('name'), '値');
  });

  it('cookie method(read)', function() {
    this.tongs.save('cookie_name', 'value');
    assert.strictEqual(this.tongs.cookie('cookie_name'), 'value');
  });

  it('cookie method(save)', function() {
    this.tongs.cookie('cookie_name', 'value');
    assert.strictEqual(this.tongs.cookie('cookie_name'), 'value');
  });

  it('read multi value', function() {
    // document.cookie = "__utma=123; __utmc=456; __utmz=789.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none)";
  });
});
// describe('Tongs', function() {
//   beforeEach(function() {
//     this.tongs = new Tongs();
//   });
//
//   afterEach(function() {
//     this.tongs.removeAll();
//   });
//
//   it('set cookie', function() {
//     this.tongs.cookie('name', 'value');
//     assert.strictEqual(document.cookie, 'name=value');
//   });
//
//   it('get cookie', function() {
//     this.tongs.cookie('name', 'value');
//     assert.strictEqual(this.tongs.cookie('name'), 'value');
//   });
//
//   it('remove suceess', function() {
//     this.tongs.cookie('name', 'value');
//     var result = this.tongs.remove('name');
//     assert.strictEqual(document.cookie, '');
//     assert(result);
//   });
//
//   it('remove error', function() {
//     assert(!this.tongs.remove('nothing'));
//   });
//
//   it('create sccess', function() {
//     var result = this.tongs.create('name', 'value');
//     assert.strictEqual(document.cookie, 'name=value');
//     assert(result);
//   });
//
//   it('create error', function() {
//     this.tongs.create('name', 'value');
//     var result = this.tongs.create('name', 'new_value');
//     assert.strictEqual(document.cookie, 'name=value');
//     assert(!result);
//   });
//
//   it('update success', function() {
//     this.tongs.create('name', 'value');
//     var result = this.tongs.update('name', 'new_value');
//     assert.strictEqual(document.cookie, 'name=new_value');
//     assert(result);
//   });
//
//   it('update error', function() {
//     var result = this.tongs.update('name', 'value');
//     assert.strictEqual(document.cookie, '');
//     assert(!result);
//   });
//
//   it('toJson', function() {
//     this.tongs.create('name', 'value');
//     var jsons = this.tongs.toJSON();
//     assert.strictEqual(jsons[0].name, 'name');
//   });
//
//   it('each', function() {
//     var ar = [];
//     this.tongs.create('name1', 'value1');
//     this.tongs.create('name2', 'value2');
//     this.tongs.each(function(model) {
//       ar.push(model.name());
//     });
//
//     assert.strictEqual(ar.toString(), ['name1', 'name2'].toString());
//   });
// });
