## Question 1

Let's do some "ASCII Art": a stone-age form of nerd artwork from back in the days before computers had video screens.

For this practice problem, write a program that outputs The Flintstones Rock! 10 times, with each line indented 1 space to the right of the line above it. The output should start out like this:

```
The Flintstones Rock!
 The Flintstones Rock!
  The Flintstones Rock!
   ...
```

### Solution

```js
// For the heck of it solution
let phrase = 'The Flintstones Rock!';
let size = Array(9).fill(' ');
while (size.length) {
  console.log(phrase);
  phrase = size.pop() + phrase;
}

// Idiomatic solution
let count = 1;
while (count <= 10) {
  console.log(phrase);
  phrase = ' ' + phrase;
  count += 1;
}
```

## Question 2

Starting with the string:

```js
let munstersDescription = 'The Munsters are creepy and spooky.';
```

Return a new string that swaps the case of all of the letters:

```js
`tHE mUNSTERS ARE CREEPY AND SPOOKY.`;
```

### Solution

```js
let phrase = 'The Munsters are creepy and spooky.';
let switched = '';
for (let char of phrase) {
  if (char === char.toLowerCase()) {
    switched += char.toUpperCase();
  } else {
    switched += char.toLowerCase();
  }
}
```

## Question 3

Alan wrote the following function, which
was intended to return all of the factors
of `number`:

```js
function factors(number) {
  let divisor = number;
  let factors = [];
  do {
    if (number % divisor === 0) {
      factors.push(number / divisor);
    }
    divisor -= 1;
  } while (divisor !== 0);
  return factors;
}
```

Alyssa noticed that this code would fail
when the input is `0` or a negative
number, and asked Alan to change the loop.
How can he make this work without using a
`do/while` loop? Note that we're not
looking to find the factors for `0` or
negative numbers, but we want to handle it
gracefully instead of raising an exception
or going into an infinite loop.

_Bonus:_ What is the purpose of `number % divisor === 0` in that code?

### Solution

```js
function factors(number) {
  if (number <= 0) return 0;

  let divisor = number;
  let factors = [];

  while (divisor) {
    if (number % divisor === 0) {
      factors.push(number / divisor);
    }
    divisor -= 1;
  }
  return factors;
}
```

### Bonus solution

The purpose of `number % divisor === 0` is to check whether dividing number by divisor has a remainder of 0, which means divisor is a factor of number as it divides perfectly into it.

## Question 4

Alyssa was asked to write an implementation of a rolling buffer. You can add and remove elements from a rolling buffer. However, once the buffer becomes full, any new elements will displace the oldest elements in the buffer.

She wrote two implementations of the code for adding elements to the buffer. In presenting the code to her team leader, she said "Take your pick. Do you prefer push() or concat() for modifying the buffer?".

Is there a difference between these implementations, other than the method she used to add an element to the buffer?

```js
function addToRollingBuffer1(buffer, maxBufferSize, newElement) {
  buffer.push(newElement);
  if (buffer.length > maxBufferSize) {
    buffer.shift();
  }
  return buffer;
}

function addToRollingBuffer2(buffer, maxBufferSize, newElement) {
  buffer = buffer.concat(newElement);
  if (buffer.length > maxBufferSize) {
    buffer.shift();
  }
  return buffer;
}
```

### Solution

The implementation that uses `concat()` creates a new array and reassigns the original each time a new element is added, while the implementation using `push()` works with the original array (mutates it), one element at a time.

`concat()` does a shallow copy of an array, so any reference to objects remain the same (as pointers).

[Array.prototype.push()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)

The `push()` method adds one or more elements to the end of an array and returns the new length of the array.

```js
push(element0);
push(element0, element1);
push(element0, element1, /* ... ,*/ elementN);
```

[Array.prototype.concat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)

The `concat()` method is used to merge two or more arrays. This method does not change the existing arrays, but instead returns a new array.

```js
concat()
concat(value0)
concat(value0, value1)
concat(value0, value1, ... , valueN)
```

#### Notes

- There is a crucial difference in what these do and what they return, `push()` modifies the array in place and returns its new length, `concat()` returns a new array, doesn't modify the original.
- It's often preferable not to mutate arrays, but some situations merit it.
- Both methods can take multiple arguments
- `push()` arguments must be single values, or spread arrays
- `concat()` can take entire arrays or single values

## Question 5

What will the following two lines of code output?

```js
console.log(0.3 + 0.6);
console.log(0.3 + 0.6 === 0.9);
```

Don't look at the solution before you answer.

### Solution

Line 1: 0.899999...
Line 2: false

The reason is that JS uses double precision floating point numbers (following the IEEE 754 standard). Numbers are stored in 64 bits, where the number, the fraction (AKA mantissa), is stored in bits 0 to 51, the exponent in bits 52 to 62, and the sign in bit 63.

This means that there is finite space to store repeating decimals in fractions, so since some fraction infinitely repeat as you divide them further, the precision of decimals deteriorates.

## Question 6

What do you think the following code will output?

```js
let nanArray = [NaN];

console.log(nanArray[0] === NaN);
```

**Bonus:**
How can you reliably test if a value is NaN?

### Solution

It will output false, because `NaN` is the only value in JS that isn't equal to itself as it represents the result of a nonsensical math operation which isn't equal to any other nonsensical operation. Considering that, there are two ways to test for `NaN`, we can use `Number.isNaN(value)` or compare `value !== value` since `NaN` is the only value not equal to itself, a comparison of a value not being equal to itself that returns true means that value is `NaN` (`NaN !== NaN`)

## Question 7

What is the output of the following code?

```JS
let answer = 42;

function messWithIt(someNumber) {
  return (someNumber += 8);
}

let newAnswer = messWithIt(answer);

console.log(answer - 8);
```

### Solution

Output will be 34 because numbers are immutable in JS, so they're pass by value and not by reference. `someNumber` inside `messWithIt()` is a copy of the value in `answer` and not a reference to the pointer `answer`.

## Question 8

One day, Spot was playing with the Munster family's home computer, and he wrote a small program to mess with their demographic data:

```js
let munsters = {
  Herman: { age: 32, gender: 'male' },
  Lily: { age: 30, gender: 'female' },
  Grandpa: { age: 402, gender: 'male' },
  Eddie: { age: 10, gender: 'male' },
  Marilyn: { age: 23, gender: 'female' },
};

function messWithDemographics(demoObject) {
  Object.values(demoObject).forEach((familyMember) => {
    familyMember['age'] += 42;
    familyMember['gender'] = 'other';
  });
}
```

After writing this function, he typed the following code:

```js
messWithDemographics(munsters);
```

Before Grandpa could stop him, Spot hit the Enter key with his tail. Did the family's data get ransacked? Why or why not?

### Solution

The data does get ransacked (mutated), because object in JS are pass by reference, so the operations in `messWithDemographics()` mutate the values of the referenced object.

## Question 9

Function and method calls can take expressions as arguments. Suppose we define a function named rps as follows, which follows the classic rules of the rock-paper-scissors game, but with a slight twist: in the event of a tie, it just returns the choice made by both players.

```js
function rps(fist1, fist2) {
  if (fist1 === 'rock') {
    return fist2 === 'paper' ? 'paper' : 'rock';
  } else if (fist1 === 'paper') {
    return fist2 === 'scissors' ? 'scissors' : 'paper';
  } else {
    return fist2 === 'rock' ? 'rock' : 'scissors';
  }
}
```

What does the following code output?

```js
console.log(rps(rps(rps('rock', 'paper'), rps('rock', 'scissors')), 'rock'));
```

### Solution

It outputs paper given the order or parenthesized operations.

## Question 10

Consider these two simple functions:

```js
function foo(param = 'no') {
  return 'yes';
}

function bar(param = 'no') {
  return param === 'no' ? 'yes' : 'no';
}
```

What will the following function invocation return?

```js
bar(foo());
```

### Solution

It will output `no` since `foo()` always returns `yes` so when passed to `bar()` it will cause the ternary to return the third argument, the one for the comparison being `false`.
