var currency = require('../index.js');
//var currency = require('y-currency');
var util = require('util');

/* Examples for getCurrency() */
currency.getCurrency(['USDEUR','NZDCAD','THBSEK'], function(err,response){

	if (err){
		return console.log(err);
	}

	console.log('Array input: ', util.inspect(response));

});

currency.getCurrency('USDSWG', function(err,response){

	if (err){
		return console.log(err);
	}

	console.log('String input: ', util.inspect(response));

});

/* Examples for convert */
currency.convert([10,20,30,40,50],'USD','EUR', function(err, converted){
	if (err) {
		return console.error(err);
	}

	console.log('Array input: ', converted);
});

currency.convert(10,'USD','EUR', function(err, converted){
	if (err) {
		return console.error(err);
	}

	console.log('String input: ', converted);
});