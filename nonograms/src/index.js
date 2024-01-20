import './style.css';
import './index.html';
import createSettingsButtons from './components/createSettingsButton';
import matrixLevel1 from './components/matrix';

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.classList.add(className);
  return element;
};
const body = document.querySelector('body');
const gameContainer = createElement('div', 'container');
body.append(gameContainer);
const playingField = createElement('div', 'playing-field');
gameContainer.append(playingField, createSettingsButtons());
