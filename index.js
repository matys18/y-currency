/**
 * Easy currency conversion using the yahoo api.
 *
 * @module y-currency
 * @author Matas Kairaitis
 * @license MIT
 * @version 1.0.2
 */
var http = require('http');

/* Exports prototype */
var exports = module.exports = {};

/**
 * Converts the provided values to another currency in one request.
 *
 * @function
 * @static
 * @param {number | number[]} values - A string or array of strings
 * of the amounts to convert.
 * @param {string} from - The currency symbol to convert from. Will return
 * an error if the symbol is not supported.
 * @param {string} to - The currency symbol to convert to. ill return
 * an error if the symbol is not supported.
 * @param {convertCallback} cb - The calback that will be executed when
 * the request is processed.
 * @example
 * currency.convert(10, 'USD', 'EUR', function(err, converted) {
 *    if (err) // Handle error
 *
 *    console.log(converted); // Outputs ~8.91 (the converted value)
 * });
 * @example
 * currency.convert([10, 20, 40], 'USD', 'EUR', function(err, converted) {
 *    if (err) // Handle error
 *
 *    console.log(converted); // Outputs [9.11, 18.22, 27.33] (the converted values in an array)
 * });
 * @summary When converting multiple values you should always pass them as an array instead of
 * calling this function multiple times. This way you minimize the amount of requests that are made.
 */
var convert = exports.convert = function(values, from, to, cb) {

	// Check the parameter types.
	if (!(Array.isArray(values) || typeof values === 'number') || typeof to !== 'string' || typeof from !== 'string') {
		return cb(new TypeError('Invalid parameter types supplied.'), null);
	}

	// Check parameter lengths.
	if (from.length != 3 || to.length != 3 || values.length < 1) {
		return cb(new Error('Invalid parameter lengths.'), null);
	}

	// Check that array contains valid data
	if (Array.isArray(values)) {
		for (var i = 0; i < values.length; i++) {
			if (typeof values[i] !== 'number') {
				return cb(new TypeError('Value array contains invalid data types'), null)
			}
		}
	}

	// Get the currencies and convert them.
	getCurrency(from + to, function(err, result) {
		if (err) return cb(err, null);
		if (typeof values === 'number') return cb(null, parseFloat((result.Rate * values).toFixed(2)));
		
		// If values is not a number it must be an array of number.
		for (var i = 0; i < values.length; i++) {
			var converted = values[i] * result.Rate;
			values[i] = parseFloat(converted.toFixed(2));
		}

		return cb(null, values);
	});
};

/**
 * Gets currency information as an object or array of objects in one request.
 *
 * @function
 * @static
 * @param {string | string[]} symbols - A string or array of strings
 * of the pairs to get information on.
 * @param {getCurrencyCallback} cb - The calback that will be executed when
 * the request is processed.
 * @example
 * currency.getCurrency('USDEUR', function(err, result) {
 *    if (err) // Handle error
 *
 *    console.log(result); // Outputs an object with currency information
 *    
 *    // Output
 *    { id: 'USDEUR',
 *      Name: 'USD to EUR',
 *      Rate: '0.891',
 *      Date: '2/27/2015',
 *      Time: '10:56am',
 *      Ask: '0.891',
 *      Bid: '0.8909' }
 * });
 * @example
 * currency.getCurrency(['USDEUR', 'NZDCAD', 'THBSEK'], function(err, result) {
 *    if (err) // Handle error
 *
 *    console.log(result); // Outputs an object array with currency information
 *    
 *    // Output
 *    [ { id: 'USDEUR',
 *       Name: 'USD to EUR',
 *       Rate: '0.8935',
 *       Date: '2/27/2015',
 *       Time: '12:07pm',
 *       Ask: '0.8935',
 *       Bid: '0.8935' },
 *     { id: 'NZDCAD',
 *       Name: 'NZD to CAD',
 *       Rate: '0.9452',
 *       Date: '2/27/2015',
 *       Time: '12:07pm',
 *       Ask: '0.9455',
 *       Bid: '0.9449' },
 *     { id: 'THBSEK',
 *       Name: 'THB to SEK',
 *       Rate: '0.2587',
 *       Date: '2/27/2015',
 *       Time: '12:07pm',
 *       Ask: '0.2592',
 *       Bid: '0.2581' } ]
 * });
 */
var getCurrency = exports.getCurrency = function(symbols, cb) {

	// Check the parameter types.
	if (!(Array.isArray(symbols) || typeof symbols === 'string')) {
		return cb(new TypeError('Invalid parameter types supplied.'), null);
	}

	// Check parameter lengths.
	if ((Array.isArray(symbols) && symbols.length < 1) || (typeof symbols === 'string' && symbols.length != 6)) {
		return cb(new Error('Invalid parameter lengths'), null);
	}

	// If symbols is an array make sure it consists only of strings.
	if (Array.isArray(symbols)) {
		for (var i = 0; i < symbols.length; i++) {
			if (typeof symbols[i] !== 'string' || symbols[i].length != 6) {
				return cb(new Error('Invalid symbol type or length in symbol array'), null);
			}
		}
	}

	// Manipulate the data into the query
	if (typeof symbols === 'string'){
		var query = symbols;
	} else if (Array.isArray(symbols)) {
		var query = symbols.join('%2C');
	}

	// Craft the request
	var options = {
		host: 'query.yahooapis.com',
		path: '/v1/public/yql?q=select%20*%20from%20yahoo.finance.xchange%20where%20pair%3D%22'
				+ query +'%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys',
		method: 'GET'
	};
	
	// Execute the request
	http.get(options, function(res) {
		res.setEncoding('utf-8');
 		res.on('data', function(stuff) {
 			var parsed = JSON.parse(stuff);
 			var vals = parsed.query.results.rate;
 			if (typeof vals == 'object' && vals.Name == 'N/A') {
 				return cb(new Error('The result is undifined. Make sure that you are using correct currency symbols'), null);
 			} else if (Array.isArray(vals)) {
 				for (var i = 0; i < vals.length; i++) {
 					if (vals[i].Name == 'N/A') {
 						cb(new Error('The result is undifined. Make sure that you are using correct currency symbols'), null);
 					}
 				}
 			}
 			return cb(null, parsed.query.results.rate);
		});
	}).on('error', function(err){
		return cb(err, null);
	});
};

/**
 * Callback that handles the response by convert().
 *
 * @callback convertCallback
 * @param {error | null} err - If an error occurs during the execution
 * of the function it is passed here, otherwise null.
 * @param {number| number[] | null} values - If no errors occured this
 * contains the converted value/values, otherwise null.
 */

 /**
 * Callback that handles the response by getCurrency().
 *
 * @callback getCurrencyCallback
 * @param {error | null} err - If an error occurs during the execution
 * of the function it is passed here, otherwise null.
 * @param {Object | Object[] | null} values - If no errors occured this
 * contains the object or object array containing the currency information,
 * otherwise null.
 */