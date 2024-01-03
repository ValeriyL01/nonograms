const questions = [
  {
    question: 'What is the capital of France?',
    answer: 'Paris',
  },
  {
    question: 'What is the currency of Japan?',
    answer: 'Yen',
  },
  {
    question: 'Who wrote the Harry Potter series?',
    answer: 'Rowling',
  },
  {
    question: 'What is the chemical symbol for gold?',
    answer: 'Au',
  },
  {
    question: 'What is the largest ocean?',
    answer: 'Pacific',
  },
  {
    question: 'What is the tallest mountain in the world?',
    answer: 'Everest',
  },

  {
    question: 'In what country is the Taj Mahal located?',
    answer: 'India',
  },
  {
    question: 'What is the largest planet in our solar system?',
    answer: 'Jupiter',
  },
  {
    question: 'Who is the author of "To Kill a Mockingbird"?',
    answer: 'Lee',
  },
  {
    question: 'What is the capital of Spain?',
    answer: 'Madrid',
  },
  {
    question: 'Who is the author of "Pride and Prejudice"?',
    answer: 'Austen',
  },

  {
    question: 'Who is the author of the "Lord of the Rings" series?',
    answer: 'Tolkien',
  },
  {
    question: 'What is the national animal of Australia?',
    answer: 'Kangaroo',
  },
  {
    question: 'What is the currency of the United Kingdom?',
    answer: 'Pound',
  },
];
let hintText;
let answerElement;
let gameWrapper;
let hangmanImg;
let modal;
let modalTitle;
let secretWord;
let guessesScore;
let word;
let modalButton;
let keyboard;
let attemptCounter = 0;
let arrGuessedLetters = [];
const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.classList.add(className);
  return element;
};

const body = document.querySelector('body');
const container = createElement('div', 'container');
body.append(container);

function createHangman() {
  const hangmanWrapper = createElement('div', 'hangman-wrapper');
  hangmanImg = createElement('img', 'hangman-wrapper__img');
  const hangmanTitle = createElement('h1', 'hangman-wrapper__title');
  hangmanWrapper.append(hangmanImg, hangmanTitle);
  hangmanImg.src = './assets/images/hangman-0.svg';
  hangmanTitle.textContent = 'Hangman Game';
  container.append(hangmanWrapper);
}
createHangman();

function createGame() {
  gameWrapper = createElement('div', 'game-wrapper');
  answerElement = createElement('ul', 'answer');
  container.append(gameWrapper);

  const hint = createElement('h3', 'hint');
  const guesses = createElement('h3', 'guesses');
  hint.innerText = `Hint: `;
  guesses.innerText = 'Incorrect guesses:';
  gameWrapper.append(answerElement, hint, guesses);
  hintText = createElement('span', 'hint-text');
  guessesScore = createElement('span', 'guesses-score');
  hint.append(hintText);
  guesses.append(guessesScore);
  guessesScore.innerText = ` 0 / 6`;
}

createGame();
function createModal() {
  modal = createElement('div', 'modal');
  container.append(modal);
  const modalContainer = createElement('div', 'modal__container');
  modal.append(modalContainer);
  modalTitle = createElement('h3', 'modal__title');
  const modalSecretWord = createElement('div', 'modal__secret-word');
  secretWord = createElement('span', 'secret-word');
  modalButton = createElement('button', 'modal__button');
  modalContainer.append(modalTitle, modalSecretWord, modalButton);

  modalTitle.innerText = 'Game Over';
  modalSecretWord.innerText = 'Secret word: ';
  modalSecretWord.append(secretWord);
  secretWord.innerText = 'gfgfdhdhd';
  modalButton.innerText = 'play again';
}
createModal();

function restartGame() {
  arrGuessedLetters = [];
  attemptCounter = 0;
  guessesScore.innerText = `${attemptCounter} / 6`;
  modal.classList.remove('modal--active');
  document.querySelectorAll('.key').forEach((key) => {
    key.disabled = false;
    key.classList.remove('key--active');
  });
}
function getRandomAnswerAndQuestion() {
  const randomNumber = Math.floor(Math.random() * questions.length);
  const {question} = questions[randomNumber];
  const {answer} = questions[randomNumber];
  hintText.innerText = `${question}`;
  let answerLetter = '';
  for (let i = 1; i <= answer.length; i += 1) {
    answerLetter += '<li class = "answer-letter"></li>';
  }
  answerElement.innerHTML = answerLetter;
  word = answer.toUpperCase();
  console.log('Ответ:', word);
  restartGame();
}

getRandomAnswerAndQuestion();

function gameOver() {
  modal.classList.add('modal--active');
  secretWord.innerText = word;
}
function victory() {
  modal.classList.add('modal--active');
  secretWord.innerText = word;
  modalTitle.innerText = 'Victory!';
}

function startGame(letter) {
  if (word.includes(letter)) {
    word.split('').forEach((el, i) => {
      if (el === letter) {
        arrGuessedLetters.push(letter);
        const liElements = document.querySelectorAll('li');
        liElements[i].innerText = letter;
        liElements[i].classList.add('answer-letter--open');
      }
    });
  } else {
    attemptCounter += 1;
  }
  guessesScore.innerText = `${attemptCounter} / 6`;
  hangmanImg.src = `./assets/images/hangman-${attemptCounter}.svg`;
  if (attemptCounter === 6) {
    gameOver();
  }

  if (word.length === arrGuessedLetters.length) {
    victory();
  }
}
function createKeyboard() {
  keyboard = createElement('div', 'keyboard-wrapper');
  gameWrapper.append(keyboard);
  const letters = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];

  for (let i = 0; i <= letters.length - 1; i += 1) {
    const key = createElement('button', 'key');
    key.innerText = letters[i];
    keyboard.append(key);
    key.addEventListener('click', () => {
      key.classList.add('key--active');
      key.disabled = true;
      startGame(key.innerText);
    });
  }
}

createKeyboard();
modalButton.addEventListener('click', () => {
  getRandomAnswerAndQuestion();
});
