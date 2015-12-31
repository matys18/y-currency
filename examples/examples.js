var currency = require('../main.js');
//var currency = require('y-currency');
var util = require('util');

currency.getCurrency(['USDEUR','NZDCAD','THBSEK'], function(err,response){

	if (err){
		console.log(err);
	}

	console.log('Array input: ', util.inspect(response));

});

currency.getCurrency('USDEUR', function(err,response){

	if (err){
		console.log(err);
	}

	console.log('String input: ', util.inspect(response));

});

currency.convert([10,20,30,40,50],'USD','EUR', function(err, converted){
	if (err) {
		console.error(err);
	}

	console.log('Array input: ', converted);
});

currency.convert(10,'USD','EUR', function(err, converted){
	if (err) {
		console.error(err);
	}

	console.log('String input: ', converted);
});