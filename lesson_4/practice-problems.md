# Practice Problems

## Practice Problem 1

What is the return value of the `filter` method call below? Why?

```js
[1, 2, 3].filter((num) => 'hi');
```

### Solution

```js
// returns [1, 2, 3]
```

The reason is that `filter` uses the return value of the callback function passed to it to determine if the current element will go through, it goes through any time its callback return value is truthy. In this case, 'hi' is always truthy, so each element is included in the final returned array.

## Practice Problem 2

What is the return value of `map` in the following code? Why?

```js
[1, 2, 3].map((num) => {
  num * num;
});
```

### Solution

```js
[undefined, undefined, undefined];
```

map returns an array that is the same size as the array it was called upon with each element transformed to the return value of the callback function. In this case, the callback isn't returning anything explicitly from within its block, so it always returns `undefined`

## Practice Problem 3

The following code differs slightly from the above code. What is the return value of `map` in this case? Why?

```js
[1, 2, 3].map((num) => num * num);
```

### Solution

```js
[1, 4, 9];
```

In this case, the arrow function is formatted to implicitly return the value of the operation after the arrow (implicit return from arrow functions with a single expression). Here, the value of the operation `num * num` is returned for each element in the array, so each element appears squared in the new array.

## Practice Problem 4

What is the return value of the following statement? Why?

```js
['ant', 'bear', 'caterpillar'].pop().length;
```

### Solution

Returns 11, because it is returning the length of 'caterpillar' which is the last element in the array that gets returned by `pop` and has its length property read.

## Practice Problem 5

What is the callback's return value in the following code? Also, what is the return value of `every` in this code?

```js
[1, 2, 3].every((num) => {
  return (num = num * 2);
});
```

### Solution

The callback returns the value of the current element in the array multiplied by 2, it doubles the number, so `2`, `4`, `6` at each iteration. The call to `every` returns `true` here because it considers the return value of each iteration of the callback, if each return value is truthy, the whole call will be `true`

## Practice Problem 6

How does `Array.prototype.fill` work? Is it destructive? How can we find out?

```js
let arr = [1, 2, 3, 4, 5];
arr.fill(1, 1, 5);
```

### Solution

It fills an array with a given value from a start to an end index, start being 0 by default, end being the array's length property by default. It modifies the array in place, so it is destructive.

The best ways to find out if a method is destructive is by reading the docs and trying it out on the console a few times until you understand how it works.

## Practice Problem 7

What is the return value of `map` in the following code? Why?

```js
['ant', 'bear'].map((elem) => {
  if (elem.length > 3) {
    return elem;
  }
});
```

### Solution

```js
[undefined, 'bear'];
```

The callback only explicitly returns if the length of the current element in the array is greater than 3, which only happens with 'bear', otherwise, it returns `undefined` implicitly.

## Practice Problem 8

Take a look at the following array.

```js
let flintstones = ['Fred', 'Barney', 'Wilma', 'Betty', 'Pebbles', 'Bambam'];
```

Write a program that uses this array to create an object where the names are the keys and the values are the positions in the array:

```js
{ Fred: 0, Barney: 1, Wilma: 2, Betty: 3, Pebbles: 4, Bambam: 5 }
```

### Solution

```js
function swapIndicesWithValues(array) {
  let arrayOfKeyValues = Object.entries(array);
  let result = {};

  arrayOfKeyValues.forEach((keyValue) => {
    let [index, name] = keyValue;
    result[name] = index;
  });

  return result;
}
```

### Launch's Solution

```js
let flintstonesObj = {};

flintstones.forEach((name, index) => {
  flintstonesObj[name] = index;
});

flintstonesObj; // { Fred: 0, Barney: 1, Wilma: 2, Betty: 3, Pebbles: 4, Bambam: 5 }
```

## Practice Problem 9

Add up all of the ages from the Munster family object:

```js
let ages = {
  Herman: 32,
  Lily: 30,
  Grandpa: 5843,
  Eddie: 10,
  Marilyn: 22,
  Spot: 237,
};
```

### Solution

```js
Object.values(ages).reduce((total, current) => total + current);
```

## Practice Problem 10

Pick out the minimum age from our current Munster family object:

```js
let ages = {
  Herman: 32,
  Lily: 30,
  Grandpa: 5843,
  Eddie: 10,
  Marilyn: 22,
  Spot: 237,
};
```

### Solution

```js
Math.min(...Object.values(ages));
```

## Practice Problem 11

Create an object that expresses the frequency with which each letter occurs in this string:

```js
let statement = 'The Flintstones Rock';
```

The output will look something like the following:

```js
{ T: 1, h: 1, e: 2, F: 1, l: 1, ... }
```

### Solution

```js
let charFrequency = {};
statement.split('').forEach((character) => {
  if (character != ' ') {
    charFrequency.hasOwnProperty(character)
      ? (charFrequency[character] += 1)
      : (charFrequency[character] = 1);
  }
});
```
