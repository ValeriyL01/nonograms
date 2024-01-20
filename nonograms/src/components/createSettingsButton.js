const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.classList.add(className);
  return element;
};
let selectFormLevels;
const createSettingsButtons = () => {
  const settings = createElement('div', 'settings');
  const resetGame = createElement('button', 'settings__reset');

  const solution = createElement('button', 'settings__solution');
  const continueLastGame = createElement('button', 'settings__continue-last-game');
  const randomGame = createElement('button', 'settings__random-game');
  const themeGame = createElement('button', 'settings__theme');
  resetGame.innerText = 'reset';
  solution.innerText = 'solution';
  continueLastGame.innerText = 'continue last game';
  randomGame.innerText = 'random game';
  themeGame.innerText = 'theme';

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
  levelsForm.append(labelFormLevels, selectFormLevels);
  selectFormLevels.append(optionFormLevels1, optionFormLevels2, optionFormLevels3);
  settings.append(resetGame, solution, continueLastGame, randomGame, themeGame, levelsForm);
  return settings;
};
export {createSettingsButtons, selectFormLevels};
