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
  const hangmanImg = createElement('img', 'hangman-wrapper__img');
  const hangmanTitle = createElement('h1', 'hangman-wrapper__title');
  hangmanWrapper.append(hangmanImg, hangmanTitle);
  hangmanImg.src = './assets/images/hangman-6.svg';
  hangmanTitle.textContent = 'Hangman Game';
  container.append(hangmanWrapper);
}
createHangman();
let hintText;
let answerElement;
let gameWrapper;
function createGame() {
  gameWrapper = createElement('div', 'game-wrapper');
  answerElement = createElement('ul', 'answer');
  container.append(gameWrapper);

  const hint = createElement('h3', 'hint');
  const guesses = createElement('h3', 'guesses');
  hint.innerText = 'Hint: ';
  guesses.innerText = 'Incorrect guesses: ';
  gameWrapper.append(answerElement, hint, guesses);
  hintText = createElement('span', 'hint-text');
  const guessesScore = createElement('span', 'guesses-score');
  hint.append(hintText);
  guesses.append(guessesScore);
  guessesScore.innerText = `0 / 6`;
}

createGame();

function getRandomAnswerAndQuestion() {
  const randomNumber = Math.floor(Math.random() * questions.length);
  const {question} = questions[randomNumber];
  const {answer} = questions[randomNumber];
  hintText.innerText = `${question}`;
  const answerLetter = answer
    .split('')
    .map(() => '<li class = "answer-letter"></li>')
    .join('');
  answerElement.innerHTML = answerLetter;
}

getRandomAnswerAndQuestion();

function createKeyboard() {
  const keyboard = createElement('div', 'keyboard-wrapper');
  gameWrapper.append(keyboard);
  const letters = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];

  for (let i = 0; i <= letters.length - 1; i += 1) {
    const key = createElement('button', 'key');
    key.innerText = letters[i];
    keyboard.append(key);
  }
}

createKeyboard();
