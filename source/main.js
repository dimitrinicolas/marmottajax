
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