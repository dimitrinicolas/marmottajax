
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


marmottajax = function()    // MAIN
{
	if (this.self)
		return new marmottajax(marmottajax.normalize(arguments));


	var data = marmottajax.normalize(arguments);

	if (data === null)
		throw "Invalid arguments";

    extend(this, data);

	if (this.method.toUpperCase() != 'GET')
		this.postData = serialize(this.parameters);
	else
		this.url += (this.url.slice(-1)=='?' ? '' : '?')  +  serialize(this.parameters)


	this.setXhr();
	this.setWatcher();
};