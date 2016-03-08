# MarmottAjax

[![Join the chat at https://gitter.im/dimitrinicolas/marmottajax](https://badges.gitter.im/dimitrinicolas/marmottajax.svg)](https://gitter.im/dimitrinicolas/marmottajax?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
> Ajax actions intelligent library

> Our philosophy: library should not be a combain. It should do one thing and do it perfect.
> And it is client-side JS. It should be small as it can be.

Thank's a lot to [Michael (houd1ni)](https://github.com/houd1ni) who contributes greatly to the development !

![Logo](image.jpg "logo")

## Usage

The different methods that can be used with this library are: `get`,` post`, `put`, `update`, `delete`.

Has two builds: as AMD module or just as a variable. See more in the bottom.

You also can pass just file input or form DOMElement, or even any DOMElement, where '.marmottajax' could be found, which will be ajax forms.

Signatures:
```javascript
marmottajax('url')
marmottajax({url: '/some_url'})
marmottajax({url: '/some_url', method: 'POST'})
marmottajax({url: '/some_url', method: 'GET', json: true, watch: 200}).change(function(new_data){}) // Watching for a file/data.
marmottajax({url: '/some_url', parameters: document.querySelector('#fileupload')})
marmottajax({parameters: document.querySelector('form')})   // Url will be taken from `action` attribute, if `url` isn't passed.
marmottajax({ajax_forms_in: document.querySelector('div#several_forms'), success: function(){}})   // Only `success`, not `then`!

/* All except the last one can be declared with `.then`, `.error` Promises and `success`, `error` parameters on your taste.
    If both are presented, both are invoked.
*/

```

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
}).then(function(response_data) {
    // result
})



/**
 * Pass a file. Workis like the same as in jQuery, but lighter.
 * IE9+ in theory. Tested in Chrome.
 */

 var file_in_DOM = document.querySelector('input[type="file"]')

 marmottajax({
    url: "/file_uload.rb",
    method: "file",
    data: file_in_DOM,
    filename: 'the_image'   // Optional! If not presented, uses just 'file' automatically.

}).then(function(response_data) {
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
