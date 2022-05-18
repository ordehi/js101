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

A nested array where each array element is itself a 2-element array that represents the card's suit and the card's value.

```js
[
  ['H', '2'],
  ['S', 'J'],
  ['D', 'A'],
];
```

Both elements in each array will be strings, so no need to worry about whether you get a string or integer.

## Calculating Aces

If totalPlayerCardValue >= 10;
ace = 11
else
ace = 1

## Player Turn

- Ask player to hit or stay.
- If stay, stop asking.
- Otherwise, go to #1.

## Shuffle Cards

One good algorithm for shuffling an array is the [Fisher–Yates shuffle](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle), which looks like the following in JavaScript:

```js
function shuffle(array) {
  for (let index = array.length - 1; index > 0; index--) {
    let otherIndex = Math.floor(Math.random() * (index + 1)); // 0 to index
    [array[index], array[otherIndex]] = [array[otherIndex], array[index]]; // swap elements
  }
}
```

## Dealer Turn
