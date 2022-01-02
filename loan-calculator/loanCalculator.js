const readline = require('readline-sync');
const MESSAGES = require('./messages.json');
const SEPARATOR = '------------------------------';
const HISTORY = {};
let timesRun = 0;

const getUserInput = (message) => readline.question('>> ' + message + '\n>> ');

const getValidNumberFromUser = (message) => {
  let numFromStr = Number(getUserInput(message).trim());
  while (isNaN(numFromStr) || numFromStr <= 0) {
    numFromStr = Number(getUserInput(MESSAGES.validNumber).trim());
  }
  return numFromStr;
};

const updateHistory = (loan) => {
  timesRun += 1;
  HISTORY[timesRun] = loan;
};

const display = (message) => console.log(message);

const displayHistory = () => {
  display(SEPARATOR);
  display('Loan History');
  display(SEPARATOR);
  console.dir(HISTORY);
};

const computeMonthRate = (annualRate, loanMonthDuration) =>
  annualRate / loanMonthDuration / 100;

const computeMonthPayment = (loanAmount, monthRate, loanMonthDuration) =>
  loanAmount * (monthRate / (1 - Math.pow(1 + monthRate, -loanMonthDuration)));

const getLoanDataFromUser = () => {
  return {
    amount: getValidNumberFromUser(MESSAGES.loan),
    annualRate: getValidNumberFromUser(MESSAGES.annualRate),
    months: getValidNumberFromUser(MESSAGES.monthDuration),
  };
};

const computeLoan = (loanData) => {
  let loan = loanData;
  loan.monthRate = computeMonthRate(loan.annualRate, loan.months);
  loan.monthPay = computeMonthPayment(loan.amount, loan.monthRate, loan.months);

  return loan;
};

const buildLoanMsg = (loan) => {
  loan.message = `${MESSAGES.rate} ${loan.monthRate.toFixed(4)}, ${
    MESSAGES.pay
  } $${loan.monthPay.toFixed(2)}`;

  return loan;
};

const getYesOrNoTo = (message) => {
  let yesOrNo = getUserInput(message).toLowerCase();
  while (yesOrNo !== 'y' && yesOrNo !== 'n') {
    yesOrNo = getUserInput(MESSAGES.enterYOrN).toLowerCase();
  }

  return yesOrNo === 'y';
};

const programLifecycle = () => {
  display(SEPARATOR);
  display(MESSAGES.welcome);

  while (true) {
    display(SEPARATOR);
    let loanData = getLoanDataFromUser();
    let loan = computeLoan(loanData);
    buildLoanMsg(loan);
    updateHistory(loan);
    display(loan.message);
    display(SEPARATOR);

    if (!getYesOrNoTo(MESSAGES.goAgain)) break;
  }

  console.clear();
  if (getYesOrNoTo(MESSAGES.showHistory)) displayHistory();
  display(SEPARATOR);
  display(MESSAGES.thankYou);
};

programLifecycle();
