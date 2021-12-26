const rlSync = require('readline-sync');

const mathOperations = {
  1: (x, y) => x + y,
  2: (x, y) => x - y,
  3: (x, y) => x * y,
  4: (x, y) => x / y,
};

const isNaNOrZero = (number) => isNaN(number) || number === 0;

console.log('Welcome to the Calculator!');
console.log('Input numbers must be greater than 0');
console.log('--------------------------------------------');

const calculator = () => {
  let number1 = 0;
  while (isNaNOrZero(number1)) {
    number1 = rlSync.question('What is the first number?\n=> ') * 1;
  }

  let number2 = 0;
  while (isNaNOrZero(number2)) {
    number2 = rlSync.question('What is the second number?\n=> ') * 1;
  }

  let chosenOperation = 0;
  while (chosenOperation < 1 || chosenOperation > 4) {
    chosenOperation = rlSync.question(
      'Choose an operation\n1) Add 2) Subtract 3) Multiply 4) Divide\n=> '
    );
  }

  let result = mathOperations[chosenOperation](number1, number2);

  console.log(`The result is ${result}`);
};

let continueOrExit = '1';

while (continueOrExit === '1') {
  calculator();

  continueOrExit =
    rlSync.question('Do you want to perform another operation?\nY/n\n=> ') ||
    'y';

  if (continueOrExit && continueOrExit.toLocaleLowerCase() === 'y') {
    continueOrExit = '1';
  } else {
    continueOrExit = '2';
  }
}

console.log('-----------------------------------');
console.log('Thank you for using the calculator!');
