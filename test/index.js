var currency = require('../index.js');
var chai = require('chai'),
	assert = chai.assert,
	expect = chai.expect,
	should = chai.should();

describe('y-currency module tests', function() {

	describe('getCurrency()', function() {
		describe('exceptions', function() {
			it('Should give an Error due to invalid parameter length(empty)', function(done) {
				currency.getCurrency('', function(err, result) {
					err.should.be.a('Error');
					err.should.not.be.a('null');
					expect(result).to.be.a('null');
					done();
				});
			});

			it('Should give an Error due to invalid parameter length(too short)', function(done) {
				currency.getCurrency('USDSE', function(err, result) {
					err.should.be.a('Error');
					err.should.not.be.a('null');
					expect(result).to.be.a('null');
					done();
				});
			});

			it('Should give an Error due to invalid parameter length(too long)', function(done) {
				currency.getCurrency('USDSEKK', function(err, result) {
					err.should.be.a('Error');
					err.should.not.be.a('null');
					expect(result).to.be.a('null');
					done();
				});
			});

			it('Should give a TypeError due to invalid pair type(string)', function(done) {
				currency.getCurrency(10, function(err, result) {
					err.should.be.a('Error');
					err.should.not.be.a('null');
					expect(result).to.be.a('null');
					done();
				});
			});

			it('Should give an error due to invalid currency symbol(string)', function(done) {
				currency.getCurrency('USDBBX', function(err, result) {
					err.should.be.a('Error');
					err.should.not.be.a('null');
					expect(result).to.be.a('null');
					done();
				});
			});

			it('Should give an Error due to invalid parameter[] length(empty)', function(done) {
				currency.getCurrency([], function(err, result) {
					err.should.be.a('Error');
					err.should.not.be.a('null');
					expect(result).to.be.a('null');
					done();
				});
			});

			it('Should give an Error due to invalid parameter[] value length(too short)', function(done) {
				currency.getCurrency(['USDSE', 'USDSEK'], function(err, result) {
					err.should.be.a('Error');
					err.should.not.be.a('null');
					expect(result).to.be.a('null');
					done();
				});
			});

			it('Should give an Error due to invalid parameter[] value length(too long)', function(done) {
				currency.getCurrency(['USDSEKK', 'USDSEK'], function(err, result) {
					err.should.be.a('Error');
					err.should.not.be.a('null');
					expect(result).to.be.a('null');
					done();
				});
			});

			it('Should give a TypeError due to invalid pair type(array)', function(done) {
				currency.getCurrency([10, 'USDSEK'], function(err, result) {
					err.should.be.a('Error');
					err.should.not.be.a('null');
					expect(result).to.be.a('null');
					done();
				});
			});

			it('Should give an error due to invalid currency symbol(array)', function(done) {
				currency.getCurrency(['USDBBX', 'USDSEK'], function(err, result) {
					err.should.be.a('Error');
					err.should.not.be.a('null');
					expect(result).to.be.a('null');
					done();
				});
			});
		});

		describe('results', function() {
			it('Should return an object with certain properties', function(done) {
				currency.getCurrency('USDSEK', function(err, result) {
					expect(err).to.be.a('null');
					result.should.be.a('object');
					var properties = ['id', 'Name', 'Date', 'Rate', 'Time', 'Ask', 'Bid'];
					for (var i = 0; i < properties.length; i++) {
						result.should.have.property(properties[i]).should.not.equal('N/A');
					}
					done();
				});
			});

			it('Should return an array of objects with certain properties', function(done) {
				currency.getCurrency(['USDSEK', 'USDEUR'], function(err, result) {
					expect(err).to.be.a('null');
					Array.isArray(result).should.equal(true);
					var properties = ['id', 'Name', 'Date', 'Rate', 'Time', 'Ask', 'Bid'];
					for (var i = 0; i < result.length; i++) {
						result[i].should.be.a('object');
						for (var ii = 0; ii < properties.length; ii++) {
							result[i].should.have.property(properties[ii]).should.not.equal('N/A');
						}
					}
					done();
				});
			});
		});
	});

	describe('convert()', function() {
		describe('exceptions', function() {
			it('Should give type error', function(done) {
				currency.convert('10', 'USD', 'SEK', function(err, result) {
					err.should.be.a('Error');
					expect(result).to.be.a('null');
					done();
				});
			});

			it('Should give an error due to invalid parameter types(from)', function(done) {
				currency.convert(10, 10, 'SEK', function(err, result) {
					err.should.be.a('Error');
					expect(result).to.be.a('null');
					done();
				});
			});

			it('Should give an error due to invalid parameter types(to)', function(done) {
				currency.convert(10, 'USD', 10, function(err, result) {
					err.should.be.a('Error');
					expect(result).to.be.a('null');
					done();
				});
			});

			it('Should give an error due to invalid parameter lengths(from)', function(done) {
				currency.convert(10, 'USDX', 'SEK', function(err, result) {
					err.should.be.a('Error');
					expect(result).to.be.a('null');
					done();
				});
			});

			it('Should give an error due to invalid parameter lengths(to)', function(done) {
				currency.convert(10, 'USD', 'SEKS', function(err, result) {
					err.should.be.a('Error');
					expect(result).to.be.a('null');
					done();
				});
			});

			it('Should give an error due to empty array', function(done) {
				currency.convert([], 'USD', 'SEK', function(err, result) {
					err.should.be.a('Error');
					expect(result).to.be.a('null');
					done();
				});
			});

			it('Should give an error due to invalid parameter types(array)', function(done) {
				currency.convert([10, 20, '30'], 'USD', 'SEK', function(err, result) {
					err.should.be.a('Error');
					expect(result).to.be.a('null');
					done();
				});
			});
		});

		describe('results', function() {
			it('Should convert a value to another currency', function(done) {
				currency.convert(10, 'USD', 'SEK', function(err, result) {
					expect(err).to.be.a('null');
					result.should.be.a('number');
					done();
				});
			});

			it('Should convert an array of values to another currency', function(done) {
				currency.convert([10, 20, 30], 'USD', 'SEK', function(err, result) {
					expect(err).to.be.a('null');
					expect(result).to.be.instanceof(Array);
					expect(result).to.have.length.of(3);
					for (var i = 0; i < result.length; i++) {
						expect(result[i]).to.be.a('number');
					}
					done();
				});
			});
		});
	});

});