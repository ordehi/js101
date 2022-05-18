const rlSync = require('../../node_modules/readline-sync');

function total(cards) {
  let values = cards.map((card) => card[1]);

  let sum = 0;
  values.forEach((value) => {
    if (value === 'A') {
      sum += 11;
    } else if (['J', 'Q', 'K'].includes(value)) {
      sum += 10;
    } else {
      sum += Number(value);
    }
  });

  values
    .filter((value) => value === 'A')
    .forEach((_) => {
      if (sum > 21) sum -= 10;
    });

  return sum;
}

function shuffle(array) {
  for (let index = array.length - 1; index > 0; index--) {
    let otherIndex = Math.floor(Math.random() * (index + 1)); // 0 to index
    [array[index], array[otherIndex]] = [array[otherIndex], array[index]]; // swap elements
  }
}

function busted(cards) {
  let points = total(cards);
  if (points > 21) return true;
  return false;
}

function calculateWinner(cards) {
  let results = {};
  results.player = total(cards.player);
  results.dealer = total(cards.dealer);

  if (results.player > results.dealer) {
    results.winner = 'player';
  } else if (results.player < results.dealer) {
    results.winner = 'dealer';
  } else {
    results.winner = 'tie';
  }

  return results;
}

function displayWinner(results) {
  console.log(`${results.winner} wins with ${results[results.winner]}!`);
}

while (true) {
  console.log('hit or stay?');
  let answer = rlSync.question();
  if (answer === 'stay' || busted()) break;
}

if (busted()) {
  // probably end the game? or ask the user to play again?
} else {
  console.log('You chose to stay!'); // if player didn't bust, must have stayed to get here
}

while (true) {
  if (total(dealerCards) >= 17 || busted()) break;
  let card = drawCard();
  console.log('Dealer hits for ' + card);
}
