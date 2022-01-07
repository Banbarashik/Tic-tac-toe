'use strict';
// DOM elements
const cells = document.querySelectorAll('.game--cell');

const playerX = {
  name: 'playerX',
  positions: [],
};
const playerO = {
  name: 'playerO',
  positions: [],
};

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

let currentPlayer = playerX,
  playing = true;

const makeTurn = function (e) {
  e.target.classList.add(`${currentPlayer.name}`, 'checked');

  currentPlayer.positions.push(+e.target.dataset.position);

  // disable the cell after it's checked
  e.target.removeEventListener('click', makeTurn);

  checkWin();

  if (playing) {
    currentPlayer = playerO;
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

  cell.classList.add(`${currentPlayer.name}`, 'checked');

  currentPlayer.positions.push(randomPosition);

  // disable the cell after it's checked
  cell.removeEventListener('click', makeTurn);

  checkWin();

  currentPlayer = playerX;
};

const checkWin = function () {
  console.log(playerX.positions);
  console.log(playerO.positions);
  for (const winCombination of winCombinations) {
    if (winCombination.every(num => currentPlayer.positions.includes(num))) {
      alert(`${currentPlayer.name} won!`);

      // disable all cells after the game end
      cells.forEach(cell => cell.removeEventListener('click', makeTurn));

      playing = false;

      break;
    }
  }
  if (
    Array.from(cells).every(cell => cell.classList.contains('checked')) &&
    playing
  ) {
    alert("It's a draw!");

    playing = false;
  }
};

cells.forEach(cell => cell.addEventListener('click', makeTurn));
