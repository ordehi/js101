## Question 1

Will the code below raise an error?

```js
let numbers = [1, 2, 3];
numbers[6] = 5;
```

### Answer

It won't raise an error, indexes 3-5 will be filled with empty places and the number 5 will be added at index 6.

### Bonus:

```js
let numbers = [1, 2, 3];
numbers[6] = 5;
numbers[4]; // what will this line return?\
```

### Answer

It will return `undefined` despite the index being empty which is not the same as `undefined`. Launch: If you use `map()` the empty indexes will be empty on the new array, not `undefined`

## Question 2

How can you determine whether a given string ends with an exclamation mark (!)?

```js
let str1 = 'Come over here!'; // true
let str2 = "What's up, Doc?"; // false
```

### Answer

`str1.substring(str1.length - 1) === '!'`

Launch: `str1.endsWith("!");`

MDN Docs: [String.prototype.endsWith()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith)

> The `endsWith()` method determines whether a string ends with the characters of a specified string, returning `true` or `false` as appropriate.

## Question 3

Determine whether the following object of people and their age contains an entry for 'Spot':

```js
let ages = { Herman: 32, Lily: 30, Grandpa: 402, Eddie: 10 };
```

### Answer

`ages.hasOwnProperty('Spot')`

## Question 4

Using the following string, create a new string that contains all lowercase letters except for the first character, which should be capitalized. (See the example output.)

```js
let munstersDescription = 'the Munsters are CREEPY and Spooky.';
// => The munsters are creepy and spooky.
```

### Answer

`let munstersCapNLow = munstersDescription[0].toUpperCase() + munstersDescription.substring(1).toLowerCase()`

## Question 5

What will the following code output?

```js
console.log(false == '0');
console.log(false === '0');
```

### Answer

Line 1: `true`
Line 2: `false`

The weak equality operator `==` coerces the string of 0 to a number and then to a boolean which is equal `false` in this case.

## Question 6

We have most of the Munster family in our ages object:

```js
let ages = { Herman: 32, Lily: 30, Grandpa: 5843, Eddie: 10 };
```

Add entries for Marilyn and Spot to the object:

```js
let additionalAges = { Marilyn: 22, Spot: 237 };
```

### Answer

`ages.Marilyn = additionalAges.Marilyn`
`ages.Spot = additionalAges.Spot`

Or simply:

`ages.Marilyn = 22`
`ages.Spot = 237`

### Launch:

`Object.assign(ages, additionalAges);`

## Question 7

Determine whether the name Dino appears in the strings below -- check each string separately):

```js
let str1 =
  'Few things in life are as important as house training your pet dinosaur.';
let str2 = 'Fred and Wilma have a pet dinosaur named Dino.';
```

### Answer

```js
str1.includes('Dino'); // false
str2.includes('Dino'); // true
```

### Launch

Alternate Solution

```js
str1.match('Dino') !== null; // false
str2.match('Dino') !== null; // true
```

Yet another Solution

```js
str1.indexOf('Dino') > -1; // false
str2.indexOf('Dino') > -1; // true
```

## Question 8

How can we add the family pet, "Dino", to the following array?

```js
let flintstones = ['Fred', 'Barney', 'Wilma', 'Betty', 'Bambam', 'Pebbles'];
```

### Answer

```js
flintstones.push('Dino');
flintstones.unshift('Dino');
```

### Launch

Alternate Solution

```js
let flintstones = ['Fred', 'Barney', 'Wilma', 'Betty', 'Bambam', 'Pebbles'];
flintstones = flintstones.concat('Dino');
flintstones; // => [ 'Fred', 'Barney', 'Wilma', 'Betty', 'Bambam', 'Pebbles', 'Dino' ]
```

Yet Another Solution

```js
let flintstones = ['Fred', 'Barney', 'Wilma', 'Betty', 'Bambam', 'Pebbles'];
flintstones[flintstones.length] = 'Dino';
flintstones; // => [ 'Fred', 'Barney', 'Wilma', 'Betty', 'Bambam', 'Pebbles', 'Dino' ]
```

## Question 9

In the previous problem, our first answer added 'Dino' to the array like this:

```js
let flintstones = ['Fred', 'Barney', 'Wilma', 'Betty', 'Bambam', 'Pebbles'];
flintstones.push('Dino');
```

How can we add multiple items to our array? (`'Dino'` and `'Hoppy'`)

```js
flintstones = flintstones.concat('Dino', 'Hoppy');
```

### Launch

```js
let flintstones = ['Fred', 'Barney', 'Wilma', 'Betty', 'Bambam', 'Pebbles'];
flintstones.push('Dino', 'Hoppy'); // we can pass multiple arguments to push
flintstones; // => [ 'Fred', 'Barney', 'Wilma', 'Betty', 'Bambam', 'Pebbles', 'Dino', 'Hoppy' ]
```

## Question 10

Return a new version of this sentence that ends just before the word `house`. Don't worry about spaces or punctuation: remove everything starting from the beginning of `house` to the end of the sentence.

```js
let advice =
  'Few things in life are as important as house training your pet dinosaur.';

// Expected return value:
// => 'Few things in life are as important as '
```

### Answer

```js
advice.split('house')[0];
```

### Launch

```js
advice.slice(0, advice.indexOf('house'));
// => 'Few things in life are as important as '
```
