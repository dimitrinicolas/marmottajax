# MarmottAjax
> Librairie de requêtes Ajax intelligentes

![Logo](image.jpg "logo")

## Utilisation

Les différentes méthodes que l'on peut utiliser avec cette librairie sont : `get`, `post`, `put`, `update` et `delete`.

*Exemples*
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

MarmottAjax nécessite quelques dépendances de développement :

 - Installer NodeJs : [nodejs.org](http://nodejs.org/)
 - Installer Gulp : `npm i -g gulp`
 - Installer les modules : `npm i`

 - Lancer `gulp` pour pouvoir commencer à développer

## License

[WTFPL](http://www.wtfpl.net/)