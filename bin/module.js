
/**
 * main.js
 *
 * Main librairy file
 */
var arr_contains = function(obj, to_find) {
        var i = obj.length;
        while (i--) {
            if (obj[i] === to_find) {
                return true;
            }
        }
        return false;
    },
    serialize = function(obj, prefix) {
          var str = [];
          for(var p in obj) {
            if (obj.hasOwnProperty(p)) {
              var v = obj[p], is_obj = typeof v == "object",
                  k = prefix ? prefix + "[" + (isNaN(+p) || is_obj ? p : '') + "]" : p;
              str.push(is_obj ?
                serialize(v, k) :
                encodeURIComponent(k) + "=" + encodeURIComponent(v));
            }
          }
          return str.join("&");
    };

var marmottajax = function() {

	if (typeof this.self !== "undefined") {

		return new marmottajax(marmottajax.normalize(arguments));

	}

	var data = marmottajax.normalize(arguments);

	if (data === null) {

		throw "Les arguments passées à marmottajax sont invalides.";

	}

	this.url = data.url;
	this.method = data.method;
	this.json = data.json;
	this.watch = data.watch;
	this.parameters = data.parameters;
	this.headers = data.headers;

	if (this.method === "post" || this.method === "put" || this.method === "update" || this.method === "delete")
        
		this.postData = serialize(this.parameters);
    
	else {
        
		this.url += this.url.indexOf("?") < 0 ? "?" : "";
        
		for (var key in this.parameters)
            
		    this.url += serialize(this.parameters)
        
	}

	this.setXhr();

	this.setWatcher();

};
module.exports = marmottajax;

/**
 * constants.js
 *
 * Constants variables
 */

marmottajax.defaultData = {

	method: "get",
	json: false,
	watch: -1,

	parameters: {}

};

marmottajax.validMethods = ["get", "post", "put", "update", "delete"];
marmottajax.okStatusCodes = [200, 201, 202, 203, 204, 205, 206];


/**
 * normalize-data.js
 *
 * Normalize data in Ajax request
 */

marmottajax.normalize = function(data) {

	/**
	 * Search data in arguments
	 */

	if (data.length === 0) {

		return null;

	}

	var result = {};

	if (data.length === 1 && typeof data[0] === "object") {

		result = data[0];

	}

	else if (data.length === 1 && typeof data[0] === "string") {

		result = {

			url: data[0]

		};

	}

	else if (data.length === 2 && typeof data[0] === "string" && typeof data[1] === "object") {

		data[1].url = data[0];

		result = data[1];

	}

	/**
	 * Normalize data in arguments
	 */

	if (!(typeof result.method === "string" && marmottajax.validMethods.indexOf(result.method.toLowerCase()) != -1)) {

		result.method = marmottajax.defaultData.method;

	}

	else {

		result.method = result.method.toLowerCase();

	}

	if (typeof result.json !== "boolean") {

		result.json = marmottajax.defaultData.json;

	}

	if (typeof result.watch !== "number") {

		result.watch = marmottajax.defaultData.watch;

	}

	if (typeof result.parameters !== "object") {

		result.parameters = marmottajax.defaultData.parameters;

	}

	if (typeof result.headers !== "object") {

		result.headers = marmottajax.defaultData.headers;

	}

	return result;

};
/**
 * set-xhr.js
 *
 * Set Watcher
 */

marmottajax.prototype.setWatcher = function () {

    if (this.watch !== -1) {

        this.watchIntervalFunction = function () {

            if (this.xhr.readyState === 4 && arr_contains(marmottajax.okStatusCodes, this.xhr.status)) {

                this.updateXhr();

            }

            this.watcherTimeout();

        };

        this.watcherTimeout();

        this.stop = function () {

            this.changeTime(-1);

        };

        this.changeTime = function (newTime) {

            clearTimeout(this.changeTimeout);

            this.watch = typeof newTime === "number" ? newTime : this.watch;

            this.watcherTimeout();

        };

    }

};
/**
 * set-xhr.js
 *
 * Set XMLHttpRequest
 */

marmottajax.prototype.setXhr = function () {

    this.xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

    this.xhr.lastResult = null;

    this.xhr.json = this.json;
    this.xhr.binding = null;

    this.bind = function (binding) {

        this.xhr.binding = binding;

        return this;

    };

    this.cancel = function (callback) {

        this.xhr.abort();

        return this;

    };

    this.xhr.callbacks = {

        then: [],
        change: [],
        error: []

    };

    for (var name in this.xhr.callbacks) {

        if (this.xhr.callbacks.hasOwnProperty(name)) {

            this[name] = function (name) {

                return function (callback) {

                    this.xhr.callbacks[name].push(callback);

                    return this;

                };

            }(name);

        }

    }

    this.xhr.call = function (categorie, result) {

        for (var i = 0; i < this.callbacks[categorie].length; i++) {

            if (typeof(this.callbacks[categorie][i]) === "function") {

                if (this.binding) {

                    this.callbacks[categorie][i].call(this.binding, result);

                }

                else {

                    this.callbacks[categorie][i](result);

                }

            }

        }

    };

    this.xhr.onreadystatechange = function () {

        if (this.readyState === 4 && arr_contains(marmottajax.okStatusCodes, this.status)) {

            var result = this.responseText;

            if (this.json) {

                try {

                    result = JSON.parse(result);

                }

                catch (error) {

                    this.call("error", "invalid json");

                    return false;

                }

            }

            this.lastResult = result;

            this.call("then", result);

        }

        else if (this.readyState === 4 && this.status == 404) {

            this.call("error", "404");

        }

        else if (this.readyState === 4) {

            this.call("error", "unknow");

        }

    };

    this.xhr.open(this.method, this.url, true);
    this.xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    if (this.headers) {
        for (header in this.headers) {
            if (this.headers.hasOwnProperty(header)) {

                this.xhr.setRequestHeader(header, this.headers[header]);

            }
        }
    }

    this.xhr.send(typeof this.postData != "undefined" ? this.postData : null);

};
/**
 * update-xhr.js
 *
 * Update XMLHttpRequest result
 */

marmottajax.prototype.updateXhr = function () {

    var data = {

        lastResult: this.xhr.lastResult,

        json: this.xhr.json,
        binding: this.xhr.binding,

        callbacks: {

            then: this.xhr.callbacks.then,
            change: this.xhr.callbacks.change,
            error: this.xhr.callbacks.error

        }

    };

    this.xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

    this.xhr.lastResult = data.lastResult;

    this.xhr.json = data.json;
    this.xhr.binding = data.binding;

    this.xhr.callbacks = {

        then: data.callbacks.then,
        change: data.callbacks.change,
        error: data.callbacks.error

    };

    this.xhr.call = function (categorie, result) {

        for (var i = 0; i < this.callbacks[categorie].length; i++) {

            if (typeof(this.callbacks[categorie][i]) === "function") {

                if (this.binding) {

                    this.callbacks[categorie][i].call(this.binding, result);

                }

                else {

                    this.callbacks[categorie][i](result);

                }

            }

        }

    };

    this.xhr.onreadystatechange = function () {

        if (this.readyState === 4 && arr_contains(marmottajax.okStatusCodes, this.status)) {

            var result = this.responseText;

            if (this.json) {

                try {

                    result = JSON.parse(result);

                }

                catch (error) {

                    this.call("error", "invalid json");

                    return false;

                }

            }

            isDifferent = this.lastResult != result;

            try {

                isDifferent = (typeof this.lastResult !== "string" ? JSON.stringify(this.lastResult) : this.lastResult) != (typeof result !== "string" ? JSON.stringify(result) : result);

            }

            catch (error) {
            }

            if (isDifferent) {

                this.call("change", result);

            }

            this.lastResult = result;

        }

        else if (this.readyState === 4 && this.status == 404) {

            this.call("error", "404");

        }

        else if (this.readyState === 4) {

            this.call("error", "unknow");

        }

    };

    this.xhr.open(this.method, this.url, true);
    this.xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    this.xhr.send(typeof postData != "undefined" ? postData : null);

};

/**
 * set-xhr.js
 *
 * Set Watcher 
 */

marmottajax.prototype.watcherTimeout = function() {

	if (this.watch !== -1) {

		this.changeTimeout = setTimeout(function(that) {

			return function() {

				that.watchIntervalFunction();

			};

		}(this), this.watch);

	}

};