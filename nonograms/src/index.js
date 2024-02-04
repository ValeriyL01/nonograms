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
  saveGame,
  continueLastGame,
  themeGame,
} from './components/createSettingsButton';

import data from './components/matrix';

const html = document.querySelector('html');
const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.classList.add(className);
  return element;
};
const body = document.querySelector('body');
const gameContainer = createElement('div', 'container');
const victoryWrapper = createElement('div', 'victory-wrapper');
const victoryMessage = createElement('h3', 'victory-message');
const selectedTemplate = createElement('div', 'selected-template');
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
gameContainer.append(playingField, selectedTemplate, createSettingsButtons(), victoryWrapper, resultsWrapper);
victoryWrapper.append(victoryMessage);
playingFieldContainer.append(timerElement, timerTopCluesWrapper, playingFieldLeftCluesWrapper);
timerTopCluesWrapper.append(timerElement, topCluesWrapper);
resultsWrapper.append(bestResults);

let timer = 0;
let minutes = 0;
let seconds = 0;
let timerInterval;
let isVolume = true;
let isTimer = true;
let isSaveGame = false;
let isResult = false;
const arrCellMatrix = []; // матрица html элементов ячеек
const arrCellTop = []; // массив html элементов подсказок сверху
const arrCellLeft = []; // массив html элементов подсказок слева
let arrayGuessedCells = [];
let arrayEmptyCells = [];
let arrClicks = [];
let arrRightClicks = [];
const arrResultElements = [];
const arrResultNumber = [];
const arrResultValue = [];
const selectValueLevels = selectFormLevels.value;
let selectValueImages = selectFormImages.value;

let results;
timerElement.innerText = '00:00';
bestResults.innerText = 'Best results:';
selectedTemplate.innerText = 'snake(5x5)';
const clickSound = new Audio('./assets/audio/click.wav');
const clickSound2 = new Audio('./assets/audio/click2.mp3');
const clickRightSound = new Audio('./assets/audio/click-right.mp3');
const victorySound = new Audio('./assets/audio/victory.mp3');
const clickSettingsSound = new Audio('./assets/audio/click-settings.mp3');
const sounds = [clickSound, clickSound2, clickRightSound, victorySound, clickSettingsSound];

sounds.forEach((sound) => (sound.volume = 0));

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
      resultValue.innerText = '--------------------------------------';
    }
    arrResultElements.push(resultElement);
    arrResultNumber.push(resultNumber);
    arrResultValue.push(resultValue);
  }
};
window.addEventListener('load', () => {
  results = JSON.parse(localStorage.getItem('best results')) || [];
  sortResult();
  createResultsElements();
});
const saveGameLocalStorage = () => {
  localStorage.setItem('game', JSON.stringify(selectValueImages));
  localStorage.setItem('clicks', JSON.stringify(arrClicks));
  localStorage.setItem('rightClicks', JSON.stringify(arrRightClicks));
  localStorage.setItem('arrayGuessedCells', JSON.stringify(arrayGuessedCells));
  localStorage.setItem('arrayEmptyCells', JSON.stringify(arrayEmptyCells));
};
const checkingСlicks = () => {
  const clicks = JSON.parse(localStorage.getItem('clicks'));
  if (clicks !== null && clicks.length > 0) {
    continueLastGame.disabled = false;
  }
};
checkingСlicks();
const updateBestResults = (valueImages) => {
  // Получить ранее сохраненный массив из localStorage
  results = JSON.parse(localStorage.getItem('best results')) || [];

  if (results.length >= 5) {
    results.shift();
  }
  // Добавить текущий результат в массив
  results.push(`Template ${data[valueImages].name} in ${timerElement.innerHTML} seconds.`);

  // Сохранить обновленный массив в localStorage

  localStorage.setItem('best results', JSON.stringify(results));
  sortResult();
  for (let i = 0; i <= 4; i += 1) {
    arrResultNumber[i].innerText = `${i + 1}.`;
    arrResultValue[i].innerText = results[i];
    if (results[i] === undefined) {
      arrResultValue[i].innerText = '--------------------------------------';
    }
  }
};
const unmuteSound = () => {
  if (isVolume) {
    sounds.forEach((sound) => (sound.volume = 0.4));
    sound.innerText = 'sound off';
    isVolume = false;
  } else {
    sounds.forEach((sound) => (sound.volume = 0));
    isVolume = true;
    sound.innerText = 'sound on';
  }
};
// -- таймер

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
  arrayGuessedCells = [];
  arrayEmptyCells = [];
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

const game = (dataMatrix, level) => {
  const matrixImage = dataMatrix[0];
  for (let i = 0; i < level; i += 1) {
    arrCellMatrix[i] = [];
    for (let j = 0; j < level; j += 1) {
      const cell = createElement('div', 'cell');

      cell.textContent = '';
      playingFieldWrapper.append(cell);
      arrCellMatrix[i][j] = cell;

      playingFieldWrapper.addEventListener('click', (event) => {
        isSaveGame = true;
        if (event.target === cell) {
          cell.classList.toggle('cell--activ');

          if (cell.classList.contains('cell--activ')) {
            clickSound.play();
            arrClicks.push([i, j]);
            // ---  алгоритм победы
            if (matrixImage.matrix[i][j] === 1) {
              arrayGuessedCells.push(1);
            }
            if (matrixImage.matrix[i][j] === 0) {
              arrayEmptyCells.push(1);
            }
          } else {
            clickSound2.play();
            arrClicks.pop([i, j]);
            if (matrixImage.matrix[i][j] === 0) {
              arrayGuessedCells.pop(1);
            }
            if (matrixImage.matrix[i][j] === 0) {
              arrayEmptyCells.pop(1);
            }
          }
        }
        if (
          matrixImage.units === arrayGuessedCells.length &&
          arrayEmptyCells.length === 0 &&
          arrayGuessedCells.length !== 0
        ) {
          victoryMessage.textContent = `Great! You have solved the nonogram in ${timerElement.innerHTML} seconds!`;
          victoryMessage.classList.add('victory-message--open');
          playingFieldWrapper.classList.add('playing-field-wrapper--blocked');
          victorySound.play();
          arrClicks = [];
          arrRightClicks = [];
          if (!isResult) {
            updateBestResults(0);

            isResult = true;
          }
          isResult = false;
          stopTimer();
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
          arrRightClicks.push([i, j]);
          isRightClick = true;
        } else {
          cell.classList.remove('cell--active-cross');
          arrRightClicks.pop([i, j]);
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

// алгоритм отрисовки матриц и победы
let isRes = false;
const creatingMatrices = (dataMatrix, numberImages) => {
  let arrayGuessedCells1 = [];
  let arrayEmptyCells1 = [];

  const matrixImage = dataMatrix[numberImages];

  for (let i = 0; i < 5; i += 1) {
    for (let j = 0; j < 5; j += 1) {
      arrCellMatrix[i][j].classList.remove('cell--activ');
      arrCellMatrix[i][j].classList.remove('cell--active-cross');

      playingFieldWrapper.addEventListener('click', (event) => {
        isSaveGame = true;
        if (event.target === arrCellMatrix[i][j]) {
          // ---  алгоритм победы
          if (matrixImage.matrix[i][j] === 1) {
            if (arrCellMatrix[i][j].classList.contains('cell--activ')) {
              arrayGuessedCells1.push(1);
            } else {
              arrayGuessedCells1.pop(1);
            }
          }
          if (matrixImage.matrix[i][j] === 0) {
            if (arrCellMatrix[i][j].classList.contains('cell--activ')) {
              arrayEmptyCells1.push(1);
            } else {
              arrayEmptyCells1.pop(1);
            }
          }
        }

        resetGame.addEventListener('click', () => {
          arrayGuessedCells1 = [];
          arrayEmptyCells1 = [];
        });
        if (
          matrixImage.units === arrayGuessedCells1.length &&
          arrayEmptyCells1.length === 0 &&
          arrayGuessedCells1.length !== 0
        ) {
          victoryMessage.textContent = `Great! You have solved the nonogram in ${timerElement.innerHTML} seconds!`;
          victorySound.play();
          victoryMessage.classList.add('victory-message--open');
          playingFieldWrapper.classList.add('playing-field-wrapper--blocked');
          arrayGuessedCells1 = [];
          arrayEmptyCells1 = [];
          arrClicks = [];
          arrRightClicks = [];
          stopTimer();
          if (!isRes) {
            updateBestResults(numberImages);

            isRes = true;
          }
          isRes = false;
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
  selectedTemplate.innerText = data[valueImages].name; // название шаблона
  creatingMatrices(data, valueImages);
  resetGames(selectValueLevels);
};
const loadSavedGame = () => {
  selectValueImages = JSON.parse(localStorage.getItem('game'));
  selectionPictures(selectValueImages);
  for (const click of JSON.parse(localStorage.getItem('clicks'))) {
    arrCellMatrix[click[0]][click[1]].classList.add('cell--activ');
  }
  for (const rightClick of JSON.parse(localStorage.getItem('rightClicks'))) {
    arrCellMatrix[rightClick[0]][rightClick[1]].classList.add('cell--active-cross');
  }
  arrayGuessedCells = JSON.parse(localStorage.getItem('arrayGuessedCells'));
  arrayEmptyCells = JSON.parse(localStorage.getItem('arrayEmptyCells'));
};
const changeTheme = () => {
  if (html.classList.contains('theme')) {
    html.classList.remove('theme');
    themeGame.innerText = 'dark theme';
  } else {
    html.classList.add('theme');
    themeGame.innerText = 'light theme';
  }
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
  arrClicks = [];
  arrRightClicks = [];
  clickSettingsSound.play();
  playingFieldWrapper.classList.remove('playing-field-wrapper--blocked');
});

resetGame.addEventListener('click', () => {
  resetGames(selectValueLevels);
  isTimer = true;
  playingFieldWrapper.addEventListener('click', startTimer, {once: isTimer}, () => {
    isTimer = false;
  });
  clickSettingsSound.play();
  playingFieldWrapper.classList.remove('playing-field-wrapper--blocked');
});

solutionBtn.addEventListener('click', () => {
  showSolution(data, selectValueLevels);
  clickSettingsSound.play();
});

randomGame.addEventListener('click', () => {
  selectionPictures(getRandomNum());
  playingFieldWrapper.addEventListener('click', startTimer, {once: isTimer}, () => {
    isTimer = false;
  });
  clickSettingsSound.play();
  arrClicks = [];
  arrRightClicks = [];
  playingFieldWrapper.classList.remove('playing-field-wrapper--blocked');
});

sound.addEventListener('click', () => {
  unmuteSound();
  clickSettingsSound.play();
});

playingFieldWrapper.addEventListener('click', startTimer, {once: isTimer}, () => {
  isTimer = false;
});

saveGame.addEventListener('click', () => {
  if (isSaveGame) {
    continueLastGame.disabled = false;
    localStorage.removeItem('clicks');
    saveGameLocalStorage();
    arrClicks = [];
    arrRightClicks = [];
    arrayGuessedCells = [];
    arrayEmptyCells = [];
    isSaveGame = false;
  }
  clickSettingsSound.play();
});

continueLastGame.addEventListener('click', () => {
  playingFieldWrapper.classList.remove('playing-field-wrapper--blocked');
  clickSettingsSound.play();
  loadSavedGame();
});

themeGame.addEventListener('click', () => {
  clickSettingsSound.play();
  changeTheme();
});
