
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
                    //  debugger
              var v = obj[p], is_obj = typeof v == "object",
                  k = prefix ? prefix + "[" + (isNaN(+p) || is_obj ? p : '') + "]" : p; //(is_obj && !isNaN(+p) ? p : '')
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
        
		for (var key in this.parameters) {
            
		    this.url += serialize(this.parameters)// this.parameters.hasOwnProperty(key) ? "&" + key + "=" + this.parameters[key] : "";
            
		}
        
	}

	this.setXhr();

	this.setWatcher();

};