Marmottajax
=========

Envoyer et recevoir des informations simplement en JavaScript avec Marmottajax

  - Tiny : 2ko minified
  - Simple
  - Magic


> L'AjaxMarmotte de Dimou il est trop bien ! :D

> — *[Jeremy](https://twitter.com/jeremy__fr/status/473053329787211778)*


Exemple simple
----

Recuperer le contenu d'un fichier "foo.txt" :

```javascript
marmottajax("foo.txt").then(function(result) {
    alert(result);
});
```

Exemple Json
----

Recuperer le contenu du fichier json "marmottes.json" parsé :

```javascript
marmottajax.json("marmottes.json").then(function(marmottes) {
	console.log(marmottes);
}).error(function(message) {
	console.error(message);
});
```

Exemple de POST php
----

Envoyer des données avec la méthode POST :

```javascript
marmottajax.post({
    url: "post.php",
    options: { marmotte: "Dimou" }
});
```
post.php :
```php
<?php echo $_POST["marmotte"];
```

Toutes les options
----

Recuperer le contenu d'un fichier "foo.txt" :

```javascript
marmottajax.get({ // OU marmottajax.post

    url: "", // obligatoire, peut être abrégé en marmottajax.get(url).then(callback); (voir premier exemple)

    method: "", // GET par defaut ou défini par marmottajax.get et marmottajax.post

    json: /true|false/, // false par defaut, la reponse sera automatiquement parsé si "true"

    options: {} // options à envoyer en GET (par l'url) ou en POST (dépend de la méthode)

}).then(function(result) {

    // result

}).error(function(message) {

    // message: "404", "invalid json" ou "unknow"

});
```

License
----

[WTFPL](http://www.wtfpl.net/)