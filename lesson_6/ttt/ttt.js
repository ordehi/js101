const rlSync = require('../../node_modules/readline-sync');

const BOARD_LANE = '     |     |';
const BOARD_LINE = '-----+-----+-----';
const EMPTY_SQUARE = ' ';
const PLAYER_MARKER = 'X';
const COMPUTER_MARKER = 'O';
const WINNING_LINES = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

function initializeBoard() {
  let newBoard = {};
  for (let count = 1; count <= 9; count += 1) {
    newBoard[count] = EMPTY_SQUARE;
  }

  return newBoard;
}

function displayBoard(board) {
  console.clear();
  print(`You are ${PLAYER_MARKER}. Computer ${COMPUTER_MARKER}`);
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

function emptySquares(board) {
  return Object.keys(board).filter((square) => board[square] === EMPTY_SQUARE);
}

function playerChoosesSquare(board, moves) {
  let empty = emptySquares(board);
  print(`Choose a square ${empty.join(', ')}, top-left to bottom-right.`);

  let playerChoice = prompt();
  while (true) {
    if (empty.includes(playerChoice)) break;
    print("That's not a valid choice.");
    playerChoice = prompt();
  }

  board[playerChoice] = PLAYER_MARKER;
  moves.player.push(Number(playerChoice));
  print(`Player plays ${playerChoice}`);
}

function computerPlays(board, moves) {
  let empty = emptySquares(board);
  let randomEmpty = Math.floor(Math.random() * empty.length);
  let computerChoice = empty[randomEmpty];

  print(board[computerChoice]);
  board[computerChoice] = COMPUTER_MARKER;
  moves.computer.push(Number(computerChoice));
  print(`Computer plays ${computerChoice}`);
}

function boardFull(board) {
  return emptySquares(board).length === 0;
}

function winningLineIn(line, moves) {
  return line.every((square) => moves.includes(square));
}

function getWinner(moves) {
  for (const line of WINNING_LINES) {
    if (winningLineIn(line, moves.player)) {
      return 'Player';
    } else if (winningLineIn(line, moves.computer)) {
      return 'Computer';
    }
  }
  return null;
}

function someoneWon(moves) {
  return !!getWinner(moves);
}

function shouldContinue() {
  let answer;
  while (true) {
    print('Do you want to play again? [Y/n]');
    answer = prompt().toLowerCase();
    if (answer === '') answer = 'y';
    if (['y', 'n'].includes(answer[0])) break;
  }
  return answer;
}

while (true) {
  let board = initializeBoard();
  let moves = {
    player: [],
    computer: [],
  };

  while (true) {
    displayBoard(board);

    playerChoosesSquare(board, moves);
    if (boardFull(board) || someoneWon(moves)) break;

    computerPlays(board, moves);
    displayBoard(board);

    if (boardFull(board) || someoneWon(moves)) break;
  }

  displayBoard(board);

  if (someoneWon(moves)) {
    print(`${getWinner(moves)} won!`);
  } else {
    print("It's a tie!");
  }

  let continuePlaying = shouldContinue();
  if (continuePlaying === 'n') break;
}
