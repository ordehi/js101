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
