function setCookie(name, value, option) {
  tongs.cookie(name, value, option);
}

function setCookieWithExpiresDate(name, value) {
  var date = new Date(document.getElementById('expires-date').value);
  tongs.cookie(name, value, {expires:date});
}

function setCookieWithExpiresNumber(name, value) {
  var date = +document.getElementById('expires-number').value;
  tongs.cookie(name, value, {expires:date});
}

function setCookieWithOtherOption(name, value) {
  tongs.cookie(name, value, optionBuild());
}

function optionBuild() {
  var options = ['path', 'domain'];
  var elem, obj = {};

  for (var i = 0, l = options.length; i < l; i++) {
    elem = document.getElementById(options[i]);
    if (elem.value !== '') {
      obj[options[i]] = elem.value;
    }
  }

  return obj;
}

function expiresOpt(expires) {
  if (Object.prototype.toString.call(expires) === '[object Number]') {
    return expires;
  }
  if (Object.prototype.toString.call(expires) === '[object String]') {
    return new Date(expires);
  }
}

function createCookie(name, value) {
  tongs().create(name, value);
}

function updateCookie(name, value) {
  tongs().update(name, value);
}

function removeCookie(name, option) {
  tongs().remove(name, option);
}

function eachCookie(cookies) {
  for (var i=0; i < cookies.length; ++i) {
    tongs().cookie(cookies[i][0], cookies[i][1]);
  }
  tongs().each(function(cookie) {
    var value = cookie.value();
    cookie.value('each' + value);
    cookie.save();
  });
}


function displayCookieValue(name) {
  elm = document.getElementById('display');
  elm.innerHTML = tongs().cookie(name);
}
