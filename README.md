tongs [![npm version](https://badge.fury.io/js/tongs.svg)](http://badge.fury.io/js/tongs) [![Build Status](https://travis-ci.org/niwaringo/tongs.svg?branch=master)](https://travis-ci.org/niwaringo/tongs)
===========================================================================================================================================================================================================

cookie utility. **don't** dependency jquery.

### motivation

jquery-cookie is awsome!! but jquery ....

Build Status Matrix
-------------------

[![Sauce Test Status](https://saucelabs.com/browser-matrix/niwaringo_tongs.svg)](https://saucelabs.com/u/niwaringo_tongs)

Install
-------

### browser

[Download here](https://raw.githubusercontent.com/niwaringo/tongs/master/browser/tongs.js)

```html
<script src="/path/to/tongs.js"></script>
```

### npm

```javascript
npm install tongs
```

```
var tongs = require('tongs');
```

Usage
-----

### Set cookie:

```javascript
tongs.cookie('name', 'value');
```

### Set cookie with option:

```javascript
tongs.cookie('name', 'value', {expires: 7, path: '/'});
```

### Get Cookie:

```javascript
tongs.cookie('name'); // => value
tongs.cookie('nothing'); // => undefined
```

### Get all available cookies:

```javascript
// document.cookie => name1=value1, name2=value2
tongs.cookie();
// => [{name1: value1}, {name2: value2}]
```

### Remove Cookie:

```javascript
tongs.remove('name'); // => true
tongs.remove('nothing'); // => false

//with option
tongs.cookie('path_cookie', 'value', {path: '/'});
tongs.remove('path_cookie'); // => false
tongs.remove('path_cookie', {path: '/'}); // => true
```

### Get wide domain

```javascript
// location.hostname => dl.dropboxusercontent.com
tongs.wideDomain(); // => .dropboxusercontent.com
```

ex) use cookie across the subdomain

```javascript
var set_domain = tongs.wideDomain();
tongs.cookie('name', 'valkue', {domain: set_domain});
```
