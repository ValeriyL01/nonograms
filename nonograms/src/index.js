import './style.css';
import './index.html';
import createSettingsButtons from './components/createSettingsButton';

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.classList.add(className);
  return element;
};
const body = document.querySelector('body');
const gameContainer = createElement('div', 'container');
body.append(gameContainer);
// const playingField = createElement('div', 'playing-field');
gameContainer.append(createSettingsButtons());

// for (let i = 0; i < 5; i += 1) {
//   for (let j = 0; j < 5; j += 1) {
//     const cell = createElement('div', 'cell');

//     cell.textContent = i * 5 + j + 1;
//     playingField.append(cell);
//   }
// }
