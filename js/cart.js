'use strict';

var cartModule = (function () {
  // Товары в корзине (по-умолчанию пустой массив)
  var basketCards = [];
  var cardWidget = document.querySelector('.main-header__basket');
  var orderButton = document.querySelector('.buy__submit-btn');

  var cardBtnFavorite = goodElement.querySelector('.card__btn-favorite');
  cardBtnFavorite.addEventListener('click', clickBtnFavoriteHandler);

  var cardBtn = goodElement.querySelector('.card__btn');
  cardBtn.addEventListener('click', clickAddToCardHandler);

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

  // Добавляем/убираем css-класс при клике на "Добавить в Избранное"
  function clickBtnFavoriteHandler(evt) {
    var cardFavoriteElement = evt.currentTarget;
    cardFavoriteElement.classList.toggle('card__btn-favorite--selected');
  }

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


  // Обновление текста в виджете корзины (в шапке сайта)
  function updateCartWidgetText(sum) {
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

})();


// isEmptyHeaderBasket();
// isEmptyBasket();



