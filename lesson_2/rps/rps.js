const readline = require('readline-sync');
const INDEXED_CHOICES = ['r', 'p', 's', 'l', 'v'];
const VALID_CHOICES = {
  r: 'rock',
  p: 'paper',
  s: 'scissors',
  l: 'lizard',
  v: 'spock',
};
const WINNING_COMBOS = {
  rock: ['scissors', 'lizard'],
  paper: ['rock', 'spock'],
  scissors: ['paper', 'lizard'],
  lizard: ['paper', 'spock'],
  spock: ['rock', 'scissors'],
};

const SCORE = {
  player: 0,
  computer: 0,
  tie: 0,
};

const getUserInput = (message) => readline.question('>> ' + message + '\n>> ');
const display = (message) => console.log(message);

const getYesOrNoTo = (message) => {
  let yesOrNo = getUserInput(message).toLowerCase();
  while (yesOrNo !== 'y' && yesOrNo !== 'n') {
    yesOrNo = getUserInput(message).toLowerCase();
  }

  return yesOrNo === 'y';
};

const playerWins = (playerChoice, computerChoice) =>
  WINNING_COMBOS[VALID_CHOICES[playerChoice]].includes(computerChoice);

const getWinner = (playerChoice, computerChoice) => {
  if (playerWins(playerChoice, computerChoice)) {
    return 'player';
  } else if (playerChoice === computerChoice) {
    return 'tie';
  } else {
    return 'computer';
  }
};

const displayWinner = (winner) => {
  if (winner === 'player') {
    display('===============\nYou win!\n===============');
  } else if (winner === 'computer') {
    display('===============\nComputer wins!\n===============');
  } else {
    display("===============\nIt's a tie\n===============");
  }
};

while (true) {
  let formattedChoices = JSON.stringify(VALID_CHOICES)
    .replace(/{|}|"/g, '')
    .replace(/:/g, ' for ')
    .replace(/,/g, ', ');
  let playerChoice = getUserInput(`Choose one: ${formattedChoices}`);

  while (VALID_CHOICES[playerChoice] === undefined) {
    playerChoice = getUserInput(`${playerChoice} is not a valid playerChoice`);
  }

  let randomIndex = Math.floor(Math.random() * INDEXED_CHOICES.length);
  let computerChoice = VALID_CHOICES[INDEXED_CHOICES[randomIndex]];

  let winner = getWinner(playerChoice, computerChoice);
  SCORE[winner] += 1;

  display(
    `You chose ${VALID_CHOICES[playerChoice]}, computer chose ${computerChoice}`
  );

  if (SCORE[winner] === 5) {
    display(`${winner} wins with ${SCORE[winner]} points`);
    break;
  }

  displayWinner(winner);

  if (!getYesOrNoTo('Would you like to play again? y/n')) break;
}
