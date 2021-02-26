'use strict';

//variables for selectors
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const scorePl0 = document.getElementById('score--0');
const scorePl1 = document.getElementById('score--1');
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');
const btnNewGame = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const diceEl = document.querySelector('.dice');

//game variables and functions

let scores, currentScore, activePlayer, isGameOn;

const setNewGame = () => {
  scores = [0, 0];
  currentScore = 0;
  isGameOn = true;
  activePlayer = 0;
  scorePl0.textContent = 0;
  scorePl1.textContent = 0;
  diceEl.classList.add('hidden');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player0.classList.remove('player--winner', 'name');
  player1.classList.remove('player--winner', 'name');
};

const switchPlayer = () => {
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

//adds current score to score for active player and switch between players
const holdScore = () => {
  if (isGameOn) {
    //setting scores after hold
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    currentScore = 0;
    document.getElementById(
      `current--${activePlayer}`
    ).textContent = currentScore;
    //switch player after hold
    if (scores[activePlayer] < 100) {
      switchPlayer();
      //player wins after hold
    } else {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner', 'name');
      isGameOn = false;
      diceEl.classList.add('hidden');
    }
  }
};

//roll the dice, after 1 -> wipe score anfd switch players
const diceRoll = () => {
  if (isGameOn) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');
    //dice roll is not 1 - add to current score
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
      //after 1 - wipe current score and switch between active players
    } else {
      currentScore = 0;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
      switchPlayer();
    }
  }
};

setNewGame();

//listeners for playing game -roll, hold, new game

//roll the dice
btnRoll.addEventListener('click', diceRoll);

//after click puts current score to score for active player and switch between players
btnHold.addEventListener('click', holdScore);

//start new game
btnNewGame.addEventListener('click', setNewGame);
