/* eslint-disable no-loop-func */
import './style.css';
import './index.html';
import {
  createSettingsButtons,
  selectFormLevels,
  selectFormImages,
  resetGame,
  solutionBtn,
  randomGame,
  sound,
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
const resultsWrapper = createElement('div', 'results-wrapper');
const bestResults = createElement('h3', 'best-results');
body.append(gameContainer);
playingField.append(playingFieldContainer);
gameContainer.append(playingField, createSettingsButtons(), victoryWrapper, resultsWrapper);
victoryWrapper.append(victoryMessage);
playingFieldContainer.append(timerElement, timerTopCluesWrapper, playingFieldLeftCluesWrapper);
timerTopCluesWrapper.append(timerElement, topCluesWrapper);
resultsWrapper.append(bestResults);
timerElement.innerText = '00:00';
bestResults.innerText = 'Best results:';
let timer = 0;
let timerInterval;
let isVolume = true;
let isTimer = true;
const arrCellMatrix = []; // матрица html элементов ячеек
const arrCellTop = []; // массив html элементов подсказок сверху
const arrCellLeft = []; // массив html элементов подсказок слева
let arrayFilledCells = [];
let arrayGuessedCells = [];
let arrayEmptyCells = [];
const selectValueLevels = selectFormLevels.value;
let selectValueImages = selectFormImages.value;
let results;
const clickSound = new Audio('./assets/audio/click.wav');
const clickSound2 = new Audio('./assets/audio/click2.mp3');
const clickRightSound = new Audio('./assets/audio/click-right.mp3');
const victorySound = new Audio('./assets/audio/victory.mp3');
clickSound.volume = 0;
clickSound2.volume = 0;
clickRightSound.volume = 0;
victorySound.volume = 0;

const sortResult = () => {
  const times = [];
  for (let i = 0; i < results.length; i += 1) {
    const s = results[i].substring(results[i].indexOf(':') - 2, results[i].indexOf(':') + 3);
    const [min, sec] = s.split(':').map(Number);
    const totalTime = min * 60 + sec;
    times.push(totalTime);
  }

  results.sort((a, b) => {
    const indexA = results.indexOf(a);
    const indexB = results.indexOf(b);
    return times[indexA] - times[indexB];
  });
};

const arrResultElements = [];
const arrResultNumber = [];
const arrResultValue = [];

const createResultsElements = () => {
  for (let i = 0; i <= 4; i += 1) {
    const resultElement = createElement('div', 'results-element');
    const resultNumber = createElement('span', 'results-number');
    const resultValue = createElement('span', 'results-value');
    resultsWrapper.append(resultElement);
    resultElement.append(resultNumber, resultValue);
    resultNumber.innerText = `${i + 1}.`;
    resultValue.innerText = results[i];
    if (results[i] === undefined) {
      resultValue.innerText = '-------';
    }
    arrResultElements.push(resultElement);
    arrResultNumber.push(resultNumber);
    arrResultValue.push(resultValue);
  }
};
window.addEventListener('load', () => {
  results = JSON.parse(localStorage.getItem('best results')) || [];
  createResultsElements();
  console.log(results);
});

const updateBestResults = (valueImages) => {
  // Получить ранее сохраненный массив из localStorage
  results = JSON.parse(localStorage.getItem('best results')) || [];

  // Добавить текущий результат в массив
  results.push(`Template ${data[valueImages].name} for ${timerElement.innerHTML}`);

  // Сохранить обновленный массив в localStorage
  localStorage.setItem('best results', JSON.stringify(results));
  sortResult();
  console.log(results);
  for (let i = 0; i <= 4; i += 1) {
    arrResultNumber[i].innerText = `${i + 1}.`;
    arrResultValue[i].innerText = results[i];
    if (results[i] === undefined) {
      arrResultValue[i].innerText = '-------';
    }
  }
};
const unmuteSound = () => {
  if (isVolume) {
    clickSound.volume = 0.4;
    clickSound2.volume = 0.4;
    clickRightSound.volume = 0.4;
    victorySound.volume = 0.4;
    sound.innerText = 'sound off';
    isVolume = false;
  } else {
    clickSound.volume = 0;
    clickSound2.volume = 0;
    clickRightSound.volume = 0;
    victorySound.volume = 0;

    isVolume = true;
    sound.innerText = 'sound on';
  }
};
// -- таймер
let minutes = 0;
let seconds = 0;
function startTimer() {
  timerInterval = setInterval(() => {
    timer += 1;
    minutes = Math.floor(timer / 60)
      .toString()
      .padStart(2, '0');
    seconds = (timer % 60).toString().padStart(2, '0');
    timerElement.innerHTML = `${minutes}:${seconds}`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  minutes = 0;
  seconds = 0;
  timer = 0;
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
      arrCellMatrix[i][j].classList.remove('cell--active-cross');
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

let isResult = false;
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
              clickSound.play();
              isClick = true;
            } else {
              arrayGuessedCells.pop(1);
              clickSound2.play();
              isClick = false;
            }
          }
          if (matrixImage.matrix[i][j] === 0) {
            if (!isClickEmptyCells) {
              arrayEmptyCells.push(1);
              clickSound.play();
              isClickEmptyCells = true;
            } else {
              arrayEmptyCells.pop(1);
              clickSound2.play();
              isClickEmptyCells = false;
            }
          }
        }
        if (
          arrayFilledCells.length === arrayGuessedCells.length &&
          arrayEmptyCells.length === 0 &&
          arrayFilledCells.length !== 0 &&
          arrayGuessedCells.length !== 0
        ) {
          victoryMessage.textContent = `Great! You have solved the nonogram in ${timerElement.innerHTML} seconds!`;
          victorySound.play();

          if (!isResult) {
            updateBestResults(0);
            isResult = true;
          }
          isResult = false;
          stopTimer();
          arrayFilledCells = [];
          arrayGuessedCells = [];
          arrayEmptyCells = [];
        }
        //-------
      });

      // клик правой кнопкой мыши
      let isRightClick = false;
      cell.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        if (!isRightClick) {
          cell.classList.add('cell--active-cross');
          isRightClick = true;
        } else {
          cell.classList.remove('cell--active-cross');
          isRightClick = false;
        }
        clickRightSound.play();
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
let isRes = false;
const creatingMatrices = (dataMatrix, numberImages) => {
  let arrayFilledCells1 = [];
  let arrayGuessedCells1 = [];
  let arrayEmptyCells1 = [];

  const matrixImage = dataMatrix[numberImages];

  for (let i = 0; i < 5; i += 1) {
    for (let j = 0; j < 5; j += 1) {
      arrCellMatrix[i][j].classList.remove('cell--activ');
      arrCellMatrix[i][j].classList.remove('cell--active-cross');
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

        if (
          arrayFilledCells1.length === arrayGuessedCells1.length &&
          arrayEmptyCells1.length === 0 &&
          arrayFilledCells1.length !== 0 &&
          arrayGuessedCells1.length !== 0
        ) {
          victoryMessage.textContent = `Great! You have solved the nonogram in ${timerElement.innerHTML} seconds!`;
          victorySound.play();
          console.log(numberImages);
          stopTimer();
          if (!isRes) {
            updateBestResults(numberImages);

            isRes = true;
          }
          isRes = false;
          arrayFilledCells1 = [];
          arrayGuessedCells1 = [];
          arrayEmptyCells1 = [];
        }
        //-------
      });
    }
  }
};

// -- выбор картинки для игры
const selectionPictures = (valueImages) => {
  // -- изменение подсказок
  for (let i = 0; i < 15; i += 1) {
    arrCellTop[i].textContent = data[valueImages].topClues[i];
    arrCellLeft[i].textContent = data[valueImages].leftClues[i];
  }
  //---

  creatingMatrices(data, valueImages);
  resetGames(selectValueLevels);
};

const getRandomNum = () => {
  const randomNum = Math.floor(Math.random() * data.length);
  selectValueImages = randomNum;
  return randomNum;
};

selectFormImages.addEventListener('change', () => {
  selectValueImages = selectFormImages.value;
  selectionPictures(selectValueImages);
  playingFieldWrapper.addEventListener('click', startTimer, {once: isTimer}, () => {
    isTimer = false;
  });
});

resetGame.addEventListener('click', () => {
  resetGames(selectValueLevels);
  isTimer = true;
  playingFieldWrapper.addEventListener('click', startTimer, {once: isTimer}, () => {
    isTimer = false;
  });
});

solutionBtn.addEventListener('click', () => {
  showSolution(data, selectValueLevels);
});
randomGame.addEventListener('click', () => {
  selectionPictures(getRandomNum());
  playingFieldWrapper.addEventListener('click', startTimer, {once: isTimer}, () => {
    isTimer = false;
  });
});

sound.addEventListener('click', () => {
  unmuteSound();
});

playingFieldWrapper.addEventListener('click', startTimer, {once: isTimer}, () => {
  isTimer = false;
});
