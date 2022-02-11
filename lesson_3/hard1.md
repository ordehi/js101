## Question 1

Will the following functions return the same results?

```js
function first() {
  return {
    prop1: 'hi there',
  };
}

function second() {
  return;
  {
    prop1: 'hi there';
  }
}

console.log(first());
console.log(second());
```

Try to answer without running the code or looking at the solution.

### Solution

They won't return the same, `second()` adds a line break after the return statement, JavaScript sees this as an end of that statement and returns which exists the function, returning `undefined`. This is due to automatic semicolon insertion.

## Question 2

What does the last line in the following code output?

```js
let object = { first: [1] };
let numArray = object['first'];
numArray.push(2);

console.log(numArray); //  => "[1, 2]"
console.log(object);
```

Try to answer without running the code or looking at the solution.

### Solution

We get `{ first: [1, 2] }` because objects and arrays are pass by reference, so the code that pushes into `numArray` is really pushing to the array to which `numArray` and `object.first` both point to.

## Question 3

Given the following similar sets of code, what will each code snippet print?

A)

```js
function messWithVars(one, two, three) {
  one = two;
  two = three;
  three = one;
}

let one = ['one'];
let two = ['two'];
let three = ['three'];

messWithVars(one, two, three);

console.log(`one is: ${one}`);
console.log(`two is: ${two}`);
console.log(`three is: ${three}`);
```

### Solution

```
one is: one
two is: two
three is: three
```

This is because arrays in JavaScript are pass by reference

B)

```js
function messWithVars(one, two, three) {
  one = ['two'];
  two = ['three'];
  three = ['one'];
}

let one = ['one'];
let two = ['two'];
let three = ['three'];

messWithVars(one, two, three);

console.log(`one is: ${one}`);
console.log(`two is: ${two}`);
console.log(`three is: ${three}`);
```

### Solution

```
one is: one
two is: two
three is: three
```

When trying to reassign the arguments passed to the function

C)

```js
function messWithVars(one, two, three) {
  one.splice(0, 1, 'two');
  two.splice(0, 1, 'three');
  three.splice(0, 1, 'one');
}

let one = ['one'];
let two = ['two'];
let three = ['three'];

messWithVars(one, two, three);

console.log(`one is: ${one}`);
console.log(`two is: ${two}`);
console.log(`three is: ${three}`);
```

### Solution

```
one is: two
two is: three
three is: one
```

In this case, splice does mutate the original arrays.

### Explanation from TA at Launch

While it's good to know what is meant by pass by reference or pass by value -- it's a good interview question for people seeking junior development positions -- I often find it more confusing than helpful. Instead, I find it more convenient and useful to focus on whether or not mutation occurs by looking for three things:

calling functions that are known to mutate their callers or arguments (like push)
assignment of a new value to a property of an object (obj.foo = 42)
assignment to a specific element of an array (arr[1] = 42)
All 3 of these things are mutating operations. So, what isn't a mutating operation? There are two major things:

calling functions that don't mutate their callers or arguments (like concat)
using simple assignment to a variable (foo = 42)
You usually need to read documentation to determine whether a function mutates stuff. There's no way to be sure by just looking at the function invocation unless you can also look at the source for the function.

Assignment is easy, though. If the left hand side is just a variable name, it's non-mutating. If the left hand size includes a property name or an indexing, it's mutating.

The arithmetic assignment operators like += and \*= and the unary ++ and -- operators are like assignment. If applied to a simple variable, it's non-mutating. Otherwise, it's mutating.

## Question 4

Ben was tasked to write a simple JavaScript function to determine whether an input string is an IP address using 4 dot-separated numbers, e.g., `10.4.5.11`. He is not familiar with regular expressions.

Alyssa supplied Ben with a function named `isAnIpNumber`. It determines whether a string is a numeric string between `0` and `255` as required for IP numbers and asked Ben to use it. Here's the code that Ben wrote:

```js
function isDotSeparatedIpAddress(inputString) {
  let dotSeparatedWords = inputString.split('.');
  while (dotSeparatedWords.length > 0) {
    let word = dotSeparatedWords.pop();
    if (!isAnIpNumber(word)) {
      break;
    }
  }

  return true;
}
```

Alyssa reviewed Ben's code and said, "It's a good start, but you missed a few things. You're not returning a false condition, and you're not handling the case when the input string has more or less than 4 components, e.g., `4.5.5` or `1.2.3.4.5`: both those values should be invalid."

Help Ben fix his code.

### Solution

```js
function isIPAddress(inputString) {
  return /^([01]?[0-9][0-9]?|2[0-4][0-9]|25[0-5])\.([01]?[0-9][0-9]?|2[0-4][0-9]|25[0-5])\.([01]?[0-9][0-9]?|2[0-4][0-9]|25[0-5])\.([01]?[0-9][0-9]?|2[0-4][0-9]|25[0-5])$/.test(
    inputString
  );
}
```
