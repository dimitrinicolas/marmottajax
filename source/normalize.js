
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