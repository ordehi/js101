const rlSync = require('../../node_modules/readline-sync');

const SUITS = ['H', 'S', 'D', 'C'];
const VALUES = [
  '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A',
];

function print(message) {
  return console.log('\n' + message);
}

function prompt(cursor = '=>') {
  return rlSync.prompt(`${cursor}`);
}

function createCards() {
  let cards = [];
  SUITS.forEach((suit) => {
    VALUES.forEach((value) => cards.push([suit, value]));
  });

  return shuffle(cards);
}

function dealCard(deck) {
  return deck.pop();
}

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

function calculateWinner(player, dealer) {
  let results = {};
  results.player = total(player);
  results.dealer = total(dealer);
  results.winner = 'Dealer'; // The house always wins
  results.loser = 'Player';

  if (results.player > results.dealer) {
    [results.winner, results.loser] = [results.loser, results.winner];
  } else if (results.player === results.dealer) {
    results.winner = 'tie';
  }
  return results;
}

function displayWinner(results) {
  if (results.winner === 'tie') {
    print(`It's a tie!`);
  } else {
    print(`${results.winner} wins with ${results[results.winner.toLowerCase()]} against ${results.loser}'s ${results[results.loser.toLowerCase()]}!`);
  }
}

function dealInitialHands(player, dealer, deck) {
  player.push(dealCard(deck));
  dealer.push(dealCard(deck));
  player.push(dealCard(deck));
  dealer.push(dealCard(deck));
}

const CARD_NAMES = {
  H: 'Hearts',
  S: 'Spades',
  D: 'Diamonds',
  C: 'Clubs',
  J: 'Jack',
  Q: 'Queen',
  K: 'King',
  A: 'Ace',
};

function prettifyCards(cards) {
  let prettyCards = cards.map(card => {
    return `${CARD_NAMES[card[1]] || card[1]} of ${CARD_NAMES[card[0]]}`;
  });
  return prettyCards;
}

function playerTurn(playerHand, deck, dealerHand) {
  while (true) {
    print('Hit or stay?');
    let answer = prompt();
    if (answer === 'stay') break;
    let card = dealCard(deck);
    playerHand.push(card);
    print(`You hit for ${prettifyCards([card])}`);
    if (busted(playerHand)) break;
    announceCards(playerHand, dealerHand);
  }
}

function dealerTurn(dealerHand, deck, playerHand) {
  while (true) {
    if (total(dealerHand) >= 17 || busted(dealerHand)) break;
    let card = dealCard(deck);
    dealerHand.push(card);
    print(`Dealer hits for ${prettifyCards([card])}`);
    announceCards(playerHand, dealerHand);
  }
}

function announceCards(player, dealer) {
  print(`Player cards: ${total(player)}\n${prettifyCards(player).join(' - ')}`);
  print(`Dealer cards: ${total(dealer.slice(1))}+\n? of ? - ${prettifyCards(dealer.slice(1)).join(' - ')}`);
}

function shouldContinue() {
  let answer;
  while (true) {
    print('Do you want to play again? [Y/n]');
    answer = prompt();
    if (['y', 'n', 'yes', 'no'].includes(answer.toLowerCase())) break;
    print('Not a valid choice.');
  }
  return answer;
}

while (true) {
  // Initialize deck
  let deck = createCards();

  // Deal cards to player and dealer
  let dealerHand = [];
  let playerHand = [];
  dealInitialHands(playerHand, dealerHand, deck);

  announceCards(playerHand, dealerHand);

  while (true) {
    // Player Turn - hit or stay
    playerTurn(playerHand, deck, dealerHand);

    // If player busts, dealer wins
    if (busted(playerHand)) {
      // probably end the game? or ask the user to play again?
      print(`You busted with ${total(playerHand)}. Dealer wins.`);
      // End loop
      break;
    } else {
      print('You chose to stay!'); // if player didn't bust, must have stayed to get here
    }

    // Dealer turn, hit or stay
    dealerTurn(dealerHand, deck, playerHand);

    // If dealer busts, player wins
    if (busted(dealerHand)) {
      // probably end the game? or ask the user to play again?
      print(`Dealer busted with ${total(dealerHand)}. Player wins!`);
      // End loop
      break;
    } else {
      print('Dealer chose to stay!'); // if player didn't bust, must have stayed to get here
    }

    // Compare cards and declare winner
    displayWinner(calculateWinner(playerHand, dealerHand));
    break;
  }

  let continuePlaying = shouldContinue();
  if (['n', 'no'].includes(continuePlaying)) break;
}