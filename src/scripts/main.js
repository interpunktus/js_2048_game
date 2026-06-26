'use strict';

// Uncomment the next lines to use your game instance in the browser
const Game = require('../modules/Game.class');
const game = new Game();

const scoreElement = document.querySelector('.game-score');
const cells = document.querySelectorAll('.field-cell');
const startButton = document.querySelector('.button.start');
const messageStart = document.querySelector('.message-start');
const messageWin = document.querySelector('.message-win');
const messageLose = document.querySelector('.message-lose');

function render() {
  const state = game.getState();

  scoreElement.textContent = game.getScore();

  state.flat().forEach((value, index) => {
    const cell = cells[index];

    cell.className = 'field-cell';
    cell.textContent = '';

    if (value !== 0) {
      cell.classList.add(`field-cell--${value}`);
      cell.textContent = value;
    }
  });

  const gameStatus = game.getStatus();

  messageWin.classList.add('hidden');
  messageLose.classList.add('hidden');

  if (gameStatus !== 'idle') {
    messageStart.classList.add('hidden');
  } else {
    messageStart.classList.remove('hidden');
  }
}

startButton.addEventListener('click', () => {
  if (game.getStatus() === 'idle') {
    game.start();

    startButton.textContent = 'Restart';
    startButton.classList.remove('start');
    startButton.classList.add('restart');

    messageStart.classList.add('hidden');
  } else {
    game.restart();

    startButton.textContent = 'Start';
    startButton.classList.remove('restart');
    startButton.classList.add('start');

    messageStart.classList.remove('hidden');
  }

  render();
});

document.addEventListener('keydown', (e) => {
  let moved = false;

  switch (e.key) {
    case 'ArrowLeft':
      moved = game.moveLeft();
      break;

    case 'ArrowRight':
      moved = game.moveRight();
      break;

    case 'ArrowUp':
      moved = game.moveUp();
      break;

    case 'ArrowDown':
      moved = game.moveDown();
      break;
  }

  if (moved) {
    render();
  }
});

// first render
render();
