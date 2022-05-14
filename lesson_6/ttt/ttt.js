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
const GAMES_TO_WIN_MATCH = 5;
const POINT_FOR_GAME = 1;

let playerName = '';

function initializeBoard() {
  let newBoard = {};
  for (let count = 1; count <= 9; count += 1) {
    newBoard[count] = EMPTY_SQUARE;
  }

  return newBoard;
}

function displayBoard(board) {
  console.clear();
  print(`You are ${PLAYER_MARKER}. Computer is ${COMPUTER_MARKER}`);
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

function joinOr(array, separatorChar = ', ', lastSeparatorWord = 'or') {
  if (array.length === 0) return '';
  if (array.length === 1) return array.toString();
  if (array.length === 2) return array.join(` ${lastSeparatorWord} `);

  let arrWithoutLastEl = array.slice(0, array.length - 1);
  let arrWithLastSeparator = arrWithoutLastEl.concat(lastSeparatorWord);
  let stringWithLastSeparator = arrWithLastSeparator.join(separatorChar);
  let stringWithLastElem = stringWithLastSeparator.concat(
    ` ${array[array.length - 1]}`
  );

  return stringWithLastElem;
}

/* Launch's solve to joinOr

function joinOr(arr, delimiter = ', ', word = 'or') {
  switch (arr.length) {
    case 0:
      return '';
    case 1:
      return `${arr[0]}`;
    case 2:
      return arr.join(` ${word} `);
    default:
      return arr.slice(0, arr.length - 1).join(delimiter) +
             `${delimiter}${word} ${arr[arr.length - 1]}`;
  }
}

*/

function playerChoosesSquare(board, moves, playerName = 'Player') {
  let empty = emptySquares(board);
  print(`Choose a square ${joinOr(empty)}, top-left to bottom-right.`);

  let playerChoice = prompt();
  while (true) {
    if (empty.includes(playerChoice)) break;
    print("That's not a valid choice.");
    playerChoice = prompt();
  }

  board[playerChoice] = PLAYER_MARKER;
  moves.player.push(Number(playerChoice));
  print(`${playerName} plays ${playerChoice}`);
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
      return playerName;
    } else if (winningLineIn(line, moves.computer)) {
      return 'Computer';
    }
  }
  return null;
}

function someoneWonGame(moves) {
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

function getPlayerName() {
  print("What's your name?");
  let playerName = prompt();
  return playerName || 'Player';
}

function addToScore(scoreCard, winner, points) {
  let isWinnerPlayer = winner !== 'computer';
  scoreCard[isWinnerPlayer ? 'player' : winner] += points;
}

function getMatchWinner(scoreCard) {
  if (scoreCard.player === GAMES_TO_WIN_MATCH) {
    return playerName;
  } else if (scoreCard.computer === GAMES_TO_WIN_MATCH) {
    return 'Computer';
  }

  return null;
}

function someoneWonMatch(scoreCard) {
  return !!getMatchWinner(scoreCard, playerName);
}

function getScoreMessage(scoreCard) {
  return `${playerName} ${scoreCard.player}, Computer ${scoreCard.computer}`;
}

function initializeMoves() {
  return { player: [], computer: [] };
}

function initializeScoreCard() {
  return { player: 0, computer: 0 };
}

function announceGameWinner(scoreCard, winner) {
  print(`${winner} won the game!`);
  print(`Current match score is ${getScoreMessage(scoreCard)}`);
}

function announceMatchWinner(scoreCard, matchWinner) {
  print(`${matchWinner} won the match!`);
  print(`Final score was ${getScoreMessage(scoreCard)}`);
}

while (true) {
  playerName = getPlayerName();
  print(`Your name is ${playerName}`);

  let scoreCard = initializeScoreCard();

  while (true) {
    let board = initializeBoard();
    let moves = initializeMoves();

    while (true) {
      displayBoard(board);

      playerChoosesSquare(board, moves);
      if (boardFull(board) || someoneWonGame(moves)) break;

      computerPlays(board, moves);
      displayBoard(board);

      if (boardFull(board) || someoneWonGame(moves)) break;
    }

    displayBoard(board);

    if (someoneWonGame(moves)) {
      let winner = getWinner(moves);
      addToScore(scoreCard, winner.toLowerCase(), POINT_FOR_GAME);
      announceGameWinner(scoreCard, winner);

      if (someoneWonMatch(scoreCard)) {
        let matchWinner = getMatchWinner(scoreCard);
        announceMatchWinner(scoreCard, matchWinner);
        scoreCard = initializeScoreCard();
      }
    } else {
      print("It's a tie!");
    }

    let continuePlaying = shouldContinue();
    if (continuePlaying === 'n') break;
  }

  break;
}
