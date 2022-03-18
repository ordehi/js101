function isObject(input) {
  return Object.prototype.toString.call(input) === '[object Object]';
}

function emptyObjectLiteral() {
  return {};
}

function lowerCase(string) {
  return string.toLowerCase();
}

// function selectFruit(produceList) {
//   let result = {};

//   if (isObject(produceList)) {
//     for (let currentItem in produceList) {
//       if (produceList[currentItem].toLowerCase() === 'fruit')
//         result[currentItem] = produceList[currentItem];
//     }
//   }

//   return result;
// }

function selectProduceByType(produceList, typeToSelect) {
  if (isObject(produceList) === false) return emptyObjectLiteral();
  const selectedItems = emptyObjectLiteral();

  for (const currentItem in produceList) {
    if (lowerCase(produceList[currentItem]) === lowerCase(typeToSelect)) {
      selectedItems[currentItem] = produceList[currentItem];
    }
  }

  return selectedItems;
}
