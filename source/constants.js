
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
	headers: {},
	success: function(){},
	error: function(){}

};

marmottajax.validMethods = ["get", "post", "put", "update", "delete"];
marmottajax.okStatusCodes = [200, 201, 202, 203, 204, 205, 206];
