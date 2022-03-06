# Selection and Transformation

**Selection** is picking some elements out of a collection depending on one or more criteria. For example, you might want to pick out all the odd numbers from an array.

**Transformation**, on the other hand, refers to manipulating every element in the collection. For example, increment all elements of an array by 1.

If there are *N* elements in a collection, selection results in *N* or fewer elements, while transformation always results in the same number, *N*, of elements.

Both use the basics of looping; a loop, a counter, a way to get the current value, and a way to exit out of the loop. They also use criteria; to determine which element to select, or the transformation to apply.

Conditionals are common in selection since the criteria often requires selecting elements that meet some characteristics, while transformation doesn’t often require conditionals as it applies to the entire collection.

<aside>
💡 When performing a transformation, it's always important to pay attention to whether the original collection is mutated or if a new collection is returned.
</aside>

## Extracting to Functions

Selection and transformation often lend themselves to extraction into convenience functions given the specificity of the actions performed each time.

How would you extract selecting the key-value pairs of a function where the value is `'Fruit'`.

### Attempted Solution

#### Problem Understanding

Given a collection of key-value pairs, return a new collection with the key-value pairs that have the value 'Fruit'.

**Explicit Requirements**

- Select all values equal to 'Fruit'
- Iterate through all key-value pairs of input

**Implicit Requirements**

- Need a conditional check to match against 'Fruit'
- Need an intermediate object to return at the end

**Clarifying Questions**

- Should the match against 'Fruit' be case-sensitive? No
- Should I return a new object? Yes
- What to do with invalid input? Return empty object

#### Examples and Test Cases

```js
let produce = {
  apple: 'Fruit',
  carrot: 'Vegetable',
  pear: 'Fruit',
  broccoli: 'Vegetable',
};

selectFruit(produce); // => { apple: 'Fruit', pear: 'Fruit' }
```

#### Data Structure

- An intermetidate object literal to hold the key-value pairs that match the selection
- A loop iterates through the values of input and adds the matching values to the intermetidate object

**Considering iteration**

We could use `for...in` to iterate object properties.

With `for...in` you use a conditional to check if `object[currentItem]` matches the selection, and add that to result if it does.

```js
for (let item in produce) {
  if (produce[item] == 'Fruit') {
    result[item] = produce[item];
  }
}
```

We could use `Object.entries()` to create an array of sub-arrays that are the key-value pairs of input, and build the output object from that array using something such as `Array.includes()`.

#### Algorithm

START

-# Given a collection of key-value pairs called produce

SET a variable "result" and initialize it to an empty collection

SET a variable "item" and initialize it to the first property name of "produce"

WHILE there are unread properties in "produce"

- if the value of property "item" in "produce" equals 'Fruit' add "item": "value" to "result"

RETURN result

END
