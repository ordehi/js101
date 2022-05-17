# Twenty-one

## Implementation Steps

1. Initialize deck
2. Deal cards to player and dealer
3. Player turn: hit or stay
   - repeat until bust or stay
4. If player bust, dealer wins.
5. Dealer turn: hit or stay
   - repeat until total >= 17
6. If dealer busts, player wins.
7. Compare cards and declare winner.

## Data Structure

An object, the properties of which are the names of the suits:

Hearts
Diamonds
Clubs
Spades

The values of each properties will be arrays containing each of the possible 13 card values:

2, 3, 4, 5, 6, 7, 8, 9, 10, Jack (10), Queen (10), King (10), Ace (1 or 11)

To select a card randomly, a function will first pick a random suit, then from that suit, pick a random value.
