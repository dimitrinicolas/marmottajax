MarmottAjax
=========

Envoyer et recevoir des informations simplement en JavaScript avec MarmottAjax.

> L'AjaxMarmotte de Dimou il est trop bien ! :D
> — *[Jeremy](https://twitter.com/jeremy__fr/status/473053329787211778)*

![Logo](image.jpg "logo")

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

```javascript
marmottajax.get({ // OU marmottajax.post|put|delete() OU marmottajax()

    url: "", // obligatoire, peut être abrégé en marmottajax.get(url).then(callback); (voir premier exemple)

    method: "", // GET par defaut ou défini par la fonction appelée

    json: false, // false par defaut, la reponse sera automatiquement parsé si "true"

    options: {} // informations à envoyer en GET ou en POST (dépend de la méthode)

}).then(function(result) {

    // result

}).error(function(message) {

    // message => "404", "invalid json", "unknow" ou `null`

});
```

License
----

[WTFPL](http://www.wtfpl.net/)