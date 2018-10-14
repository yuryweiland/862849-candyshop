'use strict';

(function () {
  // Массив с результатами фильтрации и сортировки
  var arrFilter;

  // Объект с сортировками
  var arrFilterSort = {
    kinds: [],
    nutritionFacts: {},
    prices: [],
    sorts: ''
  };

  // Элементы фильтров по категориям
  var catalogFilter = document.querySelector('.catalog__filter');
  var filterForIceCream = catalogFilter.querySelector('#filter-icecream');
  var filterSoda = catalogFilter.querySelector('#filter-soda');
  var filterGum = catalogFilter.querySelector('#filter-gum');
  var filterMarmalade = catalogFilter.querySelector('#filter-marmalade');
  var filterMarshmallows = catalogFilter.querySelector('#filter-marshmallows');

  // Элементы фильтров по составу
  var filterSugarFree = document.querySelector('#filter-sugar-free');
  var filterVegetarian = document.querySelector('#filter-vegetarian');
  var filterGlutenFree = document.querySelector('#filter-gluten-free');

  // Избранное
  var filterFavorite = document.querySelector('#filter-favorite');
  // В наличии
  var filterInStock = document.querySelector('#filter-availability');

  // Сортировка
  var filterPopular = document.querySelector('#filter-popular');
  var filterExpensive = document.querySelector('#filter-expensive');
  var filterCheep = document.querySelector('#filter-cheep');
  var filterRating = document.querySelector('#filter-rating');

  // Минимальная цена
  var priceMin = document.querySelector('.range__price--min');
  // Макимальная цена
  var priceMax = document.querySelector('.range__price--max');
  // Слайдер
  var sliderLine = document.querySelector('.range__filter');
  // Заполнитель
  var sliderFillLine = document.querySelector('.range__fill-line');
  // Левый ползунок
  var rangeMin = document.querySelector('.range__btn--left');
  // Правый ползунок
  var rangeMax = document.querySelector('.range__btn--right');
  var min = window.utils.MIN;
  var max = window.utils.MAX;

  // Кнопка "Показать всё"
  var showAll = document.querySelector('.catalog__submit');

  // Фильтры категорий товара
  function updateCatalog(goods) {

    arrFilter = goods.slice(0);

    generateFilterCount();
    // Добавить событие по категориям товара
    generateFilterKind(filterForIceCream);
    generateFilterKind(filterSoda);
    generateFilterKind(filterGum);
    generateFilterKind(filterMarmalade);
    generateFilterKind(filterMarshmallows);
    generateFilterNutritionFacts(filterSugarFree);
    generateFilterNutritionFacts(filterVegetarian);
    generateFilterNutritionFacts(filterGlutenFree);
    generateFilterPrice();
    generateFilterFavorites(filterFavorite);
    generateFilterInStocks(filterInStock);
    generateSort(filterPopular);
    generateSort(filterExpensive);
    generateSort(filterCheep);
    generateSort(filterRating);
    generateShowAll(showAll);
  }

  // Показать количество товара подходящими по фильтрацию
  function generateFilterCount() {
    var filterCountIceCream = document.querySelector('label[for="filter-icecream"] + .input-btn__item-count');
    var filterCountSoda = document.querySelector('label[for="filter-soda"] + .input-btn__item-count');
    var filterCountGum = document.querySelector('label[for="filter-gum"] + .input-btn__item-count');
    var filterCountMarmalade = document.querySelector('label[for="filter-marmalade"] + .input-btn__item-count');
    var filterCountMarshmallows = document.querySelector('label[for="filter-marshmallows"] + .input-btn__item-count');
    var filterCountSugarFree = document.querySelector('label[for="filter-sugar-free"] + .input-btn__item-count');
    var filterCountVegetarian = document.querySelector('label[for="filter-vegetarian"] + .input-btn__item-count');
    var filterCountGlutenFree = document.querySelector('label[for="filter-gluten-free"] + .input-btn__item-count');
    var filterCountPrice = document.querySelector('.range__price-count > .range__count');
    var filterCountFavorite = document.querySelector('label[for="filter-favorite"] + .input-btn__item-count');
    var filterCountInStock = document.querySelector('label[for="filter-availability"] + .input-btn__item-count');
    var countIceCream = 0;
    var countSoda = 0;
    var countGum = 0;
    var countMarmalade = 0;
    var countMarshmallows = 0;
    var countSugarFree = 0;
    var countVegetarian = 0;
    var countGlutenFree = 0;
    var countPrice = 0;
    var countFavorite = 0;
    var countInStock = 0;

    for (var i = 0; i < arrFilter.length; i++) {
      switch (arrFilter[i].kind) {
        case 'Мороженое':
          countIceCream += 1;
          break;
        case 'Газировка':
          countSoda += 1;
          break;
        case 'Жевательная резинка':
          countGum += 1;
          break;
        case 'Мармелад':
          countMarmalade += 1;
          break;
        case 'Зефир':
          countMarshmallows += 1;
          break;
      }

      if (!arrFilter[i].nutritionFacts.sugar) {
        countSugarFree += 1;
      }
      if (arrFilter[i].nutritionFacts.vegetarian) {
        countVegetarian += 1;
      }
      if (!arrFilter[i].nutritionFacts.gluten) {
        countGlutenFree += 1;
      }
      if (arrFilter[i].amount > 0) {
        countInStock += 1;
      }
      if (arrFilterSort.prices.length) {
        if (arrFilter[i].price >= arrFilterSort.prices[window.utils.MIN_INDEX] && arrFilter[i].price <= arrFilterSort.prices[window.utils.MAX_INDEX]) {
          countPrice += 1;
        }
      } else {
        if (arrFilter[i].price >= window.utils.MIN && arrFilter[i].price <= window.utils.MAX) {
          countPrice += 1;
        }
      }
    }

    for (var j = 0; j < window.catalog.getFavorites.length; j++) {
      countFavorite += 1;
    }

    filterCountIceCream.textContent = '(' + countIceCream + ')';
    filterCountSoda.textContent = '(' + countSoda + ')';
    filterCountGum.textContent = '(' + countGum + ')';
    filterCountMarmalade.textContent = '(' + countMarmalade + ')';
    filterCountMarshmallows.textContent = '(' + countMarshmallows + ')';
    filterCountSugarFree.textContent = '(' + countSugarFree + ')';
    filterCountVegetarian.textContent = '(' + countVegetarian + ')';
    filterCountGlutenFree.textContent = '(' + countGlutenFree + ')';
    filterCountGlutenFree.textContent = '(' + countGlutenFree + ')';
    filterCountPrice.textContent = '(' + countPrice + ')';
    filterCountFavorite.textContent = '(' + countFavorite + ')';
    filterCountInStock.textContent = '(' + countInStock + ')';
  }

  // Выводим товары по фильтрам
  function generateFilters() {
    window.catalog.getCleanCatalog();
    var arrayFilterGoods = [];
    // Один раз проходим по массиву объектов продуктов
    arrFilter.forEach(function (it) {
      var emptyFilterKinds = !arrFilterSort.kinds.length;
      var noEmptyFilterKinds = !emptyFilterKinds && arrFilterSort.kinds.indexOf(it.kind) !== -1;

      var emptyFilterFacts = !Object.keys(arrFilterSort.nutritionFacts).length;
      var noEmptyFilterFacts = !emptyFilterFacts && checkNutritionFacts(it.nutritionFacts);

      var emptyFilterPrices = !arrFilterSort.prices.length;
      var noEmptyFilterPrices = !emptyFilterPrices && (it.price >= arrFilterSort.prices[window.utils.MIN_INDEX] && it.price <= arrFilterSort.prices[window.utils.MAX_INDEX]);

      var emptyFilterSort = !arrFilterSort.sorts.length;
      var noEmptyFilterSort = !emptyFilterSort;

      if ((emptyFilterKinds || noEmptyFilterKinds) &&
        (emptyFilterFacts || noEmptyFilterFacts) &&
        (emptyFilterPrices || noEmptyFilterPrices) &&
        (emptyFilterSort || noEmptyFilterSort)) {
        arrayFilterGoods.push(it);
      }
    });
    sortElements(arrayFilterGoods);
    if (!arrayFilterGoods.length) {
      var blockEmptyFilter = document.querySelector('#empty-filters').content.querySelector('.catalog__empty-filter');
      var emptyFilter = blockEmptyFilter.cloneNode(true);
      window.catalog.getCatalogCards.appendChild(emptyFilter);
    }
    window.catalog.getRenderCatalog(arrayFilterGoods);
  }

  // Функция - показать всё
  function generateShowAll(element) {
    element.addEventListener('click', function (evt) {
      evt.preventDefault();
      window.catalog.getCleanCatalog();
      resetAllFilters();
      resetCheckbox();
      initSliderCoordinates();
      generateFilterCount();
      window.catalog.getRenderCatalog(arrFilter);
    });
  }

  // Очищаем все фильтры в объекте фильтров
  function resetAllFilters() {
    arrFilterSort.kinds = [];
    arrFilterSort.nutritionFacts = {};
    arrFilterSort.prices = [];
    arrFilterSort.sort = '';
  }

  // Убираем галочки со всех чекбоксов
  function resetCheckbox() {
    var inputCheckbox = document.querySelectorAll('.input-btn__input--checkbox');
    inputCheckbox.forEach(function (it) {
      it.checked = false;
    });
  }

  // Функция инициализации координат слайдера и установка его цены
  function initSliderCoordinates() {
    sliderFillLine.style.left = window.utils.MIN + 'px';
    sliderFillLine.style.right = window.utils.ELEMENT_WIDTH - window.utils.MAX + 'px';
    rangeMin.style.left = window.utils.MIN + 'px';
    rangeMax.style.left = window.utils.MAX + 'px';
    min = window.utils.MIN;
    max = window.utils.MAX;
    calculatePriceFilterMinMax(min, max);
  }

  function getFunctionsForFilters(element) {
    window.catalog.getCleanCatalog();
    resetAllFilters();
    resetCheckbox();
    element.checked = 'true';
    initSliderCoordinates();
    generateFilterCount();
  }

  function checkNutritionFacts(goodFact) {
    var isSugarFactActive = !arrFilterSort.nutritionFacts.sugar;
    var isVegetarianFactActive = !arrFilterSort.nutritionFacts.vegetarian;
    var isGlutenFactActive = !arrFilterSort.nutritionFacts.gluten;
    var sugarCurrentActive = isSugarFactActive && !goodFact.sugar;
    var vegetarianCurrentActive = isVegetarianFactActive && goodFact.vegetarian;
    var glutenCurrentActive = isGlutenFactActive && !goodFact.gluten;
    return (
      (!isSugarFactActive || sugarCurrentActive) &&
      (!isVegetarianFactActive || vegetarianCurrentActive) &&
      (!isGlutenFactActive || glutenCurrentActive)
    );
  }

  function generateFilterKind(element) {
    element.addEventListener('click', function (evt) {
      if (element.checked) {
        switch (evt.target.value) {
          case 'icecream':
            arrFilterSort.kinds.push('Мороженое');
            break;
          case 'soda':
            arrFilterSort.kinds.push('Газировка');
            break;
          case 'gum':
            arrFilterSort.kinds.push('Жевательная резинка');
            break;
          case 'marmalade':
            arrFilterSort.kinds.push('Мармелад');
            break;
          case 'marshmallows':
            arrFilterSort.kinds.push('Зефир');
            break;
        }
      } else {
        switch (evt.target.value) {
          case 'icecream':
            arrFilterSort.kinds.splice(arrFilterSort.kinds.indexOf('Мороженое'), 1);
            break;
          case 'soda':
            arrFilterSort.kinds.splice(arrFilterSort.kinds.indexOf('Газировка'), 1);
            break;
          case 'gum':
            arrFilterSort.kinds.splice(arrFilterSort.kinds.indexOf('Жевательная резинка'), 1);
            break;
          case 'marmalade':
            arrFilterSort.kinds.splice(arrFilterSort.kinds.indexOf('Мармелад'), 1);
            break;
          case 'marshmallows':
            arrFilterSort.kinds.splice(arrFilterSort.kinds.indexOf('Зефир'), 1);
            break;
        }
      }
      window.catalog.getCleanCatalog();
      generateFilters();
    });
  }

  function generateFilterNutritionFacts(element) {
    element.addEventListener('click', function (evt) {
      if (element.checked) {
        switch (evt.target.value) {
          case 'sugar-free':
            arrFilterSort.nutritionFacts.sugar = false;
            break;
          case 'vegetarian':
            arrFilterSort.nutritionFacts.vegetarian = true;
            break;
          case 'gluten-free':
            arrFilterSort.nutritionFacts.gluten = false;
            break;
        }
      } else {
        switch (evt.target.value) {
          case 'sugar-free':
            delete arrFilterSort.nutritionFacts.sugar;
            break;
          case 'vegetarian':
            delete arrFilterSort.nutritionFacts.vegetarian;
            break;
          case 'gluten-free':
            delete arrFilterSort.nutritionFacts.gluten;
            break;
        }
      }
      window.catalog.getCleanCatalog();
      generateFilters();
    });
  }

  function calculatePriceFilterMinMax(minValue, maxValue) {
    priceMin.textContent = parseInt(minValue, 10);
    priceMax.textContent = parseInt(maxValue, 10);
  }

  function generateFilterPrice() {
    initSliderCoordinates();

    function addFilterPrice(minPrice, maxPrice) {
      arrFilterSort.prices[window.utils.MIN_INDEX] = minPrice;
      arrFilterSort.prices[window.utils.MAX_INDEX] = maxPrice;
    }

    calculatePriceFilterMinMax(min, max);

    // Координаты слайдера
    var sliderLineCoords = getCoords(sliderLine);

    rangeMin.addEventListener('mousedown', rangeMinMouseDownHandler);
    rangeMax.addEventListener('mousedown', rangeMaxMouseDownHandler);

    function rangeMinMouseDownHandler(evt) {
      // Выведем текущее координатное значение ползунка
      var elMinCoords = getCoords(rangeMin);
      // MouseEvent.pageX - возвращает значение равное горизонтальной координате, относительно всего документа
      var shiftX = evt.pageX - elMinCoords.left;
      document.addEventListener('mousemove', rangeMinMouseMoveHandler);

      function rangeMinMouseMoveHandler(evt) {
        getLeftSliderCoords(evt, shiftX);
        priceMin.textContent = parseInt(min, 10);
      }

      document.addEventListener('mouseup', rangeMinMouseUpHandler);

      function rangeMinMouseUpHandler(evt) {
        getLeftSliderCoords(evt, shiftX);
        addFilterPrice(min, max);
        calculatePriceFilterMinMax(min, max);

        document.removeEventListener('mousemove', rangeMinMouseMoveHandler);
        document.removeEventListener('mouseup', rangeMinMouseUpHandler);

        generateFilters();
        generateFilterCount();
      }

      return false;
    }

    function getLeftSliderCoords(evt, shiftX) {
      var newLeft = evt.pageX - shiftX - sliderLineCoords.left;

      if (newLeft < window.utils.MIN) {
        newLeft = window.utils.MIN;
      }

      if (newLeft > max - rangeMin.offsetWidth / 2) {
        newLeft = max - rangeMin.offsetWidth / 2;
      }

      min = newLeft;
      rangeMin.style.left = newLeft + 'px';
      sliderFillLine.style.left = (newLeft + rangeMin.offsetWidth / 2) + 'px';
    }

    function rangeMaxMouseDownHandler(evt) {
      // Выведем текущее координатное значение ползунка
      var elMaxCoords = getCoords(rangeMax);
      // MouseEvent.pageX - возвращает значение равное горизонтальной координате, относительно всего документа
      var shiftX = evt.pageX - elMaxCoords.left;
      document.addEventListener('mousemove', rangeMaxMouseMoveHandler);

      function rangeMaxMouseMoveHandler(evt) {
        getRightSliderCoords(evt, shiftX);
        priceMax.textContent = parseInt(max, 10);
      }

      document.addEventListener('mouseup', rangeMaxMouseUpHandler);

      function rangeMaxMouseUpHandler(evt) {
        getRightSliderCoords(evt, shiftX);
        calculatePriceFilterMinMax(min, max);
        addFilterPrice(min, max);

        document.removeEventListener('mousemove', rangeMaxMouseMoveHandler);
        document.removeEventListener('mouseup', rangeMaxMouseUpHandler);

        generateFilters();
        generateFilterCount();
      }

      return false;
    }

    function getRightSliderCoords(evt, shiftX) {
      var newRight = evt.pageX - shiftX - sliderLineCoords.left;

      if (newRight > window.utils.MAX) {
        newRight = window.utils.MAX;
      }

      if (newRight < min + rangeMin.offsetWidth / 2) {
        newRight = min + rangeMin.offsetWidth / 2;
      }

      max = newRight;
      rangeMax.style.left = newRight + 'px';
      sliderFillLine.style.right = window.utils.ELEMENT_WIDTH - newRight + 'px';
    }

    function getCoords(elem) {
      var elCoords = elem.getBoundingClientRect();

      return {
        top: elCoords.top + pageYOffset,
        left: elCoords.left + pageXOffset
      };
    }
  }

  // Функция - фильтрация "Избранное"
  function generateFilterFavorites(element) {
    element.addEventListener('click', function () {
      if (element.checked) {
        getFunctionsForFilters(element);
        if (!window.catalog.getFavorites.length) {
          var blockEmptyFilter = document.querySelector('#empty-filters').content.querySelector('.catalog__empty-filter');
          var emptyFilter = blockEmptyFilter.cloneNode(true);
          window.catalog.getCatalogCards.appendChild(emptyFilter);
        } else {
          window.catalog.getRenderCatalog(window.catalog.getFavorites);
        }
      } else {
        window.catalog.getCleanCatalog();
        resetCheckbox();
        window.catalog.getRenderCatalog(arrFilter);
      }
    });
  }

  // Функция - товар в наличии
  function generateFilterInStocks(element) {
    element.addEventListener('click', function () {
      if (element.checked) {
        getFunctionsForFilters(element);
        var arrFilterInStocks = arrFilter.filter(function (it) {
          return it.amount !== 0;
        });
        window.catalog.getRenderCatalog(arrFilterInStocks);
      } else {
        window.catalog.getCleanCatalog();
        resetCheckbox();
        window.catalog.getRenderCatalog(arrFilter);
      }
    });
  }

  // Функция создания события сортировки
  function generateSort(element) {
    element.addEventListener('click', function (evt) {
      if (element.checked) {
        switch (evt.target.value) {
          case 'popular':
            arrFilterSort.sort = 'Сначала популярные';
            break;
          case 'expensive':
            arrFilterSort.sort = 'Сначала дорогие';
            break;
          case 'cheep':
            arrFilterSort.sort = 'Сначала дешёвые';
            break;
          case 'rating':
            arrFilterSort.sort = 'По рейтингу';
            break;
        }
      } else {
        arrFilterSort.sort = '';
      }
      window.catalog.getCleanCatalog();
      generateFilters();
    });
  }

  // Сортировка
  function sortElements(elements) {
    switch (arrFilterSort.sort) {
      case 'Сначала дорогие':
        elements.sort(function (first, second) {
          if (first.price < second.price) {
            return 1;
          } else if (first.price > second.price) {
            return -1;
          } else {
            return 0;
          }
        });
        break;
      case 'Сначала дешёвые':
        elements.sort(function (first, second) {
          if (first.price > second.price) {
            return 1;
          } else if (first.price < second.price) {
            return -1;
          } else {
            return 0;
          }
        });
        break;
      case 'По рейтингу':
        elements.sort(function (first, second) {
          if (first.rating.value > second.rating.value) {
            return -1;
          } else if (first.rating.value < second.rating.value) {
            return 1;
          } else if (first.rating.value === second.rating.value && first.rating.number > second.rating.number) {
            return -1;
          } else if (first.rating.value === second.rating.value && first.rating.number < second.rating.number) {
            return 1;
          }
          return 0;
        });
        break;
      case 'Сначала популярные':
        return elements;
    }
    return 0;
  }

  window.filter = {
    getUpdateCatalog: updateCatalog,
    getGenerateFilters: generateFilters,
    getGenerateFilterCount: generateFilterCount
  };

})();
