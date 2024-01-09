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
  {
    question: 'What is the capital of Germany?',
    answer: 'Berlin',
  },
  {
    question: 'Which band is known for the hit song "Bohemian Rhapsody"?',
    answer: 'Queen',
  },
  {
    question: 'Which country hosted the 2016 Summer Olympics?',
    answer: 'Brazil',
  },
];
// HTML элементы
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
//--
let attemptCounter = 0;
let arrGuessedLetters = [];
let arrayPressedkeys = [];
let previousRandomNumber;
const clickSound = new Audio('./assets/audio/click.wav');
const victorySound = new Audio('./assets/audio/victory.mp3');
const gameOverSound = new Audio('./assets/audio/game over.wav');
const letterSound = new Audio('./assets/audio/letter2.mp3');
const arrSound = [clickSound, victorySound, gameOverSound, letterSound];
for (let i = 0; i <= arrSound.length - 1; i += 1) {
  arrSound[i].volume = 0.4;
}
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
  modalSecretWord.innerText = 'Secret word: ';
  modalSecretWord.append(secretWord);
  modalButton.innerText = 'play again';
}
createModal();

function restartGame() {
  arrGuessedLetters = [];
  attemptCounter = 0;
  guessesScore.innerText = `${attemptCounter} / 6`;
  hangmanImg.src = `./assets/images/hangman-${attemptCounter}.svg`;
  modal.classList.remove('modal--active');
  document.querySelectorAll('.key').forEach((el) => {
    const key = el;
    key.disabled = false;
    key.classList.remove('key--active');
    arrayPressedkeys = [];
  });
}
function getRandomAnswerAndQuestion() {
  function generateRandomNumber(maxValue) {
    let randomNum = Math.floor(Math.random() * maxValue);
    while (randomNum === previousRandomNumber) {
      randomNum = Math.floor(Math.random() * maxValue);
    }
    previousRandomNumber = randomNum;

    return randomNum;
  }
  const randomNumber = generateRandomNumber(questions.length);
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
  modalTitle.innerText = 'Game Over';
  gameOverSound.play();
}
function victory() {
  modal.classList.add('modal--active');
  secretWord.innerText = word;
  modalTitle.innerText = 'Victory!';
  victorySound.play();
}

function startGame(letter) {
  if (word.includes(letter)) {
    word.split('').forEach((el, i) => {
      if (el === letter) {
        arrGuessedLetters.push(letter);
        const liElements = document.querySelectorAll('li');
        liElements[i].innerText = letter;
        liElements[i].classList.add('answer-letter--open');
        letterSound.play();
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
  // prettier-ignore
  const letters = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z',
  ];

  for (let i = 0; i <= letters.length - 1; i += 1) {
    const key = createElement('button', 'key');
    key.innerText = letters[i];
    keyboard.append(key);
    // eslint-disable-next-line no-loop-func
    key.addEventListener('click', () => {
      key.classList.add('key--active');
      key.disabled = true;
      startGame(key.innerText);
      clickSound.play();
      arrayPressedkeys.push(letters[i]);
    });

    // eslint-disable-next-line no-loop-func
    document.addEventListener('keydown', (e) => {
      if (
        // если нажатая кнопка === букве из массива
        e.key === letters[i].toLowerCase() &&
        // и этой буквы еще нет в массиве нажатых букв
        !arrayPressedkeys.includes(letters[i])
        // теперь при повторном нажатии условие не будет проходить
        // так так буква уже есть в массиве.
      ) {
        // то тогда добавляем нажатую букву в массив
        arrayPressedkeys.push(letters[i]);
        key.classList.add('key--active');
        key.disabled = true;
        clickSound.play();
        startGame(key.innerText);
      }
    });
  }
}
createKeyboard();

modalButton.addEventListener('click', () => {
  getRandomAnswerAndQuestion();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && modal.classList.contains('modal--active')) {
    getRandomAnswerAndQuestion();
  }
});
