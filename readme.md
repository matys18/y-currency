**Y-currency**
--------------

Easy currency conversion and currency information retrieval using the Yahoo Finance API where the rates are updated every few minutes. 


**Installation:**
-----------------

    npm install y-currency
    
    

**Usage:**
---------

To convert currencies use the `convert(amount,from,to,callback)` function.

**Example:**

    var currency = require('y-currency');
    
    currency.convert(10, 'USD', 'EUR', function(err,converted){
        
        if (err){
            console.log(err);
        }
    
        console.log(converted);
    });

Outputs the converted currency as a float: *`8.81`*

It is also possible to convert multiple values at once by entering an array:

    var currency = require('y-currency');
    
    currency.convert([10, 81, 99, 20, 67, 19], 'USD', 'EUR', function(err,converted){
        
        if (err){
            console.log(err);
        }
    
        console.log(converted);
    });

Outputs an array of converted floats: *`[8.93, 17.87, 26.80, 35.74, 44.67]`*


----------


You can also get information about currency pairs by using `getCurrency(pair,callback)`

**Example:**

    var currency = require('y-currency');
    
    currency.getCurrency('USDEUR',function(err,response){
    
        if (err){
            console.log(err);
        }
    
        console.log(response);
    
    });

Outputs an object: 

     { id: 'USDEUR',
      Name: 'USD to EUR',
      Rate: '0.891',
      Date: '2/27/2015',
      Time: '10:56am',
      Ask: '0.891',
      Bid: '0.8909' }

You can also get multiple currency pairs by entering an array of pairs as so: 

    var currency = require('y-currency');
    
    currency.getCurrency(['USDEUR','NZDCAD','SEKTHB'],function(err,response){
    
        if (err){
            console.log(err);
        }
    
        console.log(response);
    
    });

Outputs an array of objects:

    [ { id: 'USDEUR',
            Name: 'USD to EUR',
            Rate: '0.8935',
            Date: '2/27/2015',
            Time: '12:07pm',
            Ask: '0.8935',
            Bid: '0.8935' },
          { id: 'NZDCAD',
            Name: 'NZD to CAD',
            Rate: '0.9452',
            Date: '2/27/2015',
            Time: '12:07pm',
            Ask: '0.9455',
            Bid: '0.9449' },
          { id: 'THBSEK',
            Name: 'THB to SEK',
            Rate: '0.2587',
            Date: '2/27/2015',
            Time: '12:07pm',
            Ask: '0.2592',
            Bid: '0.2581' } ]

