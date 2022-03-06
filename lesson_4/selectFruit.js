/* 
START

# Given a collection of key-value pairs called produce

SET a variable "result" and initialize it to an empty collection

SET a variable "item" and initialize it to the first property name of "produce"

WHILE there are unread properties in "produce"

- if the value of property "item" in "produce" equals 'Fruit' add "item": "value" to "result"

RETURN result

END
*/

function isObject(input) {
  return Object.prototype.toString.call(input) === '[object Object]';
}

function selectFruit(object) {
  let result = {};

  if (isObject(object)) {
    for (let item in object) {
      if (produce[item].toLowerCase() === 'fruit') result[item] = produce[item];
    }
  }

  return result;
}
