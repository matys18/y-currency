var http = require('http');

module.exports = {

	getCurrency: function(pairs,callback){
		if (pairs.length == 0) {
			return callback('No currency symbols provided',null);
		}
		var query = '';
		if (typeof pairs === 'string'){
			query = pairs;
		} else if (Object.prototype.toString.call(pairs) === '[object Array]') {
			var arrLen = pairs.length - 1;
			pairs.forEach(function(value,key){
				if (key == arrLen) {
					query += value;
				} else {
					var adjusted = value + '%2C';
					query += adjusted;
				}
			});
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
 				callback(null, parsed.query.results.rate);
			});
		}).on('error', function(e){
		  console.log('Y-currency request error:' + e.message);
		});
	},

	convert: function(amount, from, to, callback){
		if (amount.length == 0 || from.length == 0 || to.length == 0) {
			return callback(errorText,'Faulty information provided!');
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
 					callback(null, results.toFixed(2));
 				} else if (Object.prototype.toString.call(amount) === '[object Array]') {
 					var results = [];
 					amount.forEach(function(value,key){
 						var value = amount[key] * parsed.query.results.rate.Rate;
 						results.push(value.toFixed(2));
 					});
 					callback(null,results);
 				} else {
 					callback('Invalid currency format provided! Make sure to use a string or an array!', null);
 				}
			});
		}).on('error', function(e){
		  console.log('Y-currency request error:' + e.message);
		});
	}

};