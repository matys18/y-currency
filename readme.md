Y-currency lets you to easily convert currencies and get information about currency pairs. It uses the Yahoo Finance API where the rates are updated every few minutes. A full list of currency symbols is available in the bottom of the page. A CLI version for fast conversions in the terminal is also available here.

Installation:

npm install y-currency

Usage:

To convert currencies use convert(int or [array of ints], stringFrom, stringTo, callback(err,converted){} ):

Example:

var currency = require('y-currency');

currency.convert(10, 'USD', 'EUR', function(err,converted){
	
	if (err){
		console.log(err);
	}

	console.log(converted);
});

Outputs the converted currency as a float: 8.81

It is also possible to convert multiple values at once by entering an array:

var currency = require('y-currency');

currency.convert([10, 81, 99, 20, 67, 19], 'USD', 'EUR', function(err,converted){
	
	if (err){
		console.log(err);
	}

	console.log(converted);
});

Outputs an array of converted floats: [10, 81, 99, 20, 67, 19]


You can also get information about currency pairs by using getCurrency(stingCurrencyPair or [arrayOfStringCurrencyPairs], callback(err,currency){} ).

Example:

var currency = require('y-currency');

currency.getCurrency('USDEUR',function(err,response){

	if (err){
		console.log(err);
	}

	console.log(response);

});

Outputs an object:

You can also get multiple currency pairs by entering an array of pairs as so: 

var currency = require('y-currency');

currency.getCurrency(['USDEUR','NZDCAD','SEKTHB'],function(err,response){

	if (err){
		console.log(err);
	}

	console.log(response);

});

Outputs an array of objects:
