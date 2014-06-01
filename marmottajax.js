
/*
 *  Marmottajax 1.0.0
 *  Envoyer et recevoir des informations simplement en JavaScript
 */

var marmottajax = function(options) {

    return marmottajax.get(options);

};

marmottajax.json = function(parameters) {

    if (!parameters) { return false; }

    var options = parameters;

    if (typeof parameters == "string") {

        options = { url: parameters };

    }

    options.method = "GET";
    options.json = true;

    return new marmottajax.request(options);

};

marmottajax.get = function(options) {

    return new marmottajax.request(options);

};

marmottajax.post = function(parameters) {

    if (!parameters) { return false; }

    var options = parameters;

    if (typeof parameters == "string") {

        options = { url: parameters };

    }

    options.method = "POST";

    return new marmottajax.request(options);

};

marmottajax.request = function(options) {

    if (!options) { return false; }

    this.xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

    this.xhr.options = options;

    if (typeof options == "string") {

        this.xhr.options = { url: options };

    }

    if (this.xhr.options.method === "POST") {

        var post = "?";

        for (var key in this.xhr.options.options) {

            post += this.xhr.options.options.hasOwnProperty(key) ? "&" + key + "=" + this.xhr.options.options[key] : "";

        }

    }

    else {

        this.xhr.options.method = "GET";

        this.xhr.options.url += this.xhr.options.url.indexOf("?") < 0 ? "?" : "";

        for (var key in this.xhr.options.options) {

            this.xhr.options.url += this.xhr.options.options.hasOwnProperty(key) ? "&" + key + "=" + this.xhr.options.options[key] : "";

        }

    }

    this.xhr.callbacks = {

        then: [],
        error: []

    };

    this.then = function(callback) {

        this.xhr.callbacks.then.push(callback);

        return this;

    };

    this.error = function(callback) {

        this.xhr.callbacks.error.push(callback);

        return this;

    };

    this.xhr.returnSuccess = function(result) {

        for (var i = 0; i < this.callbacks.then.length; i++) {

            if (typeof(this.callbacks.then[i]) == "function") {

                this.callbacks.then[i](result);

            }

        }

    };

    this.xhr.returnError = function(message) {

        for (var i = 0; i < this.callbacks.error.length; i++) {

            if (typeof(this.callbacks.error[i]) == "function") {

                this.callbacks.error[i](message);

            }
            
        }

    };

    this.xhr.onreadystatechange = function() {

        if (this.readyState === 4 && this.status == 200) {

            var result = this.responseText;

            if (this.options.json) {

                try {

                    result = JSON.parse(result);

                }

                catch (error) {

                    this.returnError("invalid json");

                    return false;

                }

            }

            this.returnSuccess(result);

        }

        else if (this.readyState === 4 && this.status == 404) {

            this.returnError("404");

        }

        else if (this.readyState === 4) {

            this.returnError("unknow");

        }

    };

    this.xhr.open(this.xhr.options.method, this.xhr.options.url, true);
    this.xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    this.xhr.send(typeof post != "undefined" ? post : null);

    return this;

};