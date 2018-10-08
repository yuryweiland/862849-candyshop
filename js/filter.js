'use strict';

var filterModule = (function () {
  var rangeMin = document.querySelector('.range__btn--left');
  var rangeMax = document.querySelector('.range__btn--right');
  var priceMin = document.querySelector('.range__price--min');
  var priceMax = document.querySelector('.range__price--max');
  var sliderLine = document.querySelector('.range__filter');
  var sliderFillLine = document.querySelector('.range__fill-line');

  var min = parseInt(getComputedStyle(rangeMin).left, 10);
  var max = parseInt(getComputedStyle(rangeMax).left, 10);
  var MIN = 0;
  var MAX = 245;
  var ELEMENT_WIDTH = 240;
  var sliderLineCoords = getCoords(sliderLine);

  function rangeMaxMouseDownHandler(evt) {
    var elMaxCoords = getCoords(rangeMax);
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

    function rangeMaxMouseUpHandler() {
      document.removeEventListener('mousemove', rangeMaxMouseMoveHandler);
      document.removeEventListener('mouseup', rangeMaxMouseUpHandler);
    }

    document.addEventListener('mouseup', rangeMaxMouseUpHandler);
  }

  function rangeMinMouseDownHandler(evt) {
    var elMinCoords = getCoords(rangeMin);
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

    function rangeMinMouseUpHandler() {
      document.removeEventListener('mousemove', rangeMinMouseMoveHandler);
      document.removeEventListener('mouseup', rangeMinMouseUpHandler);
    }

    document.addEventListener('mouseup', rangeMinMouseUpHandler);
  }

  function getCoords(elem) {
    var elCoords = elem.getBoundingClientRect();
    return {
      top: elCoords.top + pageYOffset,
      left: elCoords.left + pageXOffset
    };
  }

  return {
    listenToPriceRadio: function () {
      rangeMin.addEventListener('mousedown', rangeMinMouseDownHandler);
      rangeMax.addEventListener('mousedown', rangeMaxMouseDownHandler);
    },
    onFilterChange: function () {
    }
  };
})();
var initModule = (function (options) {
  var _filterModule = options.filterModule;
  return {
    main: function () {
      var filters = 'mock data';
      _filterModule.listenToPriceRadio();
      _filterModule.onFilterChange(function () {
        window.productModule.applyFilters(filters);
      });
    }
  };
})({filterModule: filterModule});

initModule.main();
