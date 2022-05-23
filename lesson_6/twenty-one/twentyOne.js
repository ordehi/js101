const rlSync = require('../../node_modules/readline-sync');

const SUITS = ['H', 'S', 'D', 'C'];
const VALUES = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
  'A',
];

const WINNING_TOTAL = 21;
const DEALER_HIT_LIMIT = 17;

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

  shuffle(cards);
  return cards;
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
      if (sum > WINNING_TOTAL) sum -= 10;
    });

  return sum;
}

function shuffle(array) {
  for (let index = array.length - 1; index > 0; index--) {
    let otherIndex = Math.floor(Math.random() * (index + 1)); // 0 to index
    [array[index], array[otherIndex]] = [array[otherIndex], array[index]]; // swap elements
  }
}

function busted(points) {
  return points > WINNING_TOTAL;
}

function calculateWinner(playerTotal, dealerTotal) {
  let results = {};
  results.player = playerTotal;
  results.dealer = dealerTotal;
  results.winner = 'Dealer'; // The house always wins
  results.loser = 'Player';

  if (playerTotal > dealerTotal) {
    [results.winner, results.loser] = [results.loser, results.winner];
  } else if (playerTotal === dealerTotal) {
    results.winner = 'tie';
  }

  return results;
}

function displayWinner(results) {
  if (results.winner === 'tie') {
    print(`It's a tie!`);
  } else {
    print(
      `${results.winner} wins with ${
        results[results.winner.toLowerCase()]
      } against ${results.loser}'s ${results[results.loser.toLowerCase()]}!`
    );
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
  let prettyCards = cards.map((card) => {
    return `${CARD_NAMES[card[1]] || card[1]} of ${CARD_NAMES[card[0]]}`;
  });
  return prettyCards;
}

function playerTurn(playerHand, deck, dealerHand) {
  while (true) {
    let answer = hitOrStay();
    if (['s', 'stay'].includes(answer)) break;
    let card = dealCard(deck);
    playerHand.push(card);
    playerHand.shift();
    playerHand.unshift(total(playerHand));
    print(`You hit for ${prettifyCards([card])}`);
    if (busted(playerHand[0])) break;
    announceCards(playerHand, dealerHand);
  }
}

function dealerTurn(dealerHand, deck, playerHand) {
  while (true) {
    let dealerTotal = dealerHand[0];
    if (dealerTotal >= DEALER_HIT_LIMIT || busted(dealerTotal)) break;
    let card = dealCard(deck);
    dealerHand.push(card);
    dealerHand.shift();
    dealerHand.unshift(total(dealerHand));
    print(`Dealer hits for ${prettifyCards([card])}`);
    announceCards(playerHand, dealerHand);
  }
}

function announceCards(playerHand, dealerHand) {
  print(
    `Player cards: ${playerHand[0]}\n${prettifyCards(playerHand.slice(1)).join(
      ' - '
    )}`
  );
  print(
    `Dealer cards: ${total(dealerHand.slice(2))}+\n? of ? - ${prettifyCards(
      dealerHand.slice(2)
    ).join(' - ')}`
  );
}

function shouldContinue(gameOrMatch) {
  let answer;
  while (true) {
    print(`Do you want to play another ${gameOrMatch}? [Y/n]`);
    answer = prompt();
    if (['y', 'n', 'yes', 'no'].includes(answer.toLowerCase())) break;
    print('Not a valid choice.');
  }
  return answer.toLowerCase();
}

function hitOrStay() {
  let answer;
  while (true) {
    print('Hit or stay?');
    answer = prompt();
    if (['s', 'stay', 'h', 'hit'].includes(answer.toLowerCase())) break;
    print('Not a valid choice.');
  }
  return answer.toLowerCase();
}

function getMatchPointMessage(scoreCard) {
  return `Player: ${scoreCard.player}\nDealer: ${scoreCard.dealer}`;
}

function updateScoreCard(scoreCard, winner) {
  scoreCard[winner.toLowerCase()] += 1;
}

function someoneWonMatch(scoreCard) {
  if (scoreCard.player >= 5) return 'Player';
  if (scoreCard.dealer >= 5) return 'Dealer';
  return false;
}

function displayMatchResults(scoreCard, matchWinner) {
  print(
    `${
      matchWinner
        ? matchWinner + ' won the match!'
        : 'Match ended early, no winner.'
    } Final score is:\n${getMatchPointMessage(scoreCard)}`
  );
}

while (true) {
  let scoreCard = {
    player: 0,
    dealer: 0,
  };

  let matchWinner = false;

  while (true) {
    // Initialize deck
    let deck = createCards();

    // Deal cards to player and dealer
    let dealerHand = [];
    let playerHand = [];
    dealInitialHands(playerHand, dealerHand, deck);
    dealerHand.unshift(total(dealerHand));
    playerHand.unshift(total(playerHand));

    announceCards(playerHand, dealerHand);

    while (true) {
      // Player Turn - hit or stay
      playerTurn(playerHand, deck, dealerHand);

      // If player busts, dealer wins
      if (busted(playerHand[0])) {
        // probably end the game? or ask the user to play again?
        print(`You busted with ${playerHand[0]}. Dealer wins.`);
        updateScoreCard(scoreCard, 'dealer');
        // End loop
        break;
      } else {
        print('You chose to stay!'); // if player didn't bust, must have stayed to get here
      }

      // Dealer turn, hit or stay
      dealerTurn(dealerHand, deck, playerHand);

      // If dealer busts, player wins
      if (busted(dealerHand[0])) {
        // probably end the game? or ask the user to play again?
        print(`Dealer busted with ${dealerHand[0]}. Player wins!`);
        updateScoreCard(scoreCard, 'player');
        // End loop
        break;
      } else {
        print('Dealer chose to stay!'); // if player didn't bust, must have stayed to get here
      }

      // Compare cards and declare winner
      let gameResults = calculateWinner(playerHand[0], dealerHand[0]);
      updateScoreCard(scoreCard, gameResults.winner);
      displayWinner(gameResults);
      break;
    }

    matchWinner = someoneWonMatch(scoreCard);
    if (matchWinner !== false) break;
    print(`Current match score:\n${getMatchPointMessage(scoreCard)}`);
    let playAnotherGame = shouldContinue('game in the current match');
    if (['n', 'no'].includes(playAnotherGame)) break;
  }

  displayMatchResults(scoreCard, matchWinner);
  let playAnotherMatch = shouldContinue('match');
  if (['n', 'no'].includes(playAnotherMatch)) break;
}
