function setCookie(name, value, option) {
  tongs.cookie(name, value, option);
}

function setCookieWithOption(name, value) {
  var date_str = document.getElementById('date').value;
  var date = new Date(date_str);

  tongs().cookie(name, value, {expires: date});
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
