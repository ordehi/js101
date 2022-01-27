## Question 1

Given a string, return a new string that replaces every occurrence of the word "important" with "urgent":

```js
let advice =
  'Few things in life are as important as house training your pet dinosaur.';
```

```js
let urgent = advice.replace(/important/g, 'urgent');
```

## Question 2

The `Array.prototype.reverse` method reverses the order of elements in an array, and `Array.prototype.sort` can rearrange the elements in a variety of ways, including descending. Both of these methods mutate the original array as shown below. Write two distinct ways of reversing the array without mutating the original array. Use `reverse` for the first solution, and `sort` for the second.

```js
let numbers = [1, 2, 3, 4, 5];
numbers.reverse();
console.log(numbers); // [ 5, 4, 3, 2, 1 ]

numbers = [1, 2, 3, 4, 5];
numbers.sort((num1, num2) => num2 - num1);
console.log(numbers); // [ 5, 4, 3, 2, 1 ]
```

### Answer

```js
function reverse(array) {
  let reversed = [];
  array.forEach((item) => reversed.unshift(item));

  return reversed;
}
```

## Question 3

Given a number and an array, determine whether the number is included in the array.

```js
let numbers = [1, 2, 3, 4, 5, 15, 16, 17, 95, 96, 99];

let number1 = 8; // false
let number2 = 95; // true
```

### Answer

```js
numbers.includes(number1);
numbers.indexOf(number2) !== -1;
```

## Question 4

Starting with the string:

```js
let famousWords = 'seven years ago...';
```

show two different ways to put the expected "Four score and " in front of it.

### Answer

```js
famousWords = 'Four score and ' + famousWords;
'Four score and'.concat(' ', famousWords);
```

## Question 5

Given an array of numbers `[1, 2, 3, 4, 5]`, mutate the array by removing the number at index 2, so that the array becomes `[1, 2, 4, 5]`.

### Answer

```js
let arr = [1, 2, 3, 4, 5];
arr.splice(2, 1);
```

## Question 6

Suppose we build an array like this:

```js
let flintstones = ['Fred', 'Wilma'];
flintstones.push(['Barney', 'Betty']);
flintstones.push(['Bambam', 'Pebbles']);
```

This code will create a nested array that looks like this:

```js
['Fred', 'Wilma', ['Barney', 'Betty'], ['Bambam', 'Pebbles']];
```

Nesting data structures like we do here is commonplace in JavaScript and programming in general. We'll explore this in much greater depth in a future Lesson.

Create a new array that contains all of the above values, but in an un-nested format:

```js
['Fred', 'Wilma', 'Barney', 'Betty', 'Bambam', 'Pebbles'];
```

### Answer

```js
flintstones = flintstones.flat();
```

## Question 7

Consider the following object:

```js
let flintstones = {
  Fred: 0,
  Wilma: 1,
  Barney: 2,
  Betty: 3,
  Bambam: 4,
  Pebbles: 5,
};
```

Create an array from this object that contains only two elements: Barney's name and Barney's number:

```js
['Barney', 2];
```

### Answer

```js
let barney = Object.entries(flintstones)[2];
```

### Launch

```js
Object.entries(flintstones)
  .filter((pair) => pair[0] === 'Barney')
  .shift();
```

## Question 8

How would you check whether the objects assigned to variables numbers and table below are arrays?

```js
let numbers = [1, 2, 3, 4]; // true
let table = { field1: 1, field2: 2, field3: 3, field4: 4 }; // false
```

### Answer

```js
Array.isArray(numbers);
Array.isArray(table);
```

## Question 9

Back in the stone age (before CSS), we used spaces to align things on the screen. If we have a 40-character wide table of Flintstone family members, how can we center the following title above the table with spaces?

```js
let title = 'Flintstone Family Members';
```

### Answer

```js
let padding = Math.floor((40 - title.length) / 2);

title.padStart(padding + title.length);
// or

let paddedTitle = ' '.repeat(Math.floor(40 - title.length) / 2) + title;
```

## Question 10

Write two one-line expressions to count the number of lower-case `t` characters in each of the following strings:

```js
let statement1 = 'The Flintstones Rock!';
let statement2 = 'Easy come, easy go.';
```

### Answer

```js
statement1.match(/t/g, []).length;
statement2.split('').filter((char) => char === 't').length;
```
