'use strict';
// DOM elements
const cells = document.querySelectorAll('.game--cell');
const resultMessage = document.getElementById('game--result');
const playAgain = document.getElementById('game--play-again');

// Players
const playerX = {
  functionalName: 'playerX',
  displayName: 'You',
  positions: [],
};
const playerO = {
  functionalName: 'playerO',
  displayName: 'Computer',
  positions: [],
};

// Initial states
let currentPlayer = playerX,
  playing = true;

const winCombinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

const swtichPlayer = () =>
  (currentPlayer = currentPlayer === playerX ? playerO : playerX);

const processTurn = function (elem, pos) {
  elem.classList.add(`${currentPlayer.functionalName}`, 'checked');

  currentPlayer.positions.push(pos);

  elem.removeEventListener('click', userTurn);
};

const userTurn = function () {
  processTurn(this, +this.dataset.position);

  checkWin();

  if (playing) {
    swtichPlayer();
    computerTurn();
  }
};

const computerTurn = function () {
  let cell, randomPosition;

  const chooseRandomCell = function () {
    randomPosition = Math.floor(Math.random() * 9) + 1;

    cell = document.querySelector(
      `.game--cell[data-position='${randomPosition}']`
    );

    if (cell.classList.contains('checked') && playing) chooseRandomCell();
  };
  chooseRandomCell();

  processTurn(cell, randomPosition);

  checkWin();

  swtichPlayer();
};

const checkWin = function () {
  for (const winCombination of winCombinations) {
    if (winCombination.every(num => currentPlayer.positions.includes(num))) {
      resultMessage.textContent = `${currentPlayer.displayName} won!`;

      cells.forEach(cell => cell.removeEventListener('click', userTurn));

      gameOver();

      break;
    }
  }

  if (
    Array.from(cells).every(cell => cell.classList.contains('checked')) &&
    playing
  ) {
    resultMessage.textContent = "It's a draw!";

    gameOver();
  }
};

const gameOver = () => {
  playing = false;
  playAgain.style.display = 'inline';
};

const startNewGame = function () {
  playing = true;
  playerX.positions = [];
  playerO.positions = [];
  resultMessage.textContent = '';
  playAgain.style.display = 'none';

  cells.forEach(cell => {
    cell.classList.remove('playerX', 'playerO', 'checked');
    cell.addEventListener('click', userTurn);
  });
};

cells.forEach(cell => cell.addEventListener('click', userTurn));
playAgain.addEventListener('click', startNewGame);
