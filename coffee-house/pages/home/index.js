const slider = document.querySelector('.slider__card');
const btnLeft = document.querySelector('.btn-left');
const btnRight = document.querySelector('.btn-right');
const progress = document.querySelectorAll('.progress-bar');
const sliderWrapper = document.querySelector('.slider__wrapper');
let differencePoints = 0;
let progressBars = Array.from(progress);
let progressBarNum = [];
let activeCard = 0;
let isFlag = true;
let numbersCard = [0, 1, 2];
let axisX1 = null;
let slideSwitchTime;
let intervalId;
function addBurgerMenu() {
  const btn = document.querySelector('.menu__btn');
  const nav = document.querySelector('.nav');
  const navLink = document.querySelectorAll('.nav__link');
  const body = document.querySelector('.body');
  btn.addEventListener('click', function () {
    nav.classList.toggle('nav__list--active');
    body.classList.toggle('body--lock');
  });
  navLink.forEach((el) => {
    el.addEventListener('click', function () {
      nav.classList.remove('nav__list--active');
      body.classList.remove('body--lock');
    });
  });
}

addBurgerMenu();
const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.classList.add(className);
  return element;
};

const createCard = (numberCard) => {
  const card = createElement('div', 'coffee-card');
  const cardImg = createElement('img', 'coffee-card__img');
  const cardTitle = createElement('h5', 'coffee-card__title');
  const cardDescription = createElement('p', 'coffee-card__description');
  const cardPrice = createElement('span', 'coffee-card__price');
  card.append(cardImg, cardTitle, cardDescription, cardPrice);
  cardImg.src = products[numberCard].img;
  cardTitle.textContent = products[numberCard].name;
  cardDescription.textContent = products[numberCard].description;
  cardPrice.textContent = products[numberCard].price;
  return card;
};

const createSlider = () => {
  slider.append(createCard(activeCard));
  nextCardGenerate();
  prevCardGenerate();
};

const nextCardGenerate = () => {
  let nextCard = activeCard + 1;
  if (nextCard >= numbersCard.length) {
    nextCard = 0;
  }
  slider.append(createCard(nextCard));
};

const prevCardGenerate = (width = false) => {
  let prevCard = activeCard - 1;
  if (prevCard < 0) {
    prevCard = numbersCard.length - 1;
  }
  const card = createElement('div', 'coffee-card');
  const cardImg = createElement('img', 'coffee-card__img');
  const cardTitle = createElement('h5', 'coffee-card__title');
  const cardDescription = createElement('p', 'coffee-card__description');
  const cardPrice = createElement('span', 'coffee-card__price');
  card.append(cardImg, cardTitle, cardDescription, cardPrice);
  cardImg.src = products[prevCard].img;
  cardTitle.textContent = products[prevCard].name;
  cardDescription.textContent = products[prevCard].description;
  cardPrice.textContent = products[prevCard].price;
  if (width) {
    card.style.width = 0;
  }
  slider.prepend(card);
};
createSlider();
const resetPrevProgress = () => {
  let prevProgress = progressBarNum[progressBarNum.length - 2];
  if (prevProgress === undefined) {
    prevProgress = 0;
  }
  return (progressBars[prevProgress].value = 0);
};

const nextCard = () => {
  if (!isFlag) {
    return;
  }
  isFlag = !isFlag;
  activeCard++;
  if (activeCard >= numbersCard.length) {
    activeCard = 0;
  }
  loadingProgressBar(activeCard);
  resetPrevProgress();
  nextCardGenerate();
  animation(
    1000,
    function (progress) {
      document.querySelector('.coffee-card').style.width =
        480 * (1 - progress) + 'px';
    },
    document.querySelector('.coffee-card'),
  );
};

const prevCard = () => {
  if (!isFlag) {
    return;
  }
  isFlag = !isFlag;
  activeCard--;
  if (activeCard < 0) {
    activeCard = numbersCard.length - 1;
  }

  loadingProgressBar(activeCard);
  resetPrevProgress();
  prevCardGenerate(true);
  animation(
    1000,
    function (progress) {
      document.querySelector('.coffee-card').style.width =
        480 * progress + 'px';
    },
    document.querySelector('.coffee-card:last-child'),
  );
};

const animation = (duration, draw, removeCard) => {
  const startTime = performance.now();
  requestAnimationFrame(function animation(time) {
    let tick = (time - startTime) / duration;
    if (tick > 1) {
      tick = 1;
    }
    draw(tick);
    if (tick < 1) {
      requestAnimationFrame(animation);
    } else {
      removeCard.remove();
      isFlag = true;
    }
  });
};

function loadingProgressBar(number) {
  clearInterval(intervalId);
  progressBars[number].value
  const maxValue = 100;
  const increment = 1;
  intervalId = setInterval(() => {
    if (progressBars[number].value >= maxValue) {
      clearInterval(intervalId);
      nextCard();
    } else {
      progressBars[number].value += increment;
    }
  }, 50);

  progressBarNum.push(number);

}

loadingProgressBar(0);

function trackTouchStart(event) {
  const touchStart = event.touches[0];
  axisX1 = touchStart.clientX;
}

function trackTouchMove(event) {
  if (!axisX1) {
    return;
  }
  let axisX2 = event.touches[0].clientX;
   differencePoints = axisX2 - axisX1;
  
  axisX1 = null;
  return differencePoints
}
function trackTouchEnd() {
  if(differencePoints === 0){
    startLoadingProgressBar()
  }else if(differencePoints > 0){
    prevCard()
  }else if(differencePoints < 0){
    nextCard()
  }
  differencePoints = 0
}
function stopLoadingProgressBar(){
  clearInterval(intervalId);
}
function startLoadingProgressBar(){
  loadingProgressBar(activeCard);
}

btnRight.addEventListener('click', nextCard);
btnLeft.addEventListener('click', prevCard);

document.addEventListener('touchstart', trackTouchStart);
document.addEventListener('touchmove', trackTouchMove);

sliderWrapper.addEventListener('mouseover',stopLoadingProgressBar );
sliderWrapper.addEventListener('mouseout',startLoadingProgressBar );
sliderWrapper.addEventListener('touchstart', stopLoadingProgressBar);
sliderWrapper.addEventListener('touchend',trackTouchEnd);