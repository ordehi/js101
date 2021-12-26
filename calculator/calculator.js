const rlSync = require('readline-sync');

const mathOperations = {
  1: (x, y) => x + y,
  2: (x, y) => x - y,
  3: (x, y) => x * y,
  4: (x, y) => x / y,
};

const isNaNOrZero = (number) => isNaN(number) || number === 0;

const askAndStore = (msg) => rlSync.question(`=> ${msg}\n`);
const prompt = (msg) => console.log(`=> ${msg}`);
const separator = () => console.log('---------------------------------------');

const loopForNumber = (numberOrder) => {
  let number = askAndStore(`What is the ${numberOrder} number?`) * 1;
  while (isNaNOrZero(number)) {
    number = askAndStore("That's not a valid number!") * 1;
  }
  return number;
};

const loopForOperation = () => {
  let chosenOperation = askAndStore(
    'Choose an operation\n1) Add 2) Subtract 3) Multiply 4) Divide'
  );
  while (chosenOperation < 1 || chosenOperation > 4) {
    chosenOperation = askAndStore('Operation must be between 1 and 4');
  }
  return chosenOperation;
};

separator();
prompt('Welcome to the Calculator!');
prompt('Input numbers must be greater than 0');
separator();

const calculator = () => {
  let number1 = loopForNumber('first');
  let number2 = loopForNumber('second');
  let chosenOperation = loopForOperation();

  let result = mathOperations[chosenOperation](number1, number2);

  prompt(`The result is ${result}`);
};

const startContinueOrExit = (continueOrExit) => {
  while (continueOrExit.toLowerCase() === 'y') {
    calculator();
    continueOrExit =
      askAndStore('Do you want to perform another operation? [Y/n]') || 'y';
  }
};

startContinueOrExit('y');

separator();
prompt('Thank you for using the calculator!');
