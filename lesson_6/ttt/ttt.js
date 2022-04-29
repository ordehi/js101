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

function repeat(fn, iterations = 1, ...fnArgs) {
  for (let count = 1; count <= iterations; count += 1) {
    fn(...fnArgs);
  }
}

displayBoard(board);
