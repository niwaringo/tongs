"use strict";

var tongs = require("tongs");
var assert = require("assert");

describe("Tongs", function() {
  beforeEach(function() {
    document.cookie.split("; ").forEach(function(_cookie) {
      var cookies = _cookie.split(/=(.+)/);
      tongs().remove(cookies[0]);
    }, this);
  });

  it("save", function() {
    tongs().save("name", "value");
    assert.strictEqual(document.cookie, "name=value");
  });

  it("remove", function() {
    tongs().save("name", "value");
    tongs().remove("name");

    assert.strictEqual(document.cookie, "");
  });

  it("read", function() {
    tongs().save("name", "value");
    assert.strictEqual(tongs().read("name"), "value");
  });

  it("read nothing", function() {
    tongs().save("name", "value");
    assert.strictEqual(tongs().read("nothing"), undefined);
  });

  it("encode:decode", function() {
    tongs().save("name", "値");
    assert.strictEqual(document.cookie, "name=%E5%80%A4");
    assert.strictEqual(tongs().read("name"), "値");
  });

  it("cookie method(read)", function() {
    tongs().save("cookie_name", "value");
    assert.strictEqual(tongs().cookie("cookie_name"), "value");
  });

  it("cookie read(all cookies)", function() {
    tongs().save("name1", "value1");
    tongs().save("name2", "value2");

    assert.strictEqual(tongs().cookie()[1].name2, "value2");
  });


  it("cookie method(save)", function() {
    tongs().cookie("cookie_name", "value");
    assert.strictEqual(tongs().cookie("cookie_name"), "value");
  });

  it("read multi equal value", function() {
    document.cookie = "__utmz=789.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none)";
    assert.strictEqual(tongs().cookie("__utmz"), "789.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none)");
  });

  it("remove", function() {
    document.cookie = "n=v";
    tongs().remove("n");
    assert.strictEqual(document.cookie, "");
  });
});
