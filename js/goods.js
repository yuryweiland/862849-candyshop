'use strict';

// Массив названия товаров
var NAME_GOODS = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие', 'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка', 'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа', 'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина',
  'Кукурузное утро', 'Икорный фуршет', 'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное', 'Острый язычок'];

// Массив ингридиентов
var CONTENTS_GOODS = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца', 'ароматизатор дуба, идентичный натуральному', 'ароматизатор картофеля', 'лимонная кислота', 'загуститель', 'эмульгатор', 'консервант: сорбат калия', 'посолочная смесь: соль, нитрит натрия', 'ксилит', 'карбамид', 'вилларибо', 'виллабаджо'];

// Расширения файлов
var PICTURE_GOODS = ['gum-cedar', 'gum-chile', 'gum-eggplant', 'gum-mustard', 'gum-portwine', 'gum-wasabi', 'ice-cucumber', 'ice-eggplant', 'ice-garlic', 'ice-italian', 'ice-mushroom', 'ice-pig', 'marmalade-beer', 'marmalade-caviar', 'marmalade-corn', 'marmalade-new-year', 'marmalade-sour',
  'marshmallow-bacon', 'marshmallow-beer', 'marshmallow-shrimp', 'marshmallow-spicy', 'marshmallow-wine', 'soda-bacon', 'soda-celery', 'soda-cob', 'soda-garlic', 'soda-peanut-grapes', 'soda-russian'];

// Рейтинг
var RATING_ARRAY = [
  'stars__rating--one',
  'stars__rating--two',
  'stars__rating--three',
  'stars__rating--four',
  'stars__rating--five'
];

var CATALOG_GOODS = 26;

// Товары в корзине (по-умолчанию пустой массив)
var basketCards = [];
var selectedPaymentMethod = 'payment__card';
var selectedDeliverMethod = 'deliver__store';

// Создаём массив товаров каталога
var loadedGoods = function () {
  var goodsArray = [];

  for (var i = 0; i < CATALOG_GOODS; i++) {
    goodsArray.push(generateGoods(i));
  }
  return goodsArray;
};

// Находим шаблон, который будем копировать
var goodElements = document.querySelector('#card').content.querySelector('.catalog__card');
var cardElements = document.querySelector('#card-order').content.querySelector('.goods_card');

var goodsCards = document.querySelector('.goods__cards');
var goodsCardEmpty = document.querySelector('.goods__card-empty');
var catalogCards = document.querySelector('.catalog__cards');
var catalogLoad = document.querySelector('.catalog__load');
var cardWidget = document.querySelector('.main-header__basket');

var paymentCard = document.querySelector('.payment__card');
var paymentCash = document.querySelector('.payment__cash');
var deliverStore = document.querySelector('.deliver__store');
var deliverCourier = document.querySelector('.deliver__courier');

var orderButton = document.querySelector('.buy__submit-btn');

// Генерируем строку ингридиентов
function generateString() {
  var composition = '';

  for (var i = 0; i < Math.floor(randomMath(CONTENTS_GOODS.length)); i++) {
    composition += CONTENTS_GOODS[Math.floor(Math.random() * CONTENTS_GOODS.length)] + ', '; // Генерируем строку списка ингридиентов
  }

  return composition.slice(0, -2) + '.';
}

function randomMath(length, start) {
  start = typeof start !== 'undefined' ? start : 0;

  return Math.floor(Math.random() * length) + start;
}

// Генерируем 26 объектов описания товара
function generateGoods() {
  var INDEX = randomMath(CATALOG_GOODS, 1);

  return {
    name: NAME_GOODS[INDEX], // Название товара
    picture: 'img/cards/' + PICTURE_GOODS[INDEX] + '.jpg', // Адрес изображения товара
    amount: randomMath(20), // Количество
    price: randomMath(1400, 100), // Стоимость
    weight: randomMath(270, 30), // Вес
    rating: { // Рейтинг
      value: randomMath(5, 1), // Оценка
      number: randomMath(890, 10) // Количество оценок
    },
    nutritionFacts: { // Состав
      sugar: !!Math.round(Math.random()), // Содержание сахара
      energy: randomMath(430, 70), // Энергетическая ценность
      contents: generateString() // Состав
    }
  };
}

// Убираем у блока catalog__cards класс catalog__cards--load
function removeCatalogCardsLoad() {
  catalogCards.classList.remove('catalog__cards--load');
  catalogLoad.classList.add('visually-hidden');
}

// Есть ли сахар
function isSugar(goodElement, good) {
  // Характеристики сахара и состав
  var cardCharacteristic = goodElement.querySelector('.card__characteristic');

  cardCharacteristic.textContent = good.nutritionFacts.sugar === true ? 'Содержит сахар' : 'Без сахара';
}

function getAmountClass(good, goodElement) {
  // В зависимости от количества добавляем класс
  if (good.amount > 5) {
    goodElement.classList.add('card--in-stock');
  } else if (good.amount >= 1 && good.amount <= 5) {
    goodElement.classList.add('card--little');
  } else if (good.amount === 0) {
    goodElement.classList.add('card--soon');
  }
}

// Генерируем товар - создаем DOM-элементы и заполняем данными из массива
function renderGood(good) {
  var goodElement = goodElements.cloneNode(true); // Клонируем товар

  getAmountClass(good, goodElement);

  var cardTitle = goodElement.querySelector('.card__title');
  cardTitle.textContent = good.name; // Вставим название в блок
  var cardImg = goodElement.querySelector('.card__img');
  cardImg.src = good.picture;
  var cardPrice = goodElement.querySelector('.card__price');
  cardPrice.innerHTML = good.price + '&nbsp;<span class="card__currency">₽</span><span class="card__weight">/ ' + good.weight + ' Г</span>';

  // Добавляем класс рейтинга в зависимоти от значения
  var starsRating = goodElement.querySelector('.stars__rating');
  starsRating.classList.remove('stars__rating--five');
  starsRating.classList.add(RATING_ARRAY[good.rating.value + 1]);

  // Рейтинг
  var starCount = goodElement.querySelector('.star__count');
  starCount.textContent = good.rating.number;

  isSugar(goodElement, good);

  var cardBtnFavorite = goodElement.querySelector('.card__btn-favorite');
  cardBtnFavorite.addEventListener('click', clickBtnFavoriteHandler);

  var cardBtn = goodElement.querySelector('.card__btn');
  cardBtn.addEventListener('click', clickAddToCardHandler);

  // Функция добавления товара в корзину
  function clickAddToCardHandler() {
    goodsCards.classList.remove('goods__cards--empty');
    goodsCardEmpty.classList.add('visually-hidden');

    // Клонируем товар
    var goodCard = Object.assign({}, good);
    var sum = 0;

    // Если количество больше 0, то добавляем товар в корзину
    if (good.amount > 0) {

      // Если товар уже содержится в корзине, увеличиваем количество товара
      if (contains(basketCards, goodCard)) {
        addGoodAmount(basketCards, goodCard);
      } else {
        goodCard.orderedAmount = 1;
        delete goodCard.amount;
        basketCards.push(goodCard);
      }

      basketCards.forEach(function (card) {
        sum = sum + card.price;
      });

      // Отображаем текущее кол-во товаров в корзине
      updateCartWidgetText(sum);

      // Уменьшаем на 1 кол-во товара в наличии при добавлении товара в корзину
      good.amount--;
    }
    showBasket(basketCards, goodsCards, addElementsCard);
  }

  return goodElement;
}

// Гененируем шаблоны для товаров в корзине
function addElementsCard(good) {
  var cardElement = cardElements.cloneNode(true);
  var cardOrderTitle = cardElement.querySelector('.card-order__title');
  cardOrderTitle.textContent = good.name;
  var cardOrderImg = cardElement.querySelector('.card-order__img');
  cardOrderImg.src = good.picture;
  var cardOrderPrice = cardElement.querySelector('.card-order__price');
  cardOrderPrice.textContent = good.price + ' ₽';
  var cardOrderCount = cardElement.querySelector('.card-order__count');
  cardOrderCount.value = good.orderedAmount;

  //  Функция удаления товара в магазине
  var btnClose = cardElement.querySelector('.card-order__close');
  btnClose.addEventListener('click', btnCloseClickHandler);

  var goodCards = document.querySelector('.goods__cards');

  function btnCloseClickHandler() {
    deleteGood(basketCards, good, goodCards, cardElement);
  }

  return cardElement;
}

// Обновление текста в виджете корзины (в шапке сайта)
function updateCartWidgetText(sum) {
  cardWidget.textContent = getCountBasket(basketCards) > 0 ? 'В корзине ' + getCountBasket(basketCards) + ' товара на ' + sum + '₽' : 'В корзине ничего нет';
}

// Добавляем/убираем css-класс при клике на "Добавить в Избранное"
function clickBtnFavoriteHandler(evt) {
  var cardFavoriteElement = evt.currentTarget;
  cardFavoriteElement.classList.toggle('card__btn-favorite--selected');
}

// Переключение вкладок в форме оформления заказа
var payment = document.querySelector('.payment__inner');
payment.addEventListener('click', paymentFormClickHandler);

var deliver = document.querySelector('.deliver');
deliver.addEventListener('click', deliverFormClickHandler);

// Обработчик клика по вкладкам в блоке "Оплата"
function paymentFormClickHandler(evt) {
  var target = evt.target;
  var inputClass = target.closest('.toggle-btn__input');
  if (!inputClass) {
    return;
  }

  selectedPaymentMethod = target.getAttribute('id');

  if (selectedPaymentMethod === 'payment__card') {
    document.querySelector('.' + selectedPaymentMethod).classList.remove('visually-hidden');
    paymentCash.classList.add('visually-hidden');
    setDisabledInputs(paymentCard, false);
    setRequiredInputs(paymentCard, true);

  } else if (selectedPaymentMethod === 'payment__cash') {
    document.querySelector('.' + selectedPaymentMethod).classList.remove('visually-hidden');
    paymentCard.classList.add('visually-hidden');
    setDisabledInputs(paymentCard, true);
  }
}

// Обработчик клика по вкладкам в блоке "Доставка"
function deliverFormClickHandler(evt) {
  var target = evt.target;
  var inputClass = target.closest('.toggle-btn__input');
  if (!inputClass) {
    return;
  }

  selectedDeliverMethod = target.getAttribute('id');

  if (selectedDeliverMethod === 'deliver__store') {
    document.querySelector('.' + selectedDeliverMethod).classList.remove('visually-hidden');
    deliverCourier.classList.add('visually-hidden');
    setDisabledInputs(deliverStore, false);
    setDisabledInputs(deliverCourier, true);
    setRequiredInputs(deliverStore, true);

  } else if (selectedDeliverMethod === 'deliver__courier') {
    document.querySelector('.' + selectedDeliverMethod).classList.remove('visually-hidden');
    deliverStore.classList.add('visually-hidden');
    setDisabledInputs(deliverStore, true);
    setDisabledInputs(deliverCourier, false);
    setRequiredInputs(deliverCourier, true);
  }
}

// Деактивируем input у скрытых полей формы
function setDisabledInputs(el, bool) {
  var blockInputs = el.querySelectorAll('input');

  blockInputs.forEach(function (input, index) {
    blockInputs[index].disabled = bool;
  });
}

// Устанавливаем обязательные поля у выбранных вариантов доставки и оплаты
function setRequiredInputs(el, bool) {
  var blockInputs = el.querySelectorAll('input');

  if (bool) {
    blockInputs.forEach(function (input, index) {
      blockInputs[index].setAttribute('required', '');
    });
  } else {
    blockInputs.forEach(function (input, index) {
      blockInputs[index].removeAttribute('required');
    });
  }
}

/**
 * Фильтр
 */
var sliderLine = document.querySelector('.range__filter'); // Шкала (слайдер)
var sliderFillLine = document.querySelector('.range__fill-line'); // Заполнитель
var rangeMin = document.querySelector('.range__btn--left'); // Левый ползунок
var rangeMax = document.querySelector('.range__btn--right'); // Правый ползунок
var priceMin = document.querySelector('.range__price--min'); // Минимальная цена
var priceMax = document.querySelector('.range__price--max'); // Макимальная цена

var min = parseInt(getComputedStyle(rangeMin).left, 10);
var max = parseInt(getComputedStyle(rangeMax).left, 10);
var MIN = 0;
var MAX = 245;
var ELEMENT_WIDTH = 240;

// Координаты слайдера
var sliderLineCoords = getCoords(sliderLine);
rangeMin.addEventListener('mousedown', rangeMinMouseDownHandler);
rangeMax.addEventListener('mousedown', rangeMaxMouseDownHandler);

// Обработчик клика на минимальное значение шкалы
function rangeMinMouseDownHandler(evt) {

  // Выведем текущее координатное значение ползунка
  var elMinCoords = getCoords(rangeMin);

  // MouseEvent.pageX - возвращает значение равное горизонтальной координате, относительно всего документа
  var shiftX = evt.pageX - elMinCoords.left;

  document.addEventListener('mousemove', rangeMinMouseMoveHandler);

  function rangeMinMouseMoveHandler(e) {
    var newLeft = e.pageX - shiftX - sliderLineCoords.left;
    if (newLeft < MIN) {
      newLeft = MIN;
    }
    if (newLeft > max - rangeMin.offsetWidth / 2) {
      newLeft = max - rangeMin.offsetWidth / 2;
    }
    min = newLeft;
    rangeMin.style.left = newLeft + 'px';
    sliderFillLine.style.left = newLeft + 'px';
  }

  // Обработчик клика на MouseUp у шкалы фильтра (для мин. значения)
  function rangeMinMouseUpHandler() {
    priceMin.textContent = parseInt(min, 10);
    priceMax.textContent = parseInt(max, 10);
    document.removeEventListener('mousemove', rangeMinMouseMoveHandler);
    document.removeEventListener('mouseup', rangeMinMouseUpHandler);
  }

  document.addEventListener('mouseup', rangeMinMouseUpHandler);
  return false;
}

// Обработчик клика на максимальное значение шкалы
function rangeMaxMouseDownHandler(evt) {
  // Выведем текущее координатное значение ползунка
  var elMaxCoords = getCoords(rangeMax);

  // MouseEvent.pageX - возвращает значение равное горизонтальной координате, относительно всего документа
  var shiftX = evt.pageX - elMaxCoords.left;

  document.addEventListener('mousemove', rangeMaxMouseMoveHandler);

  function rangeMaxMouseMoveHandler(e) {
    var newRight = e.pageX - shiftX - sliderLineCoords.left;
    if (newRight > MAX) {
      newRight = MAX;
    }
    if (newRight < min + rangeMin.offsetWidth / 2) {
      newRight = min + rangeMin.offsetWidth / 2;
    }
    max = newRight;
    rangeMax.style.left = newRight + 'px';
    sliderFillLine.style.right = ELEMENT_WIDTH - newRight + 'px';
  }

  // Обработчик клика на MouseUp у шкалы фильтра (для макс. значения)
  function rangeMaxMouseUpHandler() {
    priceMin.textContent = parseInt(min, 10);
    priceMax.textContent = parseInt(max, 10);
    document.removeEventListener('mousemove', rangeMaxMouseMoveHandler);
    document.removeEventListener('mouseup', rangeMaxMouseUpHandler);
  }

  document.addEventListener('mouseup', rangeMaxMouseUpHandler);
  return false;
}

// Получаем координаты элемента относительно страницы (pageX, pageY)
function getCoords(elem) {
  var elCoords = elem.getBoundingClientRect();
  return {
    top: elCoords.top + pageYOffset,
    left: elCoords.left + pageXOffset
  };
}

/**
 * Основная функция для отображения данных - showGoods()
 */
function showGoods() {
  var catalogFragment = document.createDocumentFragment();
  var goodsFragment = document.createDocumentFragment();

  loadedGoods().forEach(function (item) {
    catalogFragment.appendChild(renderGood(item));
  });

  catalogCards.appendChild(catalogFragment);
  goodsCards.appendChild(goodsFragment);

  // При запуске сайта устанавливаем состояние полей форм доставки и оплаты
  setDisabledInputs(paymentCard, false);
  setDisabledInputs(paymentCash, true);
  setDisabledInputs(deliverStore, false);
  setDisabledInputs(deliverCourier, true);

  setRequiredInputs(paymentCard, true);
  setRequiredInputs(deliverStore, true);

  isEmptyHeaderBasket();
  isEmptyBasket();
  removeCatalogCardsLoad();
}

// Удалить товар из корзины
function deleteGood(basket, good, goodCards, cardElement) {
  var sum = 0;

  basket.forEach(function (basketItem, index) {
    if (basket[index].name === good.name) {

      // Убираем товар из массива корзины
      basket.splice(index, 1);

      goodCards.removeChild(cardElement);

      // Обновляем количество и сумму товаров в корзине
      basket.forEach(function (item) {
        sum = sum + item.price;
      });

      updateCartWidgetText(sum);

      // Прибавляем элементу количество
      // good.amount += good.orderedAmount;
      isEmptyHeaderBasket();
      isEmptyBasket();
    }
  });
}

// Если количество товара равно нулю
function isEmptyHeaderBasket() {
  if (parseInt(cardWidget.textContent, 10) === 0) {
    cardWidget.textContent = 'В корзине ничего нет';
  }
}

// Проверка, пуста ли корзина
function isEmptyBasket() {
  if (basketCards.length === 0) {
    goodsCards.classList.add('goods__cards--empty');
    goodsCards.appendChild(goodsCardEmpty);
    goodsCardEmpty.classList.remove('visually-hidden');
    orderButton.classList.add('hidden__opacity');

  } else if (basketCards.length > 0) {
    goodsCards.classList.remove('goods__cards--empty');
    goodsCardEmpty.classList.add('visually-hidden');
    orderButton.classList.remove('hidden__opacity');
  }
}

// Добавляем количество товара в header
function getCountBasket(basket) {
  var basketCountOrder = 0;
  for (var i = 0; i < basket.length; i++) {
    basketCountOrder += basket[i].orderedAmount;
  }

  return basketCountOrder;
}

// Прибавляем единицу, если этот товар уже есть в корзине
function addGoodAmount(basket, goodCard) {
  for (var i = 0; i < basket.length; i++) {
    if (basket[i].name === goodCard.name) {
      basket[i].orderedAmount++;
    }
  }
}

// Функция отображения товара в корзине
function showBasket(basket, catalog, callback) {
  cleanBasket();
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < basket.length; i++) {
    fragment.appendChild(callback(basket[i]));
  }

  if (basket.length > 0) {
    orderButton.classList.remove('hidden__opacity');
  } else {
    orderButton.classList.add('hidden__opacity');
  }

  catalog.appendChild(fragment);
}

// Очищаем корзину перед следующим ренедером
function cleanBasket() {
  while (goodsCards.firstChild) {
    goodsCards.removeChild(goodsCards.firstChild);
  }
}

// Проверяем есть ли товар в корзине
function contains(basket, goodCard) {
  for (var i = 0; i < basket.length; i++) {
    if (basket[i].name === goodCard.name) {
      return true;
    }
  }
  return false;
}

// Проверка номера банковской карты по алгоритму Луна
function checkPaymentCard(num) {
  if (selectedPaymentMethod !== 'payment__card' || num === null && typeof num === 'undefined' && num.trim() === '') {
    return false;
  }

  // Разделяет строку на отдельные символы
  var newArrNumber = num.split('').map(function (element, index) {
    // Преобразуем каждую строку в число
    var mapElement = parseInt(element, 10);
    // Производим операцию с каждым нечётным числом - начинается с 0, значит индексы 0,2,4... - нечётные
    if (index % 2 === 0) {
      mapElement = mapElement * 2 > 9 ? (mapElement * 2) - 9 : mapElement * 2;
    }
    return mapElement;
  });
  // Суммируем каждый элемент друг с другом

  var result = newArrNumber.reduce(function (previous, current) {
    return previous + current;
  });

  // Если результат больше 10 и кратен 10 то возвращаем истину
  return !!(result >= 10 && result % 10 === 0);
}

// События
var MESSAGE_ERRORS = {
  contactDataName: {
    tooShort: 'Имя должно состоять минимум из 2-х символов',
    tooLong: 'Имя не должно превышать 25-ти символов',
    patternMismatch: '',
    valueMissing: 'Обязательное поле'
  },
  contactDataTel: {
    tooShort: 'Номер телефона должен состоять из 11 цифр',
    tooLong: 'Номер телефона должен состоять из 11 цифр',
    patternMismatch: '',
    valueMissing: 'Обязательное поле'
  },
  paymentCardNumber: {
    tooShort: 'Номер банковской карты должен состоять из 16 цифр',
    tooLong: 'Номер банковской карты должен состоять из 16 цифр',
    patternMismatch: 'Номер банковской карты не должен содержать буквы и знаки препинания',
    customError: 'Данные карты не прошли проверку подлинности',
    valueMissing: 'Обязательное поле'
  },
  paymentCardDate: {
    tooShort: 'Формат даты должен состоять из 5 символов',
    tooLong: 'Формат даты должен состоять из 5 символов',
    patternMismatch: 'Формат даты должен быть мм/ГГ и состоять только из цифр',
    valueMissing: 'Обязательное поле'
  },
  paymentCardCVC: {
    tooShort: 'Номер CVC должен состоять из трёх цифр',
    tooLong: 'Номер CVC должен состоять из трёх цифр',
    patternMismatch: 'Поле CVC содержит только цифры',
    valueMissing: 'Обязательное поле'
  },
  paymentCardholder: {
    tooShort: 'Имя держателя карты должно состоять минимум из 4-х символов',
    tooLong: 'Имя держателя карты не должно превышать 50-ти символов',
    patternMismatch: 'Имя держателя карты должно быть написано латиницей',
    valueMissing: 'Обязательное поле'
  },
  deliverStreet: {
    tooShort: '',
    tooLong: 'Название улицы не должно превышать 50-ти символов',
    patternMismatch: '',
    valueMissing: 'Обязательное поле'
  },
  deliverHouse: {
    tooShort: '',
    tooLong: '',
    patternMismatch: '',
    valueMissing: 'Обязательное поле'
  },
  deliverFloor: {
    tooShort: '',
    tooLong: 'Этаж не должен превышать 3-х символов',
    patternMismatch: 'Поле Этаж содержит только цифры',
    valueMissing: ''
  },
  deliverRoom: {
    tooShort: '',
    tooLong: '',
    patternMismatch: '',
    valueMissing: 'Обязательное поле'
  }
};
function getCustomErrors(el, obj) {
  if (el.validity.tooShort) {
    el.setCustomValidity(obj.tooShort);
  } else if (el.validity.tooLong) {
    el.setCustomValidity(obj.toLong);
  } else if (el.validity.patternMismatch) {
    el.setCustomValidity(obj.patternMismatch);
  } else if (el.validity.valueMissing) {
    el.setCustomValidity(obj.valueMissing);
  } else if (el === paymentCardNumber && !checkPaymentCard(paymentCardNumber.value)) {
    el.setCustomValidity(obj.customError);
  } else {
    el.setCustomValidity('');
  }
}
// Обработчик событий на форме
var form = document.querySelector('form:nth-child(2)');
var contactDataName = form.querySelector('#contact-data__name');
var contactDataTel = form.querySelector('#contact-data__tel');
var paymentCardNumber = form.querySelector('#payment__card-number');
var paymentCardDate = form.querySelector('#payment__card-date');
var paymentCardCVC = form.querySelector('#payment__card-cvc');
var paymentCardholder = form.querySelector('#payment__cardholder');
var deliverStreet = form.querySelector('#deliver_street');
var deliverHouse = form.querySelector('#deliver_house');
var deliverFloor = form.querySelector('#deliver__floor');
var deliverRoom = form.querySelector('#deliver__room');

form.addEventListener('change', function (evt) {
  var target = evt.target;
  if (contactDataName === target) {
    getCustomErrors(contactDataName, MESSAGE_ERRORS['contactDataName']);
  } else if (contactDataTel === target) {
    getCustomErrors(contactDataTel, MESSAGE_ERRORS['contactDataTel']);

  } else if (selectedPaymentMethod === 'payment__card' && paymentCardNumber === target) {
    getCustomErrors(paymentCardNumber, MESSAGE_ERRORS['paymentCardNumber']);

  } else if (selectedPaymentMethod === 'payment__card' && paymentCardDate === target) {
    getCustomErrors(paymentCardDate, MESSAGE_ERRORS['paymentCardDate']);

  } else if (selectedPaymentMethod === 'payment__card' && paymentCardCVC === target) {
    getCustomErrors(paymentCardCVC, MESSAGE_ERRORS['paymentCardCVC']);

  } else if (selectedPaymentMethod === 'payment__card' && paymentCardholder === target) {
    getCustomErrors(paymentCardholder, MESSAGE_ERRORS['paymentCardholder']);

  } else if (selectedDeliverMethod === 'deliver__courier' && deliverStreet === target) {
    getCustomErrors(deliverStreet, MESSAGE_ERRORS['deliverStreet']);

  } else if (selectedDeliverMethod === 'deliver__courier' && deliverHouse === target) {
    getCustomErrors(deliverHouse, MESSAGE_ERRORS['deliverHouse']);

  } else if (selectedDeliverMethod === 'deliver__courier' && deliverFloor === target) {
    getCustomErrors(deliverFloor, MESSAGE_ERRORS['deliverFloor']);

  } else if (selectedDeliverMethod === 'deliver__courier' && deliverRoom === target) {
    getCustomErrors(deliverRoom, MESSAGE_ERRORS['deliverRoom']);
  }
}, true);

// Автодополнение символа /
function inputKeyupHandler(evt) {
  if (evt.keyCode !== 8) {
    if (paymentCardDate.value.length === 2) {
      paymentCardDate.value += '/';
    }
  }
}
paymentCardDate.addEventListener('keyup', inputKeyupHandler);
form.addEventListener('change', dataValiditySubmitHandler);
var paymentCardStatus = document.querySelector('.payment__card-status');

// Валидация формы
function dataValiditySubmitHandler() {
  if (paymentCardNumber.validity.valid &&
    checkPaymentCard(paymentCardNumber.value) &&
    paymentCardDate.validity.valid &&
    paymentCardCVC.validity.valid &&
    paymentCardholder.validity.valid) {
    paymentCardStatus.textContent = 'Одобрен';
  }
}

// Показываем товары на странице
showGoods();
