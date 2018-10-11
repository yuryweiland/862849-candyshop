'use strict';

(function () {
  var RATING_ARRAY = [
    'stars__rating--one',
    'stars__rating--two',
    'stars__rating--three',
    'stars__rating--four',
    'stars__rating--five'
  ];

  var MIN = 0;
  var MAX = 245;
  var MIN_INDEX = 0;
  var MAX_INDEX = 1;
  var ELEMENT_WIDTH = 245;
  var CATALOG_LENGTH_GOODS = 26;

  window.utils = {
    RATING_ARRAY: RATING_ARRAY,
    CATALOG_LENGTH_GOODS: CATALOG_LENGTH_GOODS,
    MIN: MIN,
    MAX: MAX,
    ELEMENT_WIDTH: ELEMENT_WIDTH,
    MIN_INDEX: MIN_INDEX,
    MAX_INDEX: MAX_INDEX
  };

})();
