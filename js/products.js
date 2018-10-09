'use strict';

(function () {
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

  var MIN = 0;
  var MAX = 245;
  var ELEMENT_WIDTH = 240;

  var CATALOG_GOODS = 26;

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

  window.data = {
    RATING_ARRAY: RATING_ARRAY,
    CATALOG_GOODS: CATALOG_GOODS,
    MIN: MIN,
    MAX: MAX,
    ELEMENT_WIDTH: ELEMENT_WIDTH,
    generateGoods: generateGoods
  };

})();
