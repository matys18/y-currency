var http = require('http');

module.exports = {

	getCurrency: function(pairs,callback){
		if (typeof pairs === 'string'  && pairs.length < 6 || Object.prototype.toString.call(pairs) === '[object Array]' && !pairs.length) {
			return callback(new Error('Invalid pair format provided! .getCurrency() only accepts strings and arrays of strings!'), null);
		}
		if (typeof pairs === 'string'){
			var query = pairs;
		} else if (Object.prototype.toString.call(pairs) === '[object Array]') {
			var query = pairs.join('%2C');
		}
		var options = {
			host: 'query.yahooapis.com',
			path: '/v1/public/yql?q=select%20*%20from%20yahoo.finance.xchange%20where%20pair%3D%22'+ query +'%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys',
			method: 'GET'
		};
		var req = http.get(options, function(res){
			res.setEncoding('utf-8');
 			res.on('data', function(stuff){
 				var parsed = JSON.parse(stuff);
 				return callback(null, parsed.query.results.rate);
			});
		}).on('error', function(e){
			return callback(new Error('Y-currency request error:' + e.message), null);
		});
	},

	convert: function(amount, from, to, callback){
		if (amount.length === 0 || from.length < 3 || to.length < 3) {
			return callback(new Error('Faulty information provided! Make sure you are using the corect syntax! Amount = int, from = string, to = string'), null);
		}
		var query = from + to;
		var options = {
			host: 'query.yahooapis.com',
			path: '/v1/public/yql?q=select%20*%20from%20yahoo.finance.xchange%20where%20pair%3D%22'+ query +'%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys',
			method: 'GET'
		};
		var req = http.get(options, function(res){
			res.setEncoding('utf-8');
 			res.on('data', function(stuff){
 				var parsed = JSON.parse(stuff);
 				if (typeof amount === 'number'){
 					var results = parsed.query.results.rate.Rate * amount;
 					return callback(null, results.toFixed(2));
 				} else if (Object.prototype.toString.call(amount) === '[object Array]') {
 					var results = [];
 					amount.forEach(function(value,key){
 						var value = amount[key] * parsed.query.results.rate.Rate;
 						results.push(value.toFixed(2));
 					});
 					return callback(null,results);
 				} else {
 					return callback(new Error('Invalid currency format provided! Make sure to use a string or an array!'), null);
 				}
			});
		}).on('error', function(e){
		  return callback(new Error('Y-currency request error:' + e.message), null);
		});
	}

};
