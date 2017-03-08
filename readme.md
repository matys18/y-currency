## Installation
 
    npm install y-currency

<a name="module_y-currency"></a>
## y-currency
Easy currency conversion using the yahoo api.

**Version**: 1.0.3  
**Author:** Matas Kairaitis  
**License**: MIT  

* [y-currency](#module_y-currency)
    * _static_
        * [.convert(values, from, to, cb)](#module_y-currency.convert)
        * [.getCurrency(symbols, cb)](#module_y-currency.getCurrency)
    * _inner_
        * [~convertCallback](#module_y-currency..convertCallback) : <code>function</code>
        * [~getCurrencyCallback](#module_y-currency..getCurrencyCallback) : <code>function</code>

<a name="module_y-currency.convert"></a>
### y-currency.convert(values, from, to, cb)
Converts the provided values to another currency in one request.

**Kind**: static method of <code>[y-currency](#module_y-currency)</code>  
**Summary**: When converting multiple values you should always pass them as an array instead of
calling this function multiple times. This way you minimize the amount of requests that are made.  

| Param | Type | Description |
| --- | --- | --- |
| values | <code>number</code> &#124; <code>Array.&lt;number&gt;</code> | A string or array of strings of the amounts to convert. |
| from | <code>string</code> | The currency symbol to convert from. Will return an error if the symbol is not supported. |
| to | <code>string</code> | The currency symbol to convert to. ill return an error if the symbol is not supported. |
| cb | <code>convertCallback</code> | The calback that will be executed when the request is processed. |

**Example**  
```js
currency.convert(10, 'USD', 'EUR', function(err, converted) {
   if (err) // Handle error

   console.log(converted); // Outputs ~8.91 (the converted value)
});
```
**Example**  
```js
currency.convert([10, 20, 40], 'USD', 'EUR', function(err, converted) {
   if (err) // Handle error

   console.log(converted); // Outputs [9.11, 18.22, 27.33] (the converted values in an array)
});
```
<a name="module_y-currency.getCurrency"></a>
### y-currency.getCurrency(symbols, cb)
Gets currency information as an object or array of objects in one request.

**Kind**: static method of <code>[y-currency](#module_y-currency)</code>  

| Param | Type | Description |
| --- | --- | --- |
| symbols | <code>string</code> &#124; <code>Array.&lt;string&gt;</code> | A string or array of strings of the pairs to get information on. |
| cb | <code>getCurrencyCallback</code> | The calback that will be executed when the request is processed. |

**Example**  
```js
currency.getCurrency('USDEUR', function(err, result) {
   if (err) // Handle error

   console.log(result); // Outputs an object with currency information
   
   // Output
   { id: 'USDEUR',
     Name: 'USD to EUR',
     Rate: '0.891',
     Date: '2/27/2015',
     Time: '10:56am',
     Ask: '0.891',
     Bid: '0.8909' }
});
```
**Example**  
```js
currency.getCurrency(['USDEUR', 'NZDCAD', 'THBSEK'], function(err, result) {
   if (err) // Handle error

   console.log(result); // Outputs an object array with currency information
   
   // Output
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
});
```
<a name="module_y-currency..convertCallback"></a>
### y-currency~convertCallback : <code>function</code>
Callback that handles the response by convert().

**Kind**: inner typedef of <code>[y-currency](#module_y-currency)</code>  

| Param | Type | Description |
| --- | --- | --- |
| err | <code>error</code> &#124; <code>null</code> | If an error occurs during the execution of the function it is passed here, otherwise null. |
| values | <code>number</code> &#124; <code>Array.&lt;number&gt;</code> &#124; <code>null</code> | If no errors occured this contains the converted value/values, otherwise null. |

<a name="module_y-currency..getCurrencyCallback"></a>
### y-currency~getCurrencyCallback : <code>function</code>
Callback that handles the response by getCurrency().

**Kind**: inner typedef of <code>[y-currency](#module_y-currency)</code>  

| Param | Type | Description |
| --- | --- | --- |
| err | <code>error</code> &#124; <code>null</code> | If an error occurs during the execution of the function it is passed here, otherwise null. |
| values | <code>Object</code> &#124; <code>Array.&lt;Object&gt;</code> &#124; <code>null</code> | If no errors occured this contains the object or object array containing the currency information, otherwise null. |

