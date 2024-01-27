const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.classList.add(className);
  return element;
};
let selectFormLevels;
let selectFormImages;
let resetGame;
let solutionBtn;
let randomGame;
let sound;
let optionFormImage;
let saveGame;
let continueLastGame;
let themeGame;
const createSettingsButtons = () => {
  const settings = createElement('div', 'settings');
  const settingsButtonWrapper = createElement('div', 'settings-button-wrapper');
  resetGame = createElement('button', 'settings__reset');
  resetGame.classList.add('button');
  solutionBtn = createElement('button', 'settings__solution');
  solutionBtn.classList.add('button');
  continueLastGame = createElement('button', 'settings__continue-last-game');
  continueLastGame.classList.add('button');
  randomGame = createElement('button', 'settings__random-game');
  randomGame.classList.add('button');
  themeGame = createElement('button', 'settings__theme');
  themeGame.classList.add('button');
  saveGame = createElement('button', 'settings__save');
  saveGame.classList.add('button');
  resetGame.innerText = 'reset';
  sound = createElement('button', 'settings__sound');
  sound.classList.add('button');
  sound.innerText = 'sound on';
  solutionBtn.innerText = 'solution';
  continueLastGame.innerText = 'continue last game';
  continueLastGame.setAttribute('disabled', 'true');
  randomGame.innerText = 'random game';
  themeGame.innerText = 'dark theme  ';
  saveGame.innerText = 'save game';
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
    'tower(5x5)',
    'window(5x5)',
    'home(10x10)',
    'home(10x10)',
    'home(10x10)',
    'ggg(15x15)',
    'ggg(15x15)',
    'ggg(15x15)',
    'ggg(15x15)',
    'ggg(15x15)',
  ];
  for (let i = 0; i <= 14; i += 1) {
    optionFormImage = createElement('option', 'settings__form-option');

    optionFormImage.value = countValue;
    countValue += 1;
    optionFormImage.innerText = nameImages[i];
    selectFormImages.append(optionFormImage);
  }
  //--

  levelsForm.append(labelFormLevels, selectFormLevels, labelFormImages, selectFormImages);
  settings.append(settingsButtonWrapper, levelsForm);
  settingsButtonWrapper.append(resetGame, solutionBtn, saveGame, continueLastGame, randomGame, themeGame, sound);
  return settings;
};
export {
  createSettingsButtons,
  selectFormLevels,
  selectFormImages,
  resetGame,
  solutionBtn,
  randomGame,
  sound,
  optionFormImage,
  saveGame,
  continueLastGame,
  themeGame,
};
