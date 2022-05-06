const rlSync = require('../../node_modules/readline-sync');

const BOARD_LANE = '     |     |';
const BOARD_LINE = '-----+-----+-----';
const EMPTY_SQUARE = ' ';
const PLAYER_MARKER = 'X';
const COMPUTER_MARKER = 'O';

let board = initializeBoard();

function initializeBoard() {
  let newBoard = {};
  for (let count = 1; count <= 9; count += 1) {
    newBoard[count] = EMPTY_SQUARE;
  }

  return newBoard;
}

function displayBoard(board) {
  console.clear();
  print('');
  print(BOARD_LANE);
  printPlayable(board['1'], board['2'], board['3']);
  print(BOARD_LANE);
  print(BOARD_LINE);
  print(BOARD_LANE);
  printPlayable(board['4'], board['5'], board['6']);
  print(BOARD_LANE);
  print(BOARD_LINE);
  print(BOARD_LANE);
  printPlayable(board['7'], board['8'], board['9']);
  print(BOARD_LANE);
  print('');
}

function printPlayable(first, second, third) {
  print(`  ${first}  |  ${second}  |  ${third}`);
}

function print(message) {
  return console.log(message);
}

function prompt(cursor = '=>') {
  return rlSync.prompt(`${cursor}`);
}

displayBoard(board);

function emptySquares(board) {
  return Object.keys(board).filter((square) => board[square] === EMPTY_SQUARE);
}

function playerChoosesSquare(board) {
  let empty = emptySquares(board);
  print(`Choose a square ${empty}, top-left to bottom-right.`);

  let playerChoice = prompt();
  while (true) {
    if (empty.includes(playerChoice)) break;
    print("That's not a valid choice.");
    playerChoice = prompt();
  }

  board[playerChoice] = PLAYER_MARKER;
  print(`Player plays ${playerChoice}`);
}

function computerPlays(board) {
  let empty = emptySquares(board);
  let randomEmpty = Math.floor(Math.random() * empty.length);
  let computerChoice = empty[randomEmpty];

  print(board[computerChoice]);
  board[computerChoice] = COMPUTER_MARKER;
  print(`Computer plays ${computerChoice}`);
}

function boardFull(board) {
  return emptySquares(board).length === 0;
}

function someoneWon(board) {
  return false;
}

while (true) {
  playerChoosesSquare(board);
  computerPlays(board);
  displayBoard(board);

  if (boardFull(board) || someoneWon(board)) break;
}
