# MarmottAjax
> Ajax actions intelligent library

Thank's a lot to [Michael (houd1ni)](https://github.com/houd1ni) who contributes greatly to the development !

![Logo](image.jpg "logo")

## Usage

The different methods that can be used with this library are: `get`,` post`, `put`, `update`, `delete` AND `file` to upload a single file asynchronously!

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


/**
 * Pass complex data
 */

 marmottajax({
    url: "/post.asm",
    method: "post",
    parameters: {
        love: {
            animal: 'Marmotte',
            action: "stroke"
        },
        hate: ['ie6', 'ie7', 'one, who framed Roger Rabbit']
    }
}).then(function(responce_data) {
    // result
})
 
```

## Contributing

MarmottAjax requires some development dependencies :

 - NodeJs : [nodejs.org](http://nodejs.org/)
 - Gulp : `npm i -g gulp`
 - And some modules : `npm i`

 - Start `gulp` command and you can start to edit the code
 - Start `gulp requirejs --modulename` command for generate requirejs module wi name = `modulename`

## License

[WTFPL](http://www.wtfpl.net/)
