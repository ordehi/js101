## Question 1

Write three different ways to remove all of the elements from the following array:

```js
let numbers = [1, 2, 3, 4];
```

### Solution

```js
numbers.length = 0;

numbers.splice(0);

while (numbers.length) {
  numbers.pop();
}
```

## Question 2

What will the following code output?

```js
console.log([1, 2, 3] + [4, 5]);
```

### Solution

```js
'1,2,34,5
```

Concatenation with + does type coercion, Arrays are converted into Strings before concatenation.

## Question 3

What will the following code output?

```js
let str1 = 'hello there';
let str2 = str1;
str2 = 'goodbye!';
console.log(str1);
```

### Solution

```js
'hello there';
```

Assignment by primitive is pass by value, when assigning `str1` to `str2` we're passing a copy of the value in `str2` rather than a pointer to the memory address where `str1` is stored.

## Question 4

What will the following code output?

```js
let arr1 = [{ first: 'value1' }, { second: 'value2' }, 3, 4, 5];
let arr2 = arr1.slice();
arr2[0].first = 42;
console.log(arr1);
```

### Solution

```js
[{ first: 42 }, { second: 'value2' }, 3, 4, 5];
```

`slice()` does a shallow copy of an array, while the primitives can be copied by value this way, objects are passed by reference, the objects in new array still point to the same address in memory as the objects on the first, so when they're modified on the first, they show up modified on the second.

## Question 5

The following function unnecessarily uses two return statements to return boolean values. Can you rewrite this function so it only has one return statement and does not explicitly use either true or false?

```js
function isColorValid(color) {
  if (color === 'blue' || color === 'green') {
    return true;
  } else {
    return false;
  }
}
```

Try to come up with at least two different solutions.

### Solution

```js
function isColorValid(color) {
  return color === 'blue' || color === 'green';
}

const isColorValid = color => color === 'blue' || color === 'green'
}

const isColorValid = color => ['blue', 'green'].includes(color);
```
