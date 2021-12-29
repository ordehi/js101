const readline = require('readline-sync');
const MESSAGES = require('./messages.json');

const askUserForInput = (message) =>
  readline.question('>> ' + message + '\n?? ');

const getStringMakeNumber = (message) => {
  let numFromStr = Number(askUserForInput(message));
  while (isNaN(numFromStr) || numFromStr < 0) {
    numFromStr = Number(askUserForInput(MESSAGES.validNumber));
  }
  return numFromStr;
};

const say = (message) => console.log(message);

const separator = () => console.log('------------------------------');

// let years = getNumberFromUser('Enter years');

const calculateMonthlyRate = (annualRate, loanDurationMonths) =>
  annualRate / loanDurationMonths / 100;

const calculateMonthlyPayment = (loanAmount, monthlyRate, loanDurationMonths) =>
  loanAmount *
  (monthlyRate / (1 - Math.pow(1 + monthlyRate, -loanDurationMonths)));

// const yearsToMonths = (years) => Math.ceil(years * 12);

const loanCalculator = (loanAmount, annualRate, loanDurationMonths) => {
  // let loanDurationMonths = yearsToMonths(years);
  let monthlyRate = calculateMonthlyRate(annualRate, loanDurationMonths);
  let monthlyPayment = calculateMonthlyPayment(
    loanAmount,
    monthlyRate,
    loanDurationMonths
  );

  console.log(`Your monthly payment is $${monthlyPayment.toFixed(2)}.`);
  separator();
  // console.log(`The monthly interest rate is ${monthlyRate.toFixed(4)}`);
};

const programLifecycle = (continueOrExit) => {
  say(MESSAGES.welcome);
  separator();

  while (continueOrExit === true) {
    let loanAmount = getStringMakeNumber(MESSAGES.loan);
    let annualRate = getStringMakeNumber(MESSAGES.annualRate);
    let loanDurationMonths = getStringMakeNumber(MESSAGES.monthDuration);

    loanCalculator(loanAmount, annualRate, loanDurationMonths);

    continueOrExit =
      askUserForInput(MESSAGES.anotherCalc).toLowerCase() === 'y';
  }
  say(MESSAGES.thankYou);
};

let continueOrExit = true;
programLifecycle(continueOrExit);
