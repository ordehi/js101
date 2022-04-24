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
}
