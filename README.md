cooker
======

cookie utility

Usage
-----

Set cookie:

```javascript
cooker().cookie('name', 'value');
```

Set cookie with option:

```javascript
cooker().cookie('name', 'value', {expires: new Date(2020, 0, 8), path: '/'});
```

Get Cookie:

```javascript
cooker().cookie('name'); // => value
cooker().cookie('nothing'); // => undefined
```

Remove Cookie:

```javascript
cooker().remove('name'); // => true
cooker().remove('nothing'); // => false

//with option
cooker().cookie('path_cookie', 'value', {path: '/'});
cooker().remove('path_cookie'); // => false
cooker().remove('path_cookie', {path: '/'}); // => true
```

toJSON:

```javascript
// document.cookie => "name1=value1; name2=value2"
cooker().toJSON(); // => [{name: 'name1', value: 'value1'}, {name: 'name2', value: 'value2'}]
```

each:

```javascript
// document.cookie => "name1=value1; name2=value2"
cooker().each(function(cookie) {
  console.log(cookie.name + ' ' + cookie.value);
});
// => name1 value1
// => name2 value2
```

CreateMethod:

```javascript
// document.cookie => ''
cooker().create('name', 'value'); // => true | document.cookie => 'name=value'
// document.cookie => 'name=value'
cooker().create('name', 'new_value'); // => false | document.cookie => 'name=value'
```

UpdateMethod:

```javascript
// document.cookie => 'name=value'
cooker().update('name', 'new_value'); // => true | document.cookie => 'name=new_value'
// document.cookie => ''
cooker().update('name', 'new_value'); // => false | document.cookie => ''
```
