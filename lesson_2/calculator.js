// Require readline-sync
const rlSync = require('readline-sync');

// An object holds each operation type as a method
const mathOperations = {
  1: (x, y) => x + y,
  2: (x, y) => x - y,
  3: (x, y) => x * y,
  4: (x, y) => x / y,
};

console.log('Welcome to the Calculator!');
console.log('You can quit at any time by sending CTRL + C');
console.log('--------------------------------------------');

const calculator = () => {
  // Ask the user for the first number
  let number1 = rlSync.question('What is the first number?\n=> ') * 1;

  // Handle NaN input
  while (number1 !== number1 || number1 === 0) {
    number1 =
      rlSync.question(
        'You must enter a number greater than 0.\nWhat is the first number?\n=> '
      ) * 1;
  }
  // Ask the user for the second number
  let number2 = rlSync.question('What is the second number?\n=> ') * 1;

  // Handle NaN input
  while (number2 !== number2 || number2 === 0) {
    number2 =
      rlSync.question(
        'You must enter a number greater than 0.\nWhat is the second number?\n=> '
      ) * 1;
  }

  // Ask the user for operation: +, -, *, /
  let chosenOperation = rlSync.question(
    'What operation would you like to perform?\n1) Add 2) Subtract 3) Multiply 4) Divide\n=> '
  );

  while (chosenOperation < 1 || chosenOperation > 4) {
    chosenOperation = rlSync.question(
      'You must choose an operation within 1-4\n1) Add 2) Subtract 3) Multiply 4) Divide\n=> '
    );
  }

  // Perform the operation
  let result = mathOperations[chosenOperation](number1, number2);

  // Display the result of the operation
  console.log(`The result is ${result}`);
};

// Initially store that the user wants to use the calculator
let continueOrExit = '1';

// Ask the user if they want to continue with the program or exit
// Run the program as long as the user doesn't quit
while (continueOrExit === '1') {
  calculator();

  // if the user doesn't input anything, Yes is selected by default
  continueOrExit =
    rlSync.question('Do you want to perform another operation?\nY/n\n=> ') ||
    'y';

  if (continueOrExit && continueOrExit.toLocaleLowerCase() === 'y') {
    continueOrExit = '1';
  } else {
    continueOrExit = '2';
  }
}

// Thank the user for using the calculator
console.log('-----------------------------------');
console.log('Thank you for using the calculator!');
