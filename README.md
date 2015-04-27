# MarmottAjax
> Ajax requests intelligent library

![Logo](image.jpg "logo")

## Usage

The different methods that can be used with this library are: `get`,` post`, `put`, `update` and `delete`.

*Samples*
```javascript
/**
 * Simply get file content
 */

marmottajax("text-file.txt").then(function(content) {
    // content
});

/**
 * Post
 */

marmottajax({
    url: "post.php",
    method: "post",
    parameters: {
        image: 8,
        by: "click"
    }
}).then(function(result) {
    // result
}).error(function(message) {
    // message
});

/**
 * Get Json
 */

marmottajax({
    url: "data.json",
    json: true
}).then(function(result) {
    // result
}).bind(document.getElementById("console"));

/**
 * Watch changes on file
 */

var watcher = new marmottajax({
    url: "data.json",
    json: true,
    watch: 200
}).change(function(result) {
    // result
});

// Change interval time of `watcher`
setTimeout(function() {
    watcher.changeTime(1000);
}, 800);
```

## Contributing

MarmottAjax requires some development dependencies :

 - NodeJs : [nodejs.org](http://nodejs.org/)
 - Gulp : `npm i -g gulp`
 - And some modules : `npm i`

 - Start `gulp` command and you can start to edit the code

## License

[WTFPL](http://www.wtfpl.net/)