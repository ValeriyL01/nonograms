import './style.css';
import './index.html';
import {createSettingsButtons, selectFormLevels} from './components/createSettingsButton';

import data from './components/matrix';

console.log(data[0].matrix);
const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.classList.add(className);
  return element;
};
const body = document.querySelector('body');
const gameContainer = createElement('div', 'container');
body.append(gameContainer);
const playingField = createElement('div', 'playing-field');
const topCluesWrapper = createElement('div', 'top-clues-wrapper');
const playingFieldLeftCluesWrapper = createElement('div', 'playing-field-left-clues-wrapper');
const playingFieldWrapper = createElement('div', 'playing-field-wrapper');
const playingFieldLeftWrapper = createElement('div', 'playing-field-left-wrapper');
gameContainer.append(playingField, createSettingsButtons());
playingField.append(topCluesWrapper, playingFieldLeftCluesWrapper);

const createTopClues = (dataTop) => {
  for (let i = 0; i < 15; i += 1) {
    const cellTop = createElement('div', 'cell');
    cellTop.textContent = dataTop[i];
    topCluesWrapper.append(cellTop);
  }
};

const createLeftClues = (dataLeft) => {
  for (let i = 0; i < 15; i += 1) {
    const cellLeft = createElement('div', 'cell-left');
    playingFieldLeftWrapper.append(cellLeft);

    cellLeft.textContent = dataLeft[i];
  }
};
createTopClues(data[0][1].topClues);
createLeftClues(data[0][1].leftClues);

const game = (matrix, level) => {
  for (let i = 0; i < level; i += 1) {
    for (let j = 0; j < level; j += 1) {
      const cell = createElement('div', 'cell');

      cell.textContent = '';
      playingFieldWrapper.append(cell);
      if (matrix[i][j] === 1) {
        cell.classList.add('cell-black');
      }
      document.addEventListener('click', (event) => {
        if (event.target === cell) {
          cell.classList.add('cell-black');
        }
      });
    }
  }
};

let selectValue = selectFormLevels.value;
game(data[0][1].matrix, selectValue);
playingFieldLeftCluesWrapper.append(playingFieldLeftWrapper, playingFieldWrapper);
selectFormLevels.addEventListener('change', () => {
  selectValue = selectFormLevels.value;
  console.log(selectValue);
});
