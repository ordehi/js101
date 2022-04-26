/*
 How would you order the following array of number strings by descending numeric value (largest number value to smallest)? 
*/

function problem1() {
  let arr = ['10', '11', '9', '7', '8'];

  return arr.sort((a, b) => Number(b) - Number(a));
}

/* 
How would you order the following array of objects based on the year of publication of each book, from the earliest to the latest?
*/

function problem2() {
  let books = [
    {
      title: 'One Hundred Years of Solitude',
      author: 'Gabriel Garcia Marquez',
      published: '1967',
    },
    {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      published: '1925',
    },
    { title: 'War and Peace', author: 'Leo Tolstoy', published: '1869' },
    { title: 'Ulysses', author: 'James Joyce', published: '1922' },
    {
      title: 'The Book of Kells',
      author: 'Multiple Authors',
      published: '800',
    },
  ];

  return books.sort((a, b) => Number(a.published) - Number(b.published));
}

/* 
For each of these collection objects, demonstrate how you would access the letter g.
*/

function problem3() {
  let arr1 = ['a', 'b', ['c', ['d', 'e', 'f', 'g']]];
  console.log(arr1[2][1][3]);

  let arr2 = [
    { first: ['a', 'b', 'c'], second: ['d', 'e', 'f'] },
    { third: ['g', 'h', 'i'] },
  ];
  console.log(arr2[1].third[0]);

  let arr3 = [['abc'], ['def'], { third: ['ghi'] }];
  console.log(arr3[2].third[0][0]);

  let obj1 = { a: ['d', 'e'], b: ['f', 'g'], c: ['h', 'i'] };
  console.log(obj1.b[1]);

  let obj2 = { first: { d: 3 }, second: { e: 2, f: 1 }, third: { g: 0 } };
  console.log(Object.keys(obj2.third)[0]);
}

/* 
For each of these collection objects, demonstrate how you would change the value 3 to 4.
*/

function problem4() {
  let arr1 = [1, [2, 3], 4];
  arr1[1][1] = 4;
  console.log(arr1);

  let arr2 = [{ a: 1 }, { b: 2, c: [7, 6, 5], d: 4 }, 3];
  arr2[2] = 4;
  console.log(arr2);

  let obj1 = { first: [1, 2, [3]] };
  obj1['first'][2][0] = 4;
  console.log(obj1);

  let obj2 = { a: { a: ['1', 'two', 3], b: 4 }, b: 5 };
  obj2['a']['a'][2] = 4;
  console.log(obj2);
}

/* 
Compute and display the total age of the male members of the family.
*/

function problem5() {
  let munsters = {
    Herman: { age: 32, gender: 'male' },
    Lily: { age: 30, gender: 'female' },
    Grandpa: { age: 402, gender: 'male' },
    Eddie: { age: 10, gender: 'male' },
    Marilyn: { age: 23, gender: 'female' },
  };

  let result = 0;

  for (const name in munsters) {
    if (munsters[name]['gender'] === 'male') result += munsters[name]['age'];
  }

  return result;
}

/* 
One of the most frequently used real-world string operations is that of "string substitution," where we take a hard-coded string and modify it with various parameters from our program.

Given this previously seen family object, print the name, age, and gender of each family member. Each output line should follow this pattern:

(Name) is a (age)-year-old (male or female).
*/

function capitalize(string) {
  return string[0].toUpperCase() + string.substring(1);
}

function problem6() {
  let munsters = {
    herman: { age: 32, gender: 'male' },
    lily: { age: 30, gender: 'female' },
    grandpa: { age: 402, gender: 'male' },
    eddie: { age: 10, gender: 'male' },
    marilyn: { age: 23, gender: 'female' },
  };

  for (const member in munsters) {
    console.log(
      `${capitalize(member)} is a ${munsters[member]['age']}-year-old ${
        munsters[member]['gender']
      }`
    );
  }
}

/* 
Given the following code, what will the final values of a and b be? Try to answer without running the code.
*/

let a = 2;
let b = [5, 8];
let arr = [a, b];

arr[0] += 2;
arr[1][0] -= a;

// a = 2, b = [3, 8]

/* 
Using the forEach method, write some code to output all vowels from the strings in the arrays. Don't use a for or while loop.
*/

function problem8() {
  let obj = {
    first: ['the', 'quick'],
    second: ['brown', 'fox'],
    third: ['jumped'],
    fourth: ['over', 'the', 'lazy', 'dog'],
  };

  let values = Object.values(obj).flat();
  values.forEach((val) => {
    console.log(val.replace(/[^aeiou]/g, ''));
  });

  let vowels = Object.values(obj)
    .flat()
    .join()
    .replace(/[^aeiou]/g, '');
  console.log(...vowels.split(''));
}

/* 
Given the following data structure, return a new array with the same structure, but with the values in each subarray ordered -- alphabetically or numerically as appropriate -- in ascending order.
*/

function problem9() {
  let arr = [
    ['b', 'c', 'a'],
    [2, 11, -3],
    ['blue', 'black', 'green'],
  ];

  return arr.map((el) =>
    el.slice().sort((a, b) => {
      if (typeof a === 'string') {
        // we can also just do sort() without arguments to sort strings
        return a.localeCompare(b);
      } else {
        return a - b;
      }
    })
  );
}

/* 
Perform the same transformation of sorting the subarrays we did in the previous exercise with one difference; sort the elements in descending order.
*/

function problem10() {
  let arr = [
    ['b', 'c', 'a'],
    [2, 11, -3],
    ['blue', 'black', 'green'],
  ];

  return arr.map((el) =>
    el.slice().sort((a, b) => {
      if (typeof a === 'string') {
        return b.localeCompare(a);
      } else {
        return b - a;
      }
    })
  );
}

/* 
Given the following data structure, use the map method to return a new array identical in structure to the original but, with each number incremented by 1. Do not modify the original data structure.
*/

function problem11() {
  let arr = [{ a: 1 }, { b: 2, c: 3 }, { d: 4, e: 5, f: 6 }];

  return arr.map((subObj) => {
    let copyObj = {};

    for (const key in subObj) {
      copyObj[key] = subObj[key] + 1;
    }

    return copyObj;
  });
}

/* 
Given the following data structure, use a combination of methods, including filter, to return a new array identical in structure to the original, but containing only the numbers that are multiples of 3.
 */

function isMultOf3(num) {
  return num % 3 === 0;
}

function problem12() {
  let arr = [[2], [3, 5, 7], [9], [11, 15, 18]];

  return arr.map((subArr) => subArr.filter((num) => isMultOf3(num)));
}

/* 
Given the following data structure, sort the array so that the sub-arrays are ordered based on the sum of the odd numbers that they contain.
*/

function sumOdds(arr) {
  return arr.reduce((acc, curr) => (curr % 2 === 1 ? acc + curr : acc));
}

function problem13() {
  let arr = [
    [1, 6, 7],
    [1, 5, 3],
    [1, 8, 3],
  ];

  return arr.sort((a, b) => sumOdds(a) - sumOdds(b));
}

/* 
Given the following data structure write some code to return an array containing the colors of the fruits and the sizes of the vegetables. The sizes should be uppercase, and the colors should be capitalized.
*/

function problem14() {
  let obj = {
    grape: { type: 'fruit', colors: ['red', 'green'], size: 'small' },
    carrot: { type: 'vegetable', colors: ['orange'], size: 'medium' },
    apple: { type: 'fruit', colors: ['red', 'green'], size: 'medium' },
    apricot: { type: 'fruit', colors: ['orange'], size: 'medium' },
    marrow: { type: 'vegetable', colors: ['green'], size: 'large' },
  };

  let arr = [];
  for (const product in obj) {
    if (obj[product].type === 'fruit') {
      arr.push(obj[product].colors.map((el) => capitalize(el)));
    } else if (obj[product].type === 'vegetable') {
      arr.push(obj[product].size.toUpperCase());
    }
  }

  return arr;

  // launch's solution
  Object.values(obj).map((attributes) => {
    if (attributes['type'] === 'fruit') {
      return attributes['colors'].map((char) => capitalize(char));
    } else {
      return attributes['size'].toUpperCase();
    }
  });
}

/* 
Given the following data structure, write some code to return an array which contains only the objects where all the numbers are even.
 */

function problem15() {
  let arr = [
    { a: [1, 2, 3] },
    { b: [2, 4, 6], c: [3, 6], d: [4] },
    { e: [8], f: [6, 10] },
  ];

  return arr.filter((subObj) =>
    Object.values(subObj)
      .flat()
      .every((val) => val % 2 === 0)
  );
}

/* 
Given the following data structure, write some code that defines an object where the key is the first item in each subarray, and the value is the second.
*/

function problem16() {
  let arr = [
    ['a', 1],
    ['b', 'two'],
    ['sea', { c: 3 }],
    ['D', ['a', 'b', 'c']],
  ];

  // expected value of object
  // { a: 1, b: 'two', sea: { c: 3 }, D: [ 'a', 'b', 'c' ] }
  return Object.fromEntries(arr);
}

/* 
A UUID is a type of identifier often used to uniquely identify items, even when some of those items were created on a different server or by a different application. That is, without any synchronization, two or more computer systems can create new items and label them with a UUID with no significant risk of stepping on each other's toes. It accomplishes this feat through massive randomization. The number of possible UUID values is approximately 3.4 X 10E38, which is a huge number. The chance of a conflict is vanishingly small with such a large number of possible values.

Each UUID consists of 32 hexadecimal characters (the digits 0-9 and the letters a-f) represented as a string. The value is typically broken into 5 sections in an 8-4-4-4-12 pattern, e.g., 'f65c57f6-a6aa-17a8-faa1-a67f2dc9fa91'.

Write a function that takes no arguments and returns a string that contains a UUID.
*/
function genRandomHex(size) {
  return [...Array(size)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join('');
}
function problem17() {
  let UUIDArr = [];
  let hexSizes = [8, 4, 4, 4, 12];
  while (UUIDArr.length < 5) {
    UUIDArr.push(genRandomHex(hexSizes[UUIDArr.length]));
  }

  return UUIDArr.join('-');
}
