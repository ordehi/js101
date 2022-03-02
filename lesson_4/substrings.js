function substrings(str, sublength) {
  let result = [];

  for (let start = 0; start < str.length - 1; start += 1) {
    for (let end = start + sublength; end <= str.length; end += 1) {
      result.push(str.substring(start, end));
    }
  }

  return result;
}

substrings('hello there');
