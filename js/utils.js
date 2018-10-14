'use strict';

(function () {
  var ProductRating = {
    ONE: 'stars__rating--one',
    TWO: 'stars__rating--two',
    THREE: 'stars__rating--three',
    FOUR: 'stars__rating--four',
    FIVE: 'stars__rating--five'
  };

  var MessageErrors = {
    CONTACT_DATA_NAME: {
      tooShort: 'Имя должно состоять минимум из 2-х символов',
      tooLong: 'Имя не должно превышать 25-ти символов',
      patternMismatch: '',
      valueMissing: 'Обязательное поле'
    },
    CONTACT_DATA_TEL: {
      tooShort: 'Номер телефона должен состоять из 11 цифр',
      tooLong: 'Номер телефона должен состоять из 11 цифр',
      patternMismatch: '',
      valueMissing: 'Обязательное поле'
    },
    PAYMENT_CARD_NUMBER: {
      tooShort: 'Номер банковской карты должен состоять из 16 цифр',
      tooLong: 'Номер банковской карты должен состоять из 16 цифр',
      patternMismatch: 'Номер банковской карты не должен содержать буквы и знаки препинания',
      customError: 'Данные карты не прошли проверку подлинности',
      valueMissing: 'Обязательное поле'
    },
    PAYMENT_CARD_DATE: {
      tooShort: 'Формат даты должен состоять из 5 символов',
      tooLong: 'Формат даты должен состоять из 5 символов',
      patternMismatch: 'Формат даты должен быть мм/ГГ и состоять только из цифр',
      valueMissing: 'Обязательное поле'
    },
    PAYMENT_CARD_CVC: {
      tooShort: 'Номер CVC должен состоять из трёх цифр',
      tooLong: 'Номер CVC должен состоять из трёх цифр',
      patternMismatch: 'Поле CVC содержит только цифры (100-999)',
      valueMissing: 'Обязательное поле'
    },
    PAYMENT_CARD_HOLDER: {
      tooShort: 'Имя держателя карты должно состоять минимум из 4-х символов',
      tooLong: 'Имя держателя карты не должно превышать 50-ти символов',
      patternMismatch: 'Имя держателя карты должно быть написано латиницей',
      valueMissing: 'Обязательное поле'
    },
    DELIVER_STREET: {
      tooShort: '',
      tooLong: 'Название улицы не должно превышать 50-ти символов',
      patternMismatch: '',
      valueMissing: 'Обязательное поле'
    },
    DELIVER_HOUSE: {
      tooShort: '',
      tooLong: '',
      patternMismatch: '',
      valueMissing: 'Обязательное поле'
    },
    DELIVER_FLOOR: {
      tooShort: '',
      tooLong: 'Этаж не должен превышать 3-х символов',
      patternMismatch: 'Поле Этаж содержит только цифры',
      valueMissing: ''
    },
    DELIVER_ROOM: {
      tooShort: '',
      tooLong: '',
      patternMismatch: '',
      valueMissing: 'Обязательное поле'
    }
  };

  var MIN = 0;
  var MAX = 245;
  var MIN_INDEX = 0;
  var MAX_INDEX = 1;
  var ELEMENT_WIDTH = 245;
  var SLIDER_LINE_CONTROL_WIDTH = 10;
  var CATALOG_LENGTH_GOODS = 26;
  var GOODS_TOTAL_PRICE = 0;

  window.utils = {
    CATALOG_LENGTH_GOODS: CATALOG_LENGTH_GOODS,
    GOODS_TOTAL_PRICE: GOODS_TOTAL_PRICE,
    MIN: MIN,
    MAX: MAX,
    ELEMENT_WIDTH: ELEMENT_WIDTH,
    SLIDER_LINE_CONTROL_WIDTH: SLIDER_LINE_CONTROL_WIDTH,
    MIN_INDEX: MIN_INDEX,
    MAX_INDEX: MAX_INDEX,
    ProductRating: ProductRating,
    MessageErrors: MessageErrors
  };

})();
