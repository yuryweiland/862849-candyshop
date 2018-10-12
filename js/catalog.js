'use strict';

(function () {
  // Массив товаров
  var arrayGoods = [];

  // Массив товаров в корзине
  var basketCards = [];

  // Избранное
  var favorites = [];

  // Убираем у блока catalog__cards класс catalog__cards--load
  var catalogCards = document.querySelector('.catalog__cards');
  catalogCards.classList.remove('catalog__cards--load');

  // Добавлением класса visually-hidden блок catalog__load
  var catalogLoad = document.querySelector('.catalog__load');
  catalogLoad.parentNode.removeChild(catalogLoad);

  var loadData = document.querySelector('#load-data').content.querySelector('.catalog__load');
  catalogCards.appendChild(loadData);

  // Находим шаблон, который будем копировать
  var goodElements = document.querySelector('#card').content.querySelector('.catalog__card');

  var cardWidget = document.querySelector('.main-header__basket');

  // Обработчик при успешной загрузке товаров с сервера
  function onCatalogLoadSuccessHandler(dataCards) {
    arrayGoods = JSON.parse(dataCards);

    catalogCards.classList.remove('catalog__cards--load');
    catalogCards.removeChild(loadData);

    renderCatalog(arrayGoods);
    window.filter.updateCatalog(arrayGoods);
  }

  // Функция рендера товаров
  function renderCatalog(goods) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < goods.length; i++) {
      fragment.appendChild(renderGood(goods[i]));
    }
    catalogCards.appendChild(fragment);
  }

  // Обработчик при неудачной загрузке товаров с сервера (выкидываем модалку пользователю)
  function onCatalogLoadErrorHandler(errorMessage) {
    var modalError = document.querySelector('.modal--error');
    var modalMessage = modalError.querySelector('.modal__message');
    var modalClose = modalError.querySelector('.modal__close');

    modalError.classList.remove('modal--hidden');

    modalMessage.textContent = errorMessage;

    modalClose.addEventListener('click', function () {
      modalError.classList.add('modal--hidden');
      document.removeEventListener('keydown', window.modal.modalKeydownHandler);
    });

    document.addEventListener('keydown', window.modal.modalKeydownHandler);
  }

  window.backend.load('GET', onCatalogLoadSuccessHandler, onCatalogLoadErrorHandler);

  // Генерируем товар - создаем DOM-элементы и заполняем данными из массива
  function renderGood(good) {
    var goodElement = goodElements.cloneNode(true); // Клонируем товар
    var cardTitle = goodElement.querySelector('.card__title');
    var cardImg = goodElement.querySelector('.card__img');
    var cardPrice = goodElement.querySelector('.card__price');

    var starsRating = goodElement.querySelector('.stars__rating');
    var starCount = goodElement.querySelector('.star__count');

    var cardBtnFavorite = goodElement.querySelector('.card__btn-favorite');
    var cardBtn = goodElement.querySelector('.card__btn');

    getAmountClass(good, goodElement);

    cardTitle.textContent = good.name; // Вставим название в блок
    cardImg.src = 'img/cards/' + good.picture; // Изображение твоара
    cardPrice.innerHTML = good.price + '&nbsp;<span class="card__currency">₽</span><span class="card__weight">/ ' + good.weight + ' Г</span>';

    // Добавляем класс рейтинга в зависимоти от значения
    starsRating.classList.remove('stars__rating--five');
    starsRating.classList.add(window.utils.RATING_ARRAY[good.rating.value + 1]);

    // Рейтинг
    starCount.textContent = good.rating.number;

    isSugar(goodElement, good);

    cardBtnFavorite.addEventListener('click', clickBtnFavoriteHandler);

    cardBtn.addEventListener('click', clickAddToCardHandler);


    // Показываем и убираем класс при нажатие на кнопку "Добавить в Избранное"
    function clickBtnFavoriteHandler(evt) {
      var cardFavotireElement = evt.currentTarget;
      cardFavotireElement.classList.toggle('card__btn-favorite--selected');
      if (cardFavotireElement.classList.contains('card__btn-favorite--selected')) {
        good.favorite = true;
        favorites.push(good);
        window.filter.generateFilterCount();
      } else {
        delete good.favorite;
        favorites = [];
      }
    }

    if (good.favorite) {
      cardBtnFavorite.classList.add('card__btn-favorite--selected');
    }

    // Функция добавления товара в корзину
    function clickAddToCardHandler() {
      // Клонируем товар
      var goodCard = Object.assign({}, good);
      var sum = 0;

      goodsCards.classList.remove('goods__cards--empty');
      goodsCardEmpty.classList.add('visually-hidden');

      // Если количество больше 0, то добавляем товар в корзину
      if (good.amount > 0) {

        // Если товар уже содержится в корзине, увеличиваем количество товара
        var isContains = contains(basketCards, goodCard);
        if (isContains) {
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
        updateCardWidgetText(sum);

        // Уменьшаем на 1 кол-во товара в наличии при добавлении товара в корзину
        good.amount--;

        // При уменьшении количества генерируем показатель товара
      }
      window.filter.generateFilterCount();
      window.filter.generateFilters();

      showBasket(basketCards, goodsCards, addElementsCard);
    }

    return goodElement;
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

  // Показать товары в каталоге
  function showGoods(callback, catalog) {
    var fragment = document.createDocumentFragment();

    arrayGoods.forEach(function (good, index) {
      fragment.appendChild(callback(arrayGoods[index]));
    });

    catalog.appendChild(fragment);
  }

  showGoods(renderGood, catalogCards);

  // Добавить количество ззаказа в header
  function getCountBasket(basket) {
    var basketCountOrder = 0;
    for (var m = 0; m < basket.length; m++) {
      basketCountOrder += basket[m].orderedAmount;
    }
    return basketCountOrder;
  }

  // Добавить единицу, если товар уже лежит в корзине
  function addGoodAmount(basket, goodCard) {
    for (var m = 0; m < basket.length; m++) {
      if (basket[m].name === goodCard.name) {
        basket[m].orderedAmount++;
      }
    }
  }

  // Отобразить товар в корзине
  function showBasket(basket, catalog, callback) {
    cleanBasket();
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < basket.length; i++) {
      fragment.appendChild(callback(basket[i]));
    }
    catalog.appendChild(fragment);
  }

  // Очищаю корзину перед следующим рендерингом
  function cleanBasket() {
    while (goodsCards.firstChild) {
      goodsCards.removeChild(goodsCards.firstChild);
    }
  }

  // Очищаю товары в каталоге перед следующим рендерингом
  function cleanCatalog() {
    while (catalogCards.firstChild) {
      catalogCards.removeChild(catalogCards.firstChild);
    }
  }

  // Функция проверки - есть ли объект в массиве
  function contains(basket, goodCard) {
    for (var m = 0; m < basket.length; m++) {
      if (basket[m].name === goodCard.name) {
        return true;
      }
    }
    return false;
  }

  var cardElements = document.querySelector('#card-order').content.querySelector('.goods_card');
  var goodsCards = document.querySelector('.goods__cards');
  var goodsCardEmpty = document.querySelector('.goods__card-empty');

  // Шаблонизируем товары в корзине
  function addElementsCard(good) {
    var cardElement = cardElements.cloneNode(true);
    var cardOrderTitle = cardElement.querySelector('.card-order__title');
    cardOrderTitle.textContent = good.name;
    var cardOrderImg = cardElement.querySelector('.card-order__img');
    cardOrderImg.src = 'img/cards/' + good.picture;
    var cardOrderPrice = cardElement.querySelector('.card-order__price');
    cardOrderPrice.textContent = good.price + ' ₽';
    var cardOrderCount = cardElement.querySelector('.card-order__count');
    cardOrderCount.value = good.orderedAmount;

    var btnDecrease = cardElement.querySelector('.card-order__btn--decrease');
    var btnIncrease = cardElement.querySelector('.card-order__btn--increase');
    var sum = 0;

    btnDecrease.addEventListener('click', decreaseCardBasket);
    btnIncrease.addEventListener('click', increaseCardBasket);

    function decreaseCardBasket() {
      cardOrderCount.value = +cardOrderCount.value - 1;
      // Обновляем количество и сумму товаров в корзине
      sum = sum - (parseInt(cardOrderPrice.innerHTML, 10));
      updateCardWidgetText(sum);
    }

    function increaseCardBasket() {
      cardOrderCount.value = +cardOrderCount.value + 1;
      // Обновляем количество и сумму товаров в корзине
      sum = sum + (parseInt(cardOrderPrice.innerHTML, 10));
      updateCardWidgetText(sum);
    }

    //  Функция удаления товара в магазине
    var btnClose = cardElement.querySelector('.card-order__close');
    btnClose.addEventListener('click', btnCloseClickHandler);

    function btnCloseClickHandler() {
      deleteGood(basketCards, good, goodsCards, cardElement);
    }

    return cardElement;
  }

  // Обновление текста в виджете корзины (в шапке сайта)
  function updateCardWidgetText(sum) {
    var count = getCountBasket(basketCards);

    // Склоняем слово "товар" в блоке корзины в зависимости от количества товаров
    var wordCase = '';

    if (count === 1 && count < 10) {
      wordCase = 'товар';
    } else if (count <= 5) {
      wordCase = 'товара';
    } else if (count > 20 && count % 10 === 1) {
      wordCase = 'товар';
    } else if (count > 20 && count % 10 >= 2 && count % 10 <= 4) {
      wordCase = 'товара';
    } else {
      wordCase = 'товаров';
    }

    cardWidget.textContent = getCountBasket(basketCards) > 0 ? 'В корзине ' + count + ' ' + wordCase + ' на ' + sum + '₽' : 'В корзине ничего нет';
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

        updateCardWidgetText(sum);

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
    }
  }

  // Добавляем вызов скрипта с API в index.html
  var loader = document.createElement('script');
  loader.src = window.backend.DATA_URL + '?callback=' + window.backend.CALLBACK_NAME;
  document.body.append(loader);

  window.catalog = {
    renderCatalog: renderCatalog,
    arrayGoods: arrayGoods,
    cleanCatalog: cleanCatalog,
    catalogCards: catalogCards,
    favorites: favorites
  };

})();
