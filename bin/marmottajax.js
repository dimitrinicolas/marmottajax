;var marmottajax = (function(){
/**
 * main.js
 *
 * Main librairy file
 */

var arr_contains = function(obj, to_find)
{
    var i = obj.length;
    while (i--) {
        if (obj[i] === to_find) {
            return true;
        }
    }
    return false;
},

extend = function(o1, o2)   // Two objects, !! writes to o1 !!
{
    for(var p in o2)
        o1[p] = o2[p]
},

serialize = function(obj, prefix)
{
    var p, str = [];
    for(p in obj)
    {
      if (obj.hasOwnProperty(p))
      {
        var v = obj[p], is_obj = typeof v == "object",
            k = prefix ? prefix + "[" + (isNaN(+p) || is_obj ? p : '') + "]" : p;
        str.push(is_obj ?
          serialize(v, k) :
            encodeURIComponent(k) + "=" + encodeURIComponent(v));
      }
    }
    return str.join("&");
},


marmottajax = function(params)    // MAIN
{
    if(this.self)
        return new marmottajax(arguments)
    
	var tmp, form,
        t = this,
        is_empty_params = true,
        data = marmottajax.normalize(params)
        

	if (data === null)
		throw "Invalid arguments";

    extend(t, data)
    
    for(tmp in t.parameters)
        is_empty_params = false

    if(t.method == 'form')
    {
        // Single file uploading. IE9+

        
        if(!(data instanceof HTMLElement &&
            (is_input || data.matches('form'))))
                throw "Invalid form";


        var is_input = data.matches('input[name]')
        
        t.method = 'post'
        t.isform = true
        
        if(!t.url)
            t.url = data.action

        form = new FormData(data)
        
        if(is_input)
            form.append((data.name || 'file'), data.files[0])    // ONLY ONE now; FOR LOOP??!

        t.postData = form

        // formData.append((t.filename || 'file'), data);    // ONLY ONE now

    }
        else
    {
        if (t.method.toUpperCase() != 'GET')
            t.postData = serialize(t.parameters);
        else
            t.url += (t.url.slice(-1)=='?' || is_empty_params ? '' : '?')  +  serialize(t.parameters)
    }
    

	t.setXhr();
	t.setWatcher();
};

/**
 * constants.js
 *
 * Constants variables
 */

marmottajax.defaults = {

	method: "get",
	json: false,
	watch: -1,

	parameters: {},
	headers: {}

};

marmottajax.validMethods = ["get", "post", "put", "update", "delete", "form"];
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

	if (!data.length)
		return null;
    data = data[0]
    
	var data_method, param,
        result  = {url: data.url},
        typemap = {
            json:       'string',
            watch:      'number',
            parameters: 'object',
            headers:    'object'
        }
    
    
	/**
	 * Normalize data in arguments
	 */
    
    data_method = (typeof data.method == 'string') ? data.method.toLowerCase() : 0;
    data_method = !!~marmottajax.validMethods.indexOf(data_method) ? data_method : marmottajax.defaults.method;
    result.method = data_method

    
    for(param in typemap)
        result[param] = (typeof data[param]===typemap[param]) ? data[param] : marmottajax.defaults[param]

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

    if(!this.isform)
        this.xhr.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');


    if (this.headers)
        for (header in this.headers)
            if (this.headers.hasOwnProperty(header))
                this.xhr.setRequestHeader(header, this.headers[header]);

    this.xhr.send(this.postData ? this.postData : null);
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
    
    if(!this.isform)
        this.xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
    this.xhr.send(postData ? postData : null);

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

};return marmottajax; })();