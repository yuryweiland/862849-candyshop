/**
 * Created by Вайланд on 01.09.2018.
 */

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
var RATING_ARRAY = {
  1: 'stars__rating--one',
  2: 'stars__rating--two',
  3: 'stars__rating--three',
  4: 'stars__rating--four',
  5: 'stars__rating--five'
};

var CATALOG_GOODS = 26;
var BASKET_GOODS = 3;

// Находим шаблон, который будем копировать
var goodElements = document.querySelector('#card').content.querySelector('.catalog__card');
var cardElements = document.querySelector('#card-order').content.querySelector('.goods_card');

var goodsCards = document.querySelector('.goods__cards');
var goodsCardEmpty = document.querySelector('.goods__card-empty');
var catalogCards = document.querySelector('.catalog__cards');
var catalogLoad = document.querySelector('.catalog__load');

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

// Убираем у блока goods__cards класс catalog__cards--load
function removeGoodCardsLoad() {
  goodsCards.classList.remove('goods__cards--empty');
  goodsCardEmpty.classList.add('visually-hidden');
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
  starsRating.classList.add(RATING_ARRAY[good.rating.value]);

  // Рейтинг
  var starCount = goodElement.querySelector('.star__count');
  starCount.textContent = good.rating.number;

  isSugar(goodElement, good);

  return goodElement;
}

// Функция отображения товаров на странице
function showGoods(callback, catalog, length) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < length; i++) {
    fragment.appendChild(callback(generateGoods(i)));
  }

  catalog.appendChild(fragment);
}

function addElementsCard(good) {
  var cardElement = cardElements.cloneNode(true);

  var cardOrderTitle = cardElement.querySelector('.card-order__title');
  cardOrderTitle.textContent = good.name;

  var cardOrderImg = cardElement.querySelector('.card-order__img');
  cardOrderImg.src = good.picture;

  var cardOrderPrice = cardElement.querySelector('.card-order__price');
  cardOrderPrice.innerHTML = good.price + '&nbsp;₽';

  return cardElement;
}

// Показываем товары на странице
showGoods(renderGood, catalogCards, CATALOG_GOODS);
showGoods(addElementsCard, goodsCards, BASKET_GOODS);

removeCatalogCardsLoad();
removeGoodCardsLoad();
