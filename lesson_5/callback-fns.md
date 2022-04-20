# Working with Callback Functions

## The Concept of first-class values/objects

In most programming languages, the term first-class value or first-class object is used to describe values that meet the following conditions:

- They can be assigned to a variable or an element of a data structure (such as an array or object)
- They can be passed as an argument to a function
- They can be returned as the return value of a function

<aside>
💡 In JavaScript, functions meet this criteria. That is why it is said that JS functions are first-class citizens, or first-class functions.
</aside>

## Higher Order Functions

Functions that take other functions as arguments are called Higher Order Functions.

Let's take a look at some examples of methods that take callbacks and analyze each component in depth:

### Example 1

Take a moment to digest this example:

```js
[
  [1, 2],
  [3, 4],
].forEach((arr) => console.log(arr[0]));
// 1
// 3
// => undefined
```

What's happening in this seemingly-simple piece of code? Take it apart and try to describe every interaction with precision.

#### Solution

`Array.prototype.forEach` is being called on a multidimensional array containing two sub-arrays, each sub-array contains two positive integers. At each iteration, we assign the value of the current array to the parameter `arr` and using the callback `arr => console.log(arr[0])` we get the value at index 0 (the first element, `arr[0]`) of the current array using the reference operator `[]`, disregarding any subsequent elements from that array. This prints `1`, `3`, and then returns `undefined` as expected from any call to `forEach`.

### Example 2

```js
[
  [1, 2],
  [3, 4],
].map((arr) => console.log(arr[0]));
// 1
// 3
// => [undefined, undefined]
```

### Solution

| Action                      | Performed on                          | Side Effect                               | Return Value                         | Is Return Value Used?                    |
| --------------------------- | ------------------------------------- | ----------------------------------------- | ------------------------------------ | ---------------------------------------- |
| method call (`map`)         | outer array                           | None                                      | New array (`[undefined, undefined]`) | No, but shown on line 4                  |
| callback execution          | Each sub-array                        | None                                      | `undefined`                          | Yes, used by `map` for transformation    |
| element reference (`[0]`)   | Each sub-array                        | None                                      | Element at index 0 of sub-array      | Yes, used by `console.log`               |
| method call (`console.log`) | Element at index `0` of the sub-array | Outputs string representation of a Number | `undefined`                          | Yes, used as the callback's return value |

Starting with a multidimensional array which contains two arrays that each contain two integers, we pass the top-level array to `Array.prototype.map`. At each iteration, we're passing each array to the callbackFn to `map` with the argument name `arr` and returning the result of calling `console.log` on the first element in the current array which we get with `arr[0]`. This prints the first element of `arr` to the console, but the return value of `console.log` is always `undefined` and since that's what we're getting returned from the callback to `map` we're building a new array which contains two `undefined` values. It contains two and not four because we're only going through the first value of each sub-array, the array being mapped is the top-level array and not the nested ones.

### Example 3

```js
[
  [1, 2],
  [3, 4],
].map((arr) => {
  console.log(arr[0]);
  return arr[0];
});
```

### Solution

| Action                      | Performed on                          | Side Effect                               | Return Value                    | Is Return Value Used?                                  |
| --------------------------- | ------------------------------------- | ----------------------------------------- | ------------------------------- | ------------------------------------------------------ |
| method call (`map`)         | outer array                           | None                                      | New array (`[1, 3]`)            | No, but shown on line 5                                |
| callback execution          | Each sub-array                        | None                                      | Element at index 0 of sub-array | Yes, used by `map` for transformation                  |
| element access (`[0]`)      | Each sub-array                        | None                                      | Element at index 0 of sub-array | Yes, used by `console.log`                             |
| method call (`console.log`) | Element at index `0` of the sub-array | Outputs string representation of a Number | `undefined`                     | No                                                     |
| element access (`[0]`)      | Each sub-array                        | None                                      | Element at index 0 of sub-array | Yes, used as the return value of the callback function |

### Example 4

```js
let myArr = [
  [18, 7],
  [3, 12],
].forEach((arr) => {
  return arr.map((num) => {
    if (num > 5) {
      return console.log(num);
    }
  });
});
```

### Solution

| Action                              | Performed on                                                       | Side Effect                               | Return Value             | Is Return Value Used?                                |
| ----------------------------------- | ------------------------------------------------------------------ | ----------------------------------------- | ------------------------ | ---------------------------------------------------- |
| variable declaration and assignment | nothing                                                            | None                                      | `undefined`              | No                                                   |
| method call (`forEach`)             | outer array                                                        | None                                      | `undefined`              | Yes, assigned to myArr                               |
| `forEach` callback execution        | Each sub-array                                                     | None                                      | `[undefined, undefined]` | No                                                   |
| method call (`map`)                 | Each value of each sub-array                                       | None                                      | `[undefined, undefined]` | Yes, returned by `forEach` callback                  |
| `map` callback execution            | Each value of each sub-array                                       | None                                      | `undefined`              | Yes, used to transform the array                     |
| comparison (`num > 5`)              | Each value of each sub-array                                       | None                                      | `true` or `false`        | Yes, evaluated by conditional `if`                   |
| method call (`console.log`)         | Element of sub-array that passes the conditional check (`num > 5`) | Outputs string representation of a Number | `undefined`              | Yes, to determine the return value of `map` callback |

### Example 5

```js
[
  [1, 2],
  [3, 4],
].map((arr) => {
  return arr.map((num) => num * 2);
});
```

What will the return value be in this example? Use what you've learned so far to break it down on your own before checking the solution below.

### Solution

| Action                     | Performed on                              | Side Effect | Return Value                                     | Is Return Value Used?                       |
| -------------------------- | ----------------------------------------- | ----------- | ------------------------------------------------ | ------------------------------------------- |
| method call (`map`)        | outer array                               | None        | `[[2, 4], [6, 8]]`                               | No, but shown on line 4                     |
| outer callback execution   | Each sub-array                            | None        | `[2, 4], [6, 8]`                                 | Yes, used by outer `map` for transformation |
| method call (`map`)        | Each sub-array                            | None        | `[2, 4], [6, 8]`                                 | Yes, returned by outer callback             |
| inner callback execution   | Element of sub-array at current iteration | None        | A Number that is current element multiplied by 2 | Yes, used by inner `map` for transformation |
| multiplication (`num * 2`) | Element of sub-array at current iteration | None        | A Number that is current element multiplied by 2 | Yes, returned by inner callback             |

### Example 6

```js
[
  { a: 'ant', b: 'elephant' },
  { c: 'cat', d: 'dog' },
].filter((object) => {
  return Object.keys(object).every((key) => object[key][0] === key);
});

// => [ { c: 'cat', d: 'dog' } ]
```

### Solution

The `filter` method is called on an array of two object literals. Each object is passed to the callback for `filter`. At each iteration, `Object.keys` is used to get the keys of the current object as an array of strings that each represent a key name. A method call to `every` takes into its callback each key of the current object and returns a boolean that is the result of evaluating if the current key is strictly equal as the first letter in the value that the key stores, the value is accessed with `object[key]` and the first character with `[0]`. If the boolean comparison returns `true` for all key-value pairs of the current object, the method call to `every` returns `true` which is then returned by the callback to `filter` and that object is included in the transformed array.

| Action                                 | Performed on                                        | Side Effect | Return Value                                                                                       | Is Return Value Used?                              |
| -------------------------------------- | --------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| method call (`filter`)                 | Array of objects                                    | None        | A new array containing the objects where all keys match the first character of their stored values | No, but shown on line 4                            |
| outer callback execution               | Each child object of the outer array                | None        | A Boolean                                                                                          | Yes, used by `filter` for transformation           |
| method call (`Object.keys`)            | Each child object of the outer array                | None        | An array containing the keys of the object at current iteration                                    | Yes, used by `every`                               |
| method call (`every`)                  | The array of keys of the current object             | None        | A Boolean                                                                                          | Yes, returned by outer callback                    |
| inner callback execution               | Each element of the array returned by `Object.keys` | None        | A Boolean                                                                                          | Yes, used by `every` to determine its return value |
| object property access `object[key]`   | object at current iteration                         | None        | The value of the property at `object[key]`                                                         | Yes, used to extract first character               |
| string character access by index `[0]` | Value of the property at `object[key]`              | None        | The first character of the value at `object[key]`                                                  | Yes, used in equality comparison                   |
| strict equality comparison `===`       | first character of value at `object[key]` and `key` | None        | Boolean                                                                                            | Yes, returned by inner callback                    |

### Example 7

```js
[
  [8, 13, 27],
  ['apple', 'banana', 'cantaloupe'],
].map((arr) => {
  return arr.filter((item) => {
    if (typeof item === 'number') {
      // if it's a number
      return item > 13;
    } else {
      return item.length < 6;
    }
  });
});
// => [ [ 27 ], [ 'apple' ] ]
```

### Solution

| Action                               | Performed on                                      | Side Effect | Return Value                                               | Is Return Value Used?                      |
| ------------------------------------ | ------------------------------------------------- | ----------- | ---------------------------------------------------------- | ------------------------------------------ |
| method call (`map`)                  | Outer array                                       | None        | A new array                                                | No, but shown on line 10                   |
| outer callback execution             | Each sub-array                                    | None        | An array of elements extracted from the current array      | Yes, used by `map` for transformation      |
| method call (`filter`)               | Sub-array at current iteration                    | None        | An array that passes the check in `filter`                 | Yes, used by `map` for transformation      |
| inner callback execution             | Element at current iteration of `filter` = `item` | None        | A Boolean                                                  | Yes, used by `filter` for transformation   |
| operator applied `typeof`            | `item`                                            | None        | A String representation of the type of the current element | Yes, used for strict equality comparison   |
| strict equality comparison `===`     | `item`                                            | None        | A Boolean                                                  | Yes, used by `if`                          |
| comparison `> 13`                    | `item`                                            | None        | A Boolean                                                  | Yes, returned explicitly by inner callback |
| String property access `item.length` | `item`                                            | None        | A Number representing the length of the String `item`      | Yes, used in comparison                    |
| comparison `< 6`                     | `item.length`                                     | None        | Boolean                                                    | Yes, returned explicitly by inner callback |

### Example 8

```js
[
  [[1], [2], [3], [4]],
  [['a'], ['b'], ['c']],
].map((element1) => {
  return element1.forEach((element2) => {
    return element2.filter((element3) => {
      return element3.length > 0;
    });
  });
});

// => [ undefined, undefined ]
```

### Solution

| Action                                   | Performed on                                                      | Side Effect | Return Value                                                                                       | Is Return Value Used?                         |
| ---------------------------------------- | ----------------------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| method call `map`                        | Outer array                                                       | None        | A new array                                                                                        | No, but shown on line 9                       |
| `map` callback execution                 | Each sub-array of the outer array, one level down                 | None        | `undefined`                                                                                        | Yes, used by `map` for transformation         |
| method call (`forEach`)                  | Array at current iteration of `map` = `element1`                  | None        | `undefined`                                                                                        | Yes, returned by `map` callback               |
| `forEach` callback execution             | Sub-array of the array at current iteration of `map` = `element2` | None        | An array                                                                                           | No                                            |
| method call `filter`                     | `element2`                                                        | None        | An array                                                                                           | No                                            |
| `filter` callback execution              | Element of the `element2` array = `element3`                      | None        | A Boolean                                                                                          | Yes, used by `filter` for transformation      |
| String property access `element3.length` | `element3`                                                        | None        | A Number the length of the String `element3` or `undefined` if `element3` is not a String or Array | Yes, used in comparison                       |
| comparison `> 0`                         | `element3.length`                                                 | None        | Boolean                                                                                            | Yes, returned explicitly by `filter` callback |

### Example 9

```js
[
  [
    [1, 2],
    [3, 4],
  ],
  [5, 6],
].map((arr) => {
  return arr.map((elem) => {
    if (typeof elem === 'number') {
      // it's a number
      return elem + 1;
    } else {
      // it's an array
      return elem.map((number) => number + 1);
    }
  });
});
```
