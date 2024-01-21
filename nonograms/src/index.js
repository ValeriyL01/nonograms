import './style.css';
import './index.html';
import {
  createSettingsButtons,
  selectFormLevels,
  selectFormImages,
  resetGame,
  solutionBtn,
} from './components/createSettingsButton';

import data from './components/matrix';

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
const arrCellMatrix = []; // матрица html элементов ячеек
// const correctСlickСounter = 0;
let selectValueLevels = selectFormLevels.value;
const selectValueImages = selectFormImages.value;

const createTopClues = (dataTop) => {
  for (let i = 0; i < 15; i += 1) {
    const cellTop = createElement('div', 'cell');
    cellTop.textContent = dataTop[0][1].topClues[i];
    topCluesWrapper.append(cellTop);
  }
};

const createLeftClues = (dataLeft) => {
  for (let i = 0; i < 15; i += 1) {
    const cellLeft = createElement('div', 'cell-left');
    playingFieldLeftWrapper.append(cellLeft);

    cellLeft.textContent = dataLeft[0][1].leftClues[i];
  }
};

// const resetGames = (level) => {
//   let cycleLength = 25;
//   if (level === 5) {
//     cycleLength = 5 * 5;
//   } else if (level === 10) {
//     cycleLength = 10 * 10;
//   } else if (level === 15) {
//     cycleLength = 15 * 15;
//   }

//   for (let i = 0; i < cycleLength; i += 1) {
//     arrCell[i].classList.remove('cell--activ');
//   }
// };

const showSolution = (dataMatrix, level) => {
  const matrixImage = dataMatrix[0][1];
  for (let i = 0; i < level; i += 1) {
    for (let j = 0; j < level; j += 1) {
      if (arrCellMatrix[i][j].classList.contains('cell--activ')) {
        arrCellMatrix[i][j].classList.remove('cell--activ');
      }
      if (matrixImage.matrix[i][j] === 1) {
        arrCellMatrix[i][j].classList.add('cell--activ');
      }
    }
  }
};

const game = (dataMatrix, level) => {
  const arrayFilledCells = [];
  const arrayGuessedCells = [];
  const arrayEmptyCells = [];
  const matrixImage = dataMatrix[0][1];
  for (let i = 0; i < level; i += 1) {
    arrCellMatrix[i] = [];
    for (let j = 0; j < level; j += 1) {
      const cell = createElement('div', 'cell');

      cell.textContent = '';
      playingFieldWrapper.append(cell);
      if (matrixImage.matrix[i][j] === 1) {
        arrayFilledCells.push(1);
      }
      arrCellMatrix[i][j] = cell;
      let isClick = false;
      let isClickEmptyCells = false;
      document.addEventListener('click', (event) => {
        if (event.target === cell) {
          cell.classList.toggle('cell--activ');
          // ---  алгоритм победы
          if (matrixImage.matrix[i][j] === 1) {
            if (!isClick) {
              arrayGuessedCells.push(1);
              isClick = true;
            } else {
              arrayGuessedCells.pop(1);
              isClick = false;
            }
          }
          if (matrixImage.matrix[i][j] === 0) {
            if (!isClickEmptyCells) {
              arrayEmptyCells.push(1);
              isClickEmptyCells = true;
            } else {
              arrayEmptyCells.pop(1);
              isClickEmptyCells = false;
            }
          }
        }
        if (arrayFilledCells.length === arrayGuessedCells.length && arrayEmptyCells.length === 0) {
          console.log('ура');
        }
        //-------
      });

      // клик правой кнопкой мыши
      let isRightClick = false;
      cell.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        if (!isRightClick) {
          cell.textContent = 'X';
          isRightClick = true;
        } else {
          cell.textContent = '';
          isRightClick = false;
        }
      });
      //--
    }
  }
  createTopClues(data);
  createLeftClues(data);
};

game(data, selectValueLevels);
playingFieldLeftCluesWrapper.append(playingFieldLeftWrapper, playingFieldWrapper);

// --выбор уровня игры
selectFormLevels.addEventListener('change', () => {
  selectValueLevels = selectFormLevels.value;

  playingFieldWrapper.classList.add('playing-field-wrapper10');
  topCluesWrapper.classList.add('top-clues-wrapper10');
  playingFieldLeftWrapper.classList.add('playing-field-left-wrapper10');
});
//--

// -- выбор картинки для игры
// selectFormImages.addEventListener('change', () => {
//   selectValueImages = selectFormImages.value;
//   console.log(selectValueImages);
// });
//--

// resetGame.addEventListener('click', () => {
//   resetGames();
// });

solutionBtn.addEventListener('click', () => {
  showSolution(data, selectValueLevels);
});
