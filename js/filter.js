'use strict';

(function () {

  // Фильтры категорий товара
  function updateCatalog(goods) {
    var catalogFilter = document.querySelector('.catalog__filter');
    var filterForIcecream = catalogFilter.querySelector('#filter-icecream');
    var filterSoda = catalogFilter.querySelector('#filter-soda');
    var filterGum = catalogFilter.querySelector('#filter-gum');
    var filterMarmalade = catalogFilter.querySelector('#filter-marmalade');
    var filterMarshmallows = catalogFilter.querySelector('#filter-marshmallows');

    var filterSugarFree = document.querySelector('#filter-sugar-free');
    var filterVegetarian = document.querySelector('#filter-vegetarian');
    var filterGlutenFree = document.querySelector('#filter-gluten-free');

    generateFilterCount(goods);
    generateFilterKind(filterForIcecream, goods, 'Мороженое');
    generateFilterKind(filterSoda, goods, 'Газировка');
    generateFilterKind(filterGum, goods, 'Жевательная резинка');
    generateFilterKind(filterMarmalade, goods, 'Мармелад');
    generateFilterKind(filterMarshmallows, goods, 'Зефир');
    generateFilterNutritionFacts(filterSugarFree, goods);
    generateFilterNutritionFacts(filterVegetarian, goods);
    generateFilterNutritionFacts(filterGlutenFree, goods);
    generateFilterPrice(goods);
  }

  function generateFilterCount(goods) {
    // Оптимизировать
    var filterCountIcecream = document.querySelector('label[for="filter-icecream"] + .input-btn__item-count');
    var filterCountSoda = document.querySelector('label[for="filter-soda"] + .input-btn__item-count');
    var filterCountGum = document.querySelector('label[for="filter-gum"] + .input-btn__item-count');
    var filterCountMarmalade = document.querySelector('label[for="filter-marmalade"] + .input-btn__item-count');
    var filterCountMarshmallows = document.querySelector('label[for="filter-marshmallows"] + .input-btn__item-count');
    var filterSugarFree = document.querySelector('label[for="filter-sugar-free"] + .input-btn__item-count');
    var filterVegetarian = document.querySelector('label[for="filter-vegetarian"] + .input-btn__item-count');
    var filterGlutenFree = document.querySelector('label[for="filter-gluten-free"] + .input-btn__item-count');
    var countIcecream = 0;
    var countSoda = 0;
    var countGum = 0;
    var countMarmalade = 0;
    var countMarshmallows = 0;
    var countSugarFree = 0;
    var countVegetarian = 0;
    var countGlutenFree = 0;

    for (var i = 0; i < goods.length; i++) {
      if (goods[i].kind === 'Мороженое') {
        countIcecream += 1;
      }
      if (goods[i].kind === 'Газировка') {
        countSoda += 1;
      }
      if (goods[i].kind === 'Жевательная резинка') {
        countGum += 1;
      }
      if (goods[i].kind === 'Мармелад') {
        countMarmalade += 1;
      }
      if (goods[i].kind === 'Зефир') {
        countMarshmallows += 1;
      }
      if (goods[i].nutritionFacts && goods[i].nutritionFacts.sugar === false) {
        countSugarFree += 1;
      }
      if (goods[i].nutritionFacts && goods[i].nutritionFacts.vegetarian === true) {
        countVegetarian += 1;
      }
      if (goods[i].nutritionFacts && goods[i].nutritionFacts.gluten === false) {
        countGlutenFree += 1;
      }
    }
    filterCountIcecream.textContent = '(' + countIcecream + ')';
    filterCountSoda.textContent = '(' + countSoda + ')';
    filterCountGum.textContent = '(' + countGum + ')';
    filterCountMarmalade.textContent = '(' + countMarmalade + ')';
    filterCountMarshmallows.textContent = '(' + countMarshmallows + ')';
    filterSugarFree.textContent = '(' + countSugarFree + ')';
    filterVegetarian.textContent = '(' + countVegetarian + ')';
    filterGlutenFree.textContent = '(' + countGlutenFree + ')';
  }

  // Массив с элементами фильтров
  var arrFilter = [];

  // Добавляем элементы фильтра в начало массива
  function setFilterArray(arr) {
    arr.forEach(function (it) {
      arrFilter.unshift(it);
    });
  }

  // Удаляем массив элементов фильтрами
  function removeFilterArray(arr) {
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arrFilter.length; j++) {
        if (arr[i].name === arrFilter[j].name) {
          arrFilter.splice(j, 1);
        }
      }
    }
  }

  // Генерируем фильтры
  function generateFilter() {
    window.catalog.cleanCatalog();
    if (arrFilter.length !== 0) {
      window.catalog.renderCatalog(arrFilter);
    } else {
      var blockEmptyFilter = document.querySelector('#empty-filters').content.querySelector('.catalog__empty-filter');
      var emptyFilter = blockEmptyFilter.cloneNode(true);
      window.catalog.catalogCards.appendChild(emptyFilter);
    }

  }

  var goodsFilter = [];

  function generateFilterKind(element, goods, filterName) {
    element.addEventListener('click', function () {
      if (element.checked) {
        goodsFilter = goods.filter(function (it) {
          return it.kind === filterName;
        });
        setFilterArray(goodsFilter);
        generateFilter(arrFilter);
      } else {
        removeFilterArray(goodsFilter);
        generateFilter(arrFilter);
      }
    });
  }

  function generateFilterNutritionFacts(element, goods) {
    element.addEventListener('click', function () {
      if (element.checked) {
        if (element.value === 'sugar-free') {
          goodsFilter = goods.filter(function (it) {
            return it.nutritionFacts.sugar === false;
          });
        } else if (element.value === 'vegetarian') {
          goodsFilter = goods.filter(function (it) {
            return it.nutritionFacts.vegetarian === true;
          });
        } else if (element.value === 'gluten-free') {
          goodsFilter = goods.filter(function (it) {
            return it.nutritionFacts.gluten === false;
          });
        }
        setFilterArray(goodsFilter);
        generateFilter(arrFilter);
      } else {
        removeFilterArray(goodsFilter);
        generateFilter(arrFilter);
      }
    });
  }

  function generateFilterPrice(goods) {
    // 4. Первая фаза работы фильтра по цене
    // Слайдер
    var sliderLine = document.querySelector('.range__filter');
    // Заполнитель
    var sliderFillLine = document.querySelector('.range__fill-line');
    // Левый ползунок
    var rangeMin = document.querySelector('.range__btn--left');
    // Правый ползунок
    var rangeMax = document.querySelector('.range__btn--right');
    // Минимальная цена
    var priceMin = document.querySelector('.range__price--min');
    // Макимальная цена
    var priceMax = document.querySelector('.range__price--max');

    var min = parseInt(arrayMin(goods), 10);
    var max = parseInt(arrayMax(goods), 10);

    function getResultMinMax(minValue, maxValue) {
      priceMin.textContent = parseInt(minValue, 10);
      priceMax.textContent = parseInt(maxValue, 10);
    }

    // Подсчёт минимального значения цены в массиве объектов
    function arrayMin(goods) {
      if (arrFilter.length !== 0) {
        return arrFilter.map(function (elem) {
          return elem.price;
        }).reduce(function (prevElement, currElement) {
          return (prevElement < currElement ? prevElement : currElement);
        });
      }
      return goods.map(function (elem) {
        return elem.price;
      }).reduce(function (prevElement, currElement) {
        return (prevElement < currElement ? prevElement : currElement);
      });
    }

    // Подсчёт максимального значения цены в массиве объектов
    function arrayMax(goods) {
      if (arrFilter.length !== 0) {
        return arrFilter.map(function (elem) {
          return elem.price;
        }).reduce(function (prevElement, currElement) {
          return (prevElement > currElement ? prevElement : currElement);
        });
      }
      return goods.map(function (elem) {
        return elem.price;
      }).reduce(function (prevElement, currElement) {
        return (prevElement > currElement ? prevElement : currElement);
      });
    }

    getResultMinMax(min, max);

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

      function rangeMinMouseMoveHandler(e) {
        getLeftSliderCoords(e, shiftX);
      }

      document.addEventListener('mouseup', rangeMinMouseUpHandler);

      function rangeMinMouseUpHandler(event) {
        getLeftSliderCoords(event, shiftX);
        getResultMinMax(min, max);

        document.removeEventListener('mousemove', rangeMinMouseMoveHandler);
        document.removeEventListener('mouseup', rangeMinMouseUpHandler);
      }

      return false;
    }

    function getLeftSliderCoords(e, shiftX) {
      var newLeft = e.pageX - shiftX - sliderLineCoords.left;

      if (newLeft < window.data.MIN) {
        newLeft = window.data.MIN;
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

      function rangeMaxMouseMoveHandler(e) {
        getRightSliderCoords(e, shiftX);
      }

      document.addEventListener('mouseup', rangeMaxMouseUpHandler);

      function rangeMaxMouseUpHandler(event) {
        getRightSliderCoords(event, shiftX);
        getResultMinMax(min, max);

        document.removeEventListener('mousemove', rangeMaxMouseMoveHandler);
        document.removeEventListener('mouseup', rangeMaxMouseUpHandler);
      }

      return false;
    }

    function getRightSliderCoords(e, shiftX) {
      var newRight = e.pageX - shiftX - sliderLineCoords.left;

      if (newRight > window.data.MAX) {
        newRight = window.data.MAX;
      }

      if (newRight < min + rangeMin.offsetWidth / 2) {
        newRight = min + rangeMin.offsetWidth / 2;
      }

      max = newRight;
      rangeMax.style.left = newRight + 'px';
      sliderFillLine.style.right = window.data.ELEMENT_WIDTH - newRight + 'px';
    }

    function getCoords(elem) {
      var elCoords = elem.getBoundingClientRect();

      return {
        top: elCoords.top + pageYOffset,
        left: elCoords.left + pageXOffset,
      };
    }
  }

  window.filter = {
    updateCatalog: updateCatalog
  };
})();
