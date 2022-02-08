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
