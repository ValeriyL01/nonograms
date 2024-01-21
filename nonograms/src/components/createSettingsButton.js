const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.classList.add(className);
  return element;
};
let selectFormLevels;
let selectFormImages;
let resetGame;
let solutionBtn;
const createSettingsButtons = () => {
  const settings = createElement('div', 'settings');
  resetGame = createElement('button', 'settings__reset');
  solutionBtn = createElement('button', 'settings__solution');
  const continueLastGame = createElement('button', 'settings__continue-last-game');
  const randomGame = createElement('button', 'settings__random-game');
  const themeGame = createElement('button', 'settings__theme');

  resetGame.innerText = 'reset';
  solutionBtn.innerText = 'solution';
  continueLastGame.innerText = 'continue last game';
  randomGame.innerText = 'random game';
  themeGame.innerText = 'theme';
  // выбор размера игрового поля
  const levelsForm = createElement('form', 'settings__form');
  const labelFormLevels = createElement('label', 'settings__form-label');
  selectFormLevels = createElement('select', 'settings__form-select');
  const optionFormLevels1 = createElement('option', 'settings__form-option');
  const optionFormLevels2 = createElement('option', 'settings__form-option');
  const optionFormLevels3 = createElement('option', 'settings__form-option');
  labelFormLevels.setAttribute('for', 'levels');
  selectFormLevels.setAttribute('name', 'levels');
  labelFormLevels.innerText = 'levels';
  selectFormLevels.value = '5';
  optionFormLevels1.value = '5';
  optionFormLevels1.innerText = '5x5';
  optionFormLevels2.value = '10';
  optionFormLevels2.innerText = '10x10';
  optionFormLevels3.value = '15';
  optionFormLevels3.innerText = '15x15';
  selectFormLevels.append(optionFormLevels1, optionFormLevels2, optionFormLevels3);
  //--
  // выбор картинки для игры
  const labelFormImages = createElement('label', 'settings__form-label');
  selectFormImages = createElement('select', 'settings__form-select');
  let optionFormImage;
  labelFormImages.setAttribute('for', 'images');
  selectFormImages.setAttribute('name', 'images');
  labelFormImages.innerText = 'templates';
  selectFormImages.value = '0';
  let countValue = 0;
  const nameImages = [
    'snake(5x5)',
    'cross(5x5)',
    'sharp(5x5)',
    'shess(5x5)',
    'snowflake(5x5)',
    'home(10x10)',
    'ggg',
    'gggg',
    'ggggg',
    'jj',
  ];
  for (let i = 0; i <= 9; i += 1) {
    optionFormImage = createElement('option', 'settings__form-option');

    optionFormImage.value = countValue;
    countValue += 1;
    optionFormImage.innerText = nameImages[i];
    selectFormImages.append(optionFormImage);
  }
  //--

  levelsForm.append(labelFormLevels, selectFormLevels, labelFormImages, selectFormImages);
  settings.append(resetGame, solutionBtn, continueLastGame, randomGame, themeGame, levelsForm);
  return settings;
};
export {createSettingsButtons, selectFormLevels, selectFormImages, resetGame, solutionBtn};
