const body = document.querySelector('.body');
const refreshbtn = document.querySelector('.menu__refresh-btn');
const btnItem1 = document.getElementById('btn-item1');
const btnItem2 = document.getElementById('btn-item2');
const btnItem3 = document.getElementById('btn-item3');
const modal = document.querySelector('.modal');
const modalContainer = document.querySelector('.modal__container');
const modalPrise = document.querySelector('.modal__total-price');
const btnSize1 = document.getElementById('btn-size1');
const btnSize2 = document.getElementById('btn-size2');
const btnSize3 = document.getElementById('btn-size3');
const btnAdditives = document.querySelectorAll('.btn-item-additives');
const btnsAdditives = Array.from(btnAdditives);

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.classList.add(className);
  return element;
};

function createCard(products, i) {
  const productCard = createElement('article', 'menu__product-card');
  productCard.id = `${i}`;
  const productCardImgWrapper = createElement(
    'div',
    'product-card-img-wrapper',
  );
  const productCardImg = createElement('img', 'product-card-img');
  productCardImgWrapper.append(productCardImg);
  const descriptions = createElement('div', 'descriptions');
  const productCardTitle = createElement('h6', 'product-card-title');
  const productCardDescription = createElement('p', 'product-card-description');
  const productCardPrice = createElement('span', 'product-card-price');
  productCard.append(productCardImgWrapper, descriptions);
  descriptions.append(
    productCardTitle,
    productCardDescription,
    productCardPrice,
  );
  productCardImg.src = products[i].img;
  productCardTitle.textContent = products[i].name;
  productCardDescription.textContent = products[i].description;
  productCardPrice.textContent = products[i].price;
  return productCard;
}

function openProducts(startIndex, endIndex) {
  const menu = document.querySelector('.menu__product');
  menu.innerHTML = '';
  for (let i = startIndex; i <= endIndex; i++) {
    menu.append(createCard(products, i));
  }
  menu.append(refreshbtn);
}
openProducts(0, 7);

function switchProducts(tag1, tag2, tag3) {
  tag1.classList.add('btn-item--active');
  tag2.classList.remove('btn-item--active');
  tag3.classList.remove('btn-item--active');
  tag1.disabled = true;
  tag2.disabled = false;
  tag3.disabled = false;
}

btnItem1.addEventListener('click', () => {
  refreshbtn.classList.remove('menu__refresh-btn--remove');
  switchProducts(btnItem1, btnItem2, btnItem3);
  openProducts(0, 7);
});
btnItem2.addEventListener('click', () => {
  refreshbtn.classList.remove('menu__refresh-btn--remove');
  switchProducts(btnItem2, btnItem1, btnItem3);
  openProducts(8, 11);
  refreshbtn.remove();
});
btnItem3.addEventListener('click', () => {
  refreshbtn.classList.remove('menu__refresh-btn--remove');
  switchProducts(btnItem3, btnItem1, btnItem2);
  openProducts(12, 19);
});

refreshbtn.addEventListener('click', () => {
  for (let i = 5; i <= 8; i++) {
    document.querySelector(
      `.menu__product-card:nth-child(${i})`,
    ).style.display = 'block';
    refreshbtn.classList.add('menu__refresh-btn--remove');
  }
});

function openModal() {
  const modalImg = document.querySelector('.modal__img');
  const modalDescriptionTitle = document.querySelector(
    '.modal__description-title',
  );
  const modalDescriptionText = document.querySelector(
    '.modal__description-text',
  );
  const sizeS = document.getElementById('size-s');
  const sizeM = document.getElementById('size-m');
  const sizeL = document.getElementById('size-l');
  const additives1 = document.getElementById('additives1');
  const additives2 = document.getElementById('additives2');
  const additives3 = document.getElementById('additives3');
  const menu = document.querySelector('.menu__product');
  menu.addEventListener('click', (event) => {
    if (event.target === menu) {
      return;
    }
    if (!event.composedPath().includes(refreshbtn)) {
      let id = event.target.closest('article').id;
      modal.classList.add('modal--active');
      body.classList.add('body--lock');
      modalImg.src = products[id].img;
      modalDescriptionTitle.textContent = products[id].name;
      modalDescriptionText.textContent = products[id].description;
      sizeS.textContent = products[id].sizes.s.size;
      sizeM.textContent = products[id].sizes.m.size;
      sizeL.textContent = products[id].sizes.l.size;
      additives1.textContent = products[id].additives[0].name;
      additives2.textContent = products[id].additives[1].name;
      additives3.textContent = products[id].additives[2].name;
      modalPrise.textContent = products[id].price;
    }
  });
}

function switchSize(tag1, tag2, tag3) {
  tag1.classList.add('btn-item-size--active');
  tag2.classList.remove('btn-item-size--active');
  tag3.classList.remove('btn-item-size--active');
  tag1.disabled = true;
  tag2.disabled = false;
  tag3.disabled = false;
}

function closeModal() {
  const modalClose = document.querySelector('.modal__close');
  modalClose.addEventListener('click', () => {
    modal.classList.remove('modal--active');
    body.classList.remove('body--lock');
    switchSize(btnSize1, btnSize2, btnSize3);
    btnsAdditives.forEach((btns) => {
      btns.classList.remove('btn-item-size--active');
    });
  });
  modal.addEventListener('click', (event) => {
    if (!event.composedPath().includes(modalContainer)) {
      modal.classList.remove('modal--active');
      body.classList.remove('body--lock');
      switchSize(btnSize1, btnSize2, btnSize3);
      btnsAdditives.forEach((btns) => {
        btns.classList.remove('btn-item-size--active');
      });
    }
  });
}

function changePrise(num) {
  let price = String(+modalPrise.textContent + +`${num}`);
  modalPrise.textContent = price.length <= 1 ? `${price}.00` : `${price}0`;
  return modalPrise.textContent;
}
btnSize1.addEventListener('click', () => {
  if (btnSize3.disabled === true) {
    modalPrise.textContent = changePrise(-1.0);
  }
  if (btnSize2.disabled === true) {
    modalPrise.textContent = changePrise(-0.5);
  }
  switchSize(btnSize1, btnSize2, btnSize3);
});
btnSize2.addEventListener('click', () => {
  if (btnSize1.disabled === true) {
    modalPrise.textContent = changePrise(0.5);
  }
  if (btnSize3.disabled === true) {
    modalPrise.textContent = changePrise(-0.5);
  }
  switchSize(btnSize2, btnSize1, btnSize3);
});
btnSize3.addEventListener('click', () => {
  if (btnSize2.disabled === true) {
    modalPrise.textContent = changePrise(0.5);
  }
  if (btnSize1.disabled === true) {
    modalPrise.textContent = changePrise(1.0);
  }
  switchSize(btnSize3, btnSize1, btnSize2);
});

function addAdditives() {
  btnsAdditives.forEach((btns) => {
    btns.addEventListener('click', () => {
      btns.classList.toggle('btn-item-size--active');
      if (btns.classList.contains('btn-item-size--active')) {
        modalPrise.textContent = changePrise(0.5);
      } else {
        modalPrise.textContent = changePrise(-0.5);
      }
    });
  });
}
openModal();
closeModal();
addAdditives();