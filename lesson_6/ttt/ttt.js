const rlSync = require('../../node_modules/readline-sync');

const LANE = '     |     |';
const LINE = '-----+-----+-----';
const SPACE = ' ';

let board = initializeBoard();

function initializeBoard() {
  let newBoard = {};
  for (let count = 1; count <= 9; count += 1) {
    newBoard[count] = SPACE;
  }

  return newBoard;
}

function displayBoard(board) {
  print('');
  print(LANE);
  printPlayable(board['1'], board['2'], board['3']);
  print(LANE);
  print(LINE);
  print(LANE);
  printPlayable(board['4'], board['5'], board['6']);
  print(LANE);
  print(LINE);
  print(LANE);
  printPlayable(board['7'], board['8'], board['9']);
  print(LANE);
  print('');
}

function printPlayable(first, second, third) {
  print(`  ${first}  |  ${second}  |  ${third}`);
}

function drawLine() {
  print(LINE);
}

function print(message) {
  return console.log(message);
}

function prompt(cursor = '=>') {
  return rlSync.prompt(`${cursor}`);
}

function repeat(fn, iterations = 1, ...fnArgs) {
  for (let count = 1; count <= iterations; count += 1) {
    fn(...fnArgs);
  }
}

displayBoard(board);

// Ask the player to make a choice

/* Need a function that logs to the console with a prompt 
and returns the prompt with the value being the player's choice */

function playerChoosesSquare(board) {
  print('Choose a square from 1-9, top-left to bottom-right.');
  let playerChoice = prompt();

  board[playerChoice] = 'X';
  print(`Player plays ${playerChoice}`);

  displayBoard(board);
}

function computerPlays(board) {
  let computerChoice = null;

  while (
    computerChoice === null ||
    ['X', 'O'].includes(board[computerChoice])
  ) {
    computerChoice = Math.ceil(Math.random() * 9);
  }

  board[computerChoice] = 'O';
  print(`Computer plays ${computerChoice}`);

  displayBoard(board);
}

function isBoardFull(board) {
  return !Object.values(board).includes(' ');
}

while (isBoardFull(board) === false) {
  playerChoosesSquare(board);
  computerPlays(board);
}
