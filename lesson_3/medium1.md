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
