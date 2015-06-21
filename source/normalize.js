
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