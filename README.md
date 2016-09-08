# marmottajax

Simple ajax library

![Logo](image.jpg "logo")

## Usage

The different methods that can be used with this library are: `get`,` post`, `put`, `update`, `delete`.

### Simply get file content
```javascript
marmottajax("text-file.txt").success(function(content) {
    // content
});
```

### Post data
```javascript
marmottajax({
    url: "post.php",
    method: "post",
    parameters: {
        image: 8,
        by: "click"
    }
}).success(function(result) {
    // result
}).error(function(message) {
    // message
});
```

### Receive Json
```javascript
marmottajax({
    url: "data.json",
    json: true
}).success(function(result) {
    // result
});
```

### Watch changes on file
```javascript
var watcher = new marmottajax({
    url: "data.json",
    json: true,
    watch: 200 // watch interval in ms
}).success(function(result) {
    // initial request
}).change(function(result) {
    // called when different response detected
});

// Change interval time of watcher
watcher.setTime(1000);
```

### Custom headers and form data
```javascript
marmottajax({
    url: "path",
    method: "post",
    formData: formData
    headers : {
        "Authorization": "Bearer baf9f0171b11d10f600bfb0cd98b"
    }
}).success(function(result) {
    // result
});
```

## Contributing

marmottajax minifying npm script :

 - install modules : `npm i`
 - launch `npm run build`

## License

[WTFPL](http://www.wtfpl.net/)
