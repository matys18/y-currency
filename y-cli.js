var currency = require('y-currency');

var amount = process.argv[2];
var from = process.argv[3];
var to = process.argv[4];

currency.convert(amount,from,to,function(err,converted){
	console.log(amount + from + ' = ' + converted.toString() + to);
});