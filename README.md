tongs
=====

[![npm version](https://badge.fury.io/js/tongs.svg)](http://badge.fury.io/js/tongs)
[![Build Status](https://travis-ci.org/niwaringo/tongs.svg?branch=master)](https://travis-ci.org/niwaringo/tongs)

cookie utility

Install
-------

### npm

```javascript
npm install tongs
```

### browser

[Download here](https://raw.githubusercontent.com/niwaringo/tongs/master/dist/tongs.js)

```html
<script src="tongs.js"></script>
<script>
tongs().cookie('name', 'value');
</script>
```

Usage
-----

### Set cookie:

```javascript
tongs().cookie('name', 'value');
```

### Set cookie with option:

```javascript
tongs().cookie('name', 'value', {expires: new Date(2020, 0, 8), path: '/'});
```

### Get Cookie:

```javascript
tongs().cookie('name'); // => value
tongs().cookie('nothing'); // => undefined
```

### Remove Cookie:

```javascript
tongs().remove('name'); // => true
tongs().remove('nothing'); // => false

//with option
tongs().cookie('path_cookie', 'value', {path: '/'});
tongs().remove('path_cookie'); // => false
tongs().remove('path_cookie', {path: '/'}); // => true
```

### toJSON:

```javascript
// document.cookie => "name1=value1; name2=value2"
tongs().toJSON(); // => [{name: 'name1', value: 'value1'}, {name: 'name2', value: 'value2'}]
```

### each:

```javascript
// document.cookie => "name1=value1; name2=value2"
tongs().each(function(cookie) {
  console.log(cookie.name + ' ' + cookie.value);
});
// => name1 value1
// => name2 value2
```

### Create:

```javascript
// document.cookie => ''
tongs().create('name', 'value'); // => true | document.cookie => 'name=value'
// document.cookie => 'name=value'
tongs().create('name', 'new_value'); // => false | document.cookie => 'name=value'
```

### Update:

```javascript
// document.cookie => 'name=value'
tongs().update('name', 'new_value'); // => true | document.cookie => 'name=new_value'
// document.cookie => ''
tongs().update('name', 'new_value'); // => false | document.cookie => ''
```
