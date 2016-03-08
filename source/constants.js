
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
