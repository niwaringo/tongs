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
var Tongs = require('tongs');
var tongs = new Tongs();
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
tongs.cookie('nothing'); // => ''
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
