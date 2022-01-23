# Rock Paper Scissors

In this assignment, we'll build a Rock Paper Scissors game. Rock Paper Scissors is a simple game played between two opponents. Both the opponents choose an item from rock, paper, and scissors. The winner is decided according to the following rules:

If player a chooses rock and player b chooses scissors, player a wins.
If player a chooses paper and player b chooses rock, player a wins.
If player a chooses scissors and player b chooses paper, player a wins.
If both players choose the same item, neither player wins. It's a tie.
Our version of the game lets the user play against the computer. The game flow should go like this:

The user makes a choice.
The computer makes a choice.
The winner is displayed.

## Problem statement

### Create a RPS scissors game with these rules

Rock beats Scissors
Scissors beats Paper
Paper beats Rock

## Expected Input and Output

### Input:

### Output:

## Explicit Requirements

The user can choose, the choice is stored
The computer chooses, the choice is stored
The choices are compared
The winner is displayed

## Implicit Requirements

The game can be started
The game can re restarted
A switch statement or other conditional holds the comparisons

## Mental Model

- The game will be played on the console. We'll use readline-sync to ask for the player's choice and store that in a variable.
- We'll run a Math.random for the computer's choice that will give results from 1-3 for 1: R, 2: P, 3: S.
- A switch statement or conditional holds the comparisons R > S, S > P, P > R

## Edge Cases

- Input must be validated so that only 1-3 is accepted, the user is asked to enter a valid number otherwise. The user can also enter R, P, or S in place of 1, 2, and 3.

## Data Structure

- require readline-sync and make a prompt fn from it
- the game's lifecycle is on a loop that stops when the player says they no longer want to play
- a variable holds the player's choice
- player input is validated, must be 1, 2, 3, or R, P, S.
- an error is shown if input is not valid and the player can input again (loop)
- once the player makes their choice, a routine runs for the computer's choice (Math.random), the result is stored in a variable
- the choices are compared
- the winner is displayed
- if the same is chosen, they can go again
- the user is asked if they want to continue
- if they do, the game restarts
- if they don't the game ends (program closes)

## Algorithm

START

SET playerChoice = null
SET computerChoice = null

WHILE true

- GET playerChoice = prompt('Enter your choice. Rock: r or 1, Paper: p or 2, Scissors: s or 3)
  - IF playerChoice is not 1-3 or r, p, or s
    - GET playerChoice = prompt('Incorrect choice, you entered playerChoice, but you must choose r or 1 for Rock, p or 2 for Paper, s or 3 for Scissors)
  - IF playerChoice is r, p, or s playerChoice = 1, 2 or 3
- GET computerChoice = Math.floor(Math.random() \* 3) + 1
- IF playerChoice == computerChoice
  - PRINT draw, choose again
- IF playerChoice > computerChoice
  - PRINT player wins
- ELSE
  - PRINT computer wins
- GET goAGain = prompt('want to play again?')
- IF goAGain != yes
  - BREAK

END
