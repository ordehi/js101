const rlSync = require('readline-sync');
const MESSAGES = require('./messages.json');
const LANGUAGE = 'en';
const LOCAL_MESSAGES = MESSAGES[LANGUAGE];

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
  let number = askAndStore(LOCAL_MESSAGES[numberOrder]) * 1;
  while (isNaNOrZero(number)) {
    number = askAndStore(LOCAL_MESSAGES.invalidNumber) * 1;
  }
  return number;
};

const loopForOperation = () => {
  let chosenOperation = askAndStore(LOCAL_MESSAGES.chooseOperation);
  while (chosenOperation < 1 || chosenOperation > 4) {
    chosenOperation = askAndStore(LOCAL_MESSAGES.operationRange);
  }
  return chosenOperation;
};

separator();
prompt(LOCAL_MESSAGES.welcome);
prompt(LOCAL_MESSAGES.inputRange);
separator();

const calculator = () => {
  let number1 = loopForNumber('firstNumber');
  let number2 = loopForNumber('secondNumber');
  let chosenOperation = loopForOperation();

  let result = mathOperations[chosenOperation](number1, number2);

  prompt(LOCAL_MESSAGES.result + result);
};

const startContinueOrExit = (continueOrExit) => {
  while (continueOrExit.toLowerCase() === 'y') {
    calculator();
    continueOrExit = askAndStore(LOCAL_MESSAGES.anotherOperation) || 'y';
  }
};

startContinueOrExit('y');

separator();
prompt(MESSAGES.thankYou);
