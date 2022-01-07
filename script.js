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

const makeTurn = function (e) {
  e.target.classList.add(`${currentPlayer.name}`);
  currentPlayer.positions.push(+e.target.dataset.position);

  checkWin();

  currentPlayer = currentPlayer.name === 'playerX' ? playerO : playerX;
};

const checkWin = function () {
  // winCombinations.forEach(combination =>
  //   combination.every(num => currentPlayer.positions.includes(num))
  // );
  for (const winCombination of winCombinations) {
    if (winCombination.every(num => currentPlayer.positions.includes(num))) {
      alert(`${currentPlayer.name} won!`);

      cells.forEach(cell => cell.removeEventListener('click', makeTurnы));

      break;
    }
  }
};

let currentPlayer = playerX;

cells.forEach(cell => cell.addEventListener('click', makeTurn, { once: true }));
