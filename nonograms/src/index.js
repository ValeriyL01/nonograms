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
const victoryWrapper = createElement('div', 'victory-wrapper');
const victoryMessage = createElement('span', 'victory-message');

const playingField = createElement('div', 'playing-field');
const playingFieldContainer = createElement('div', 'playing-field-container');
const topCluesWrapper = createElement('div', 'top-clues-wrapper');
const timerElement = createElement('div', 'timer');
const playingFieldLeftCluesWrapper = createElement('div', 'playing-field-left-clues-wrapper');
const playingFieldWrapper = createElement('div', 'playing-field-wrapper');
const playingFieldLeftWrapper = createElement('div', 'playing-field-left-wrapper');
const timerTopCluesWrapper = createElement('div', 'timer-top-clues-wrapper');

body.append(gameContainer);
playingField.append(playingFieldContainer);
gameContainer.append(playingField, createSettingsButtons(), victoryWrapper);
victoryWrapper.append(victoryMessage);
playingFieldContainer.append(timerElement, timerTopCluesWrapper, playingFieldLeftCluesWrapper);
timerTopCluesWrapper.append(timerElement, topCluesWrapper);

timerElement.innerHTML = '00:00';
let timer = 0;
let timerInterval;
const arrCellMatrix = []; // матрица html элементов ячеек
const arrCellTop = []; // массив html элементов подсказок сверху
const arrCellLeft = []; // массив html элементов подсказок слева
const selectValueLevels = selectFormLevels.value;
let selectValueImages = selectFormImages.value;

// -- таймер
function startTimer() {
  timerInterval = setInterval(() => {
    timer += 1;
    const minutes = Math.floor(timer / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (timer % 60).toString().padStart(2, '0');
    timerElement.innerHTML = `${minutes}:${seconds}`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}
//-----

const createTopClues = (dataTop) => {
  for (let i = 0; i < 15; i += 1) {
    const cellTop = createElement('div', 'cell');
    cellTop.textContent = dataTop[0].topClues[i];
    topCluesWrapper.append(cellTop);
    arrCellTop.push(cellTop);
  }
};

const createLeftClues = (dataLeft) => {
  for (let i = 0; i < 15; i += 1) {
    const cellLeft = createElement('div', 'cell-left');
    playingFieldLeftWrapper.append(cellLeft);
    cellLeft.textContent = dataLeft[0].leftClues[i];
    arrCellLeft.push(cellLeft);
  }
};

const resetGames = (level) => {
  for (let i = 0; i < level; i += 1) {
    for (let j = 0; j < level; j += 1) {
      arrCellMatrix[i][j].classList.remove('cell--activ');
      arrCellMatrix[i][j].textContent = '';
    }
  }
  timerElement.innerHTML = '00:00';
  victoryMessage.textContent = '';
  stopTimer();
};

const showSolution = (dataMatrix, level) => {
  const matrixImage = dataMatrix[selectValueImages];
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
const arrayFilledCells = [];
const arrayGuessedCells = [];
const arrayEmptyCells = [];
const game = (dataMatrix, level) => {
  const matrixImage = dataMatrix[0];
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
      playingFieldWrapper.addEventListener('click', (event) => {
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
          victoryMessage.textContent = `Great! You have solved the nonogram in ${timerElement.innerHTML} seconds!`;
          console.log(`Great! You have solved the nonogram in ${timerElement.innerHTML} seconds!`);
          stopTimer();
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
// selectFormLevels.addEventListener('change', () => {
//   selectValueLevels = selectFormLevels.value;

//   playingFieldWrapper.classList.add('playing-field-wrapper10');
//   topCluesWrapper.classList.add('top-clues-wrapper10');
//   playingFieldLeftWrapper.classList.add('playing-field-left-wrapper10');
// });
//--

// алгоритм отрисовки матриц и победы
const creatingMatrices = (dataMatrix) => {
  const arrayFilledCells1 = [];
  const arrayGuessedCells1 = [];
  const arrayEmptyCells1 = [];

  const matrixImage = dataMatrix[selectValueImages];
  for (let i = 0; i < 5; i += 1) {
    for (let j = 0; j < 5; j += 1) {
      arrCellMatrix[i][j].classList.remove('cell--activ');
      if (matrixImage.matrix[i][j] === 1) {
        arrayFilledCells1.push(1);
      }
      //  arrCellMatrix[i][j].textContent = matrixImage.matrix[i][j];
      let isClick = false;
      let isClickEmptyCells = false;
      playingFieldWrapper.addEventListener('click', (event) => {
        if (event.target === arrCellMatrix[i][j]) {
          // ---  алгоритм победы
          if (matrixImage.matrix[i][j] === 1) {
            if (!isClick) {
              arrayGuessedCells1.push(1);
              isClick = true;
            } else {
              arrayGuessedCells1.pop(1);
              isClick = false;
            }
          }
          if (matrixImage.matrix[i][j] === 0) {
            if (!isClickEmptyCells) {
              arrayEmptyCells1.push(1);

              isClickEmptyCells = true;
            } else {
              arrayEmptyCells1.pop(1);
              isClickEmptyCells = false;
            }
          }
        }

        if (arrayFilledCells1.length === arrayGuessedCells1.length && arrayEmptyCells1.length === 0) {
          victoryMessage.textContent = `Great! You have solved the nonogram in ${timerElement.innerHTML} seconds!`;
          console.log(`Great! You have solved the nonogram in ${timerElement.innerHTML} seconds!`);
          stopTimer();
        }
        //-------
      });
    }
  }
};

// -- выбор картинки для игры
const selectionPictures = (ValueImages) => {
  let lengthCycle = 15;

  if (ValueImages >= 0 && ValueImages <= 4) {
    lengthCycle = 15;
  } else if (ValueImages >= 5 && ValueImages <= 9) {
    lengthCycle = 30;
  } else if (ValueImages >= 10 && ValueImages <= 14) {
    lengthCycle = 45;
  }
  // -- изменение подсказок
  for (let i = 0; i < lengthCycle; i += 1) {
    arrCellTop[i].textContent = data[selectValueImages].topClues[i];
    arrCellLeft[i].textContent = data[selectValueImages].leftClues[i];
  }
  //---
  creatingMatrices(data);
  resetGames(selectValueLevels);
};

selectFormImages.addEventListener('change', () => {
  selectValueImages = selectFormImages.value;
  selectionPictures(selectValueImages);
});

resetGame.addEventListener('click', () => {
  resetGames(selectValueLevels);
});

solutionBtn.addEventListener('click', () => {
  showSolution(data, selectValueLevels);
});

playingFieldWrapper.addEventListener('click', startTimer, {once: true});
