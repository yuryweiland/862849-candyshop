'use strict';

(function () {
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
      priceMin.textContent = parseInt(min, 10);

      var newLeft = e.pageX - shiftX - sliderLineCoords.left;
      if (newLeft < MIN) {
        newLeft = MIN;
      }
      if (newLeft > max - rangeMax.offsetWidth / 2) {
        newLeft = max - rangeMax.offsetWidth / 2;
      }
      min = newLeft;
      rangeMin.style.left = newLeft + 'px';
      sliderFillLine.style.left = newLeft + 'px';
    }

    // Обработчик клика на MouseUp у шкалы фильтра (для мин. значения)
    function rangeMinMouseUpHandler() {
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
      priceMax.textContent = parseInt(max, 10);

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

  rangeMin.addEventListener('mousedown', rangeMinMouseDownHandler);
  rangeMax.addEventListener('mousedown', rangeMaxMouseDownHandler);

})();
