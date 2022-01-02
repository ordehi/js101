const readline = require('readline-sync');
const VALID_CHOICES = ['rock', 'paper', 'scissors'];
const getUserInput = (message) => readline.question('>> ' + message + '\n>> ');
const display = (message) => console.log(message);

const getYesOrNoTo = (message) => {
  let yesOrNo = getUserInput(message).toLowerCase();
  while (yesOrNo !== 'y' && yesOrNo !== 'n') {
    yesOrNo = getUserInput('Would you like to play again?').toLowerCase();
  }

  return yesOrNo === 'y';
};

const displayWinner = (playerChoice, computerChoice) => {
  display(`You chose ${playerChoice}, computer chose ${computerChoice}`);

  if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissors' && computerChoice === 'paper')
  ) {
    display('===============\nYou win!\n===============');
  } else if (
    (playerChoice === 'rock' && computerChoice === 'paper') ||
    (playerChoice === 'paper' && computerChoice === 'scissors') ||
    (playerChoice === 'scissors' && computerChoice === 'rock')
  ) {
    display('===============\nComputer wins!\n===============');
  } else {
    display("===============\nIt's a tie\n===============");
  }
};

while (true) {
  let playerChoice = getUserInput(`Choose one: ${VALID_CHOICES.join(', ')}`);

  while (!VALID_CHOICES.includes(playerChoice)) {
    playerChoice = getUserInput(`${playerChoice} is not a valid playerChoice`);
  }

  let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
  let computerChoice = VALID_CHOICES[randomIndex];

  display(`You chose ${playerChoice}, computer chose ${computerChoice}`);

  displayWinner(playerChoice, computerChoice);

  if (!getYesOrNoTo('Would you like to play again? y/n')) break;
}
