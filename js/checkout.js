'use strict';

(function () {
  var selectedPaymentMethod = 'payment__card';
  var selectedDeliverMethod = 'deliver__store';

  var paymentCard = document.querySelector('.payment__card');
  var paymentCash = document.querySelector('.payment__cash');
  var deliverStore = document.querySelector('.deliver__store');
  var deliverStoreList = document.querySelector('.deliver__store-list').querySelectorAll('input');
  var deliverStoreMap = document.querySelector('.deliver__store-map-img');
  var deliverCourier = document.querySelector('.deliver__courier');

  // Переключение вкладок в форме оформления заказа
  var payment = document.querySelector('.payment__inner');
  payment.addEventListener('click', paymentFormClickHandler);

  var deliver = document.querySelector('.deliver');
  deliver.addEventListener('click', deliverFormClickHandler);

  document.querySelector('.deliver__store-list').querySelectorAll('input').forEach(function (el) {
    el.addEventListener('change', deliverStoreChangeHandler);
  });

  // Обработчик клика по вкладкам в блоке "Оплата"
  function paymentFormClickHandler(evt) {
    var target = evt.target;
    var inputClass = target.closest('.toggle-btn__input');
    if (!inputClass) {
      return;
    }

    selectedPaymentMethod = target.getAttribute('id');

    if (selectedPaymentMethod === 'payment__card') {
      document.querySelector('.' + selectedPaymentMethod).classList.remove('visually-hidden');
      paymentCash.classList.add('visually-hidden');
      setDisabledInputs(paymentCard, false);
      setRequiredInputs(paymentCard, true);

    } else if (selectedPaymentMethod === 'payment__cash') {
      document.querySelector('.' + selectedPaymentMethod).classList.remove('visually-hidden');
      paymentCard.classList.add('visually-hidden');
      setDisabledInputs(paymentCard, true);
    }
  }

  // Обработчик клика по вкладкам в блоке "Доставка"
  function deliverFormClickHandler(evt) {
    var target = evt.target;
    var inputClass = target.closest('.toggle-btn__input');
    if (!inputClass) {
      return;
    }

    selectedDeliverMethod = target.getAttribute('id');

    if (selectedDeliverMethod === 'deliver__store') {
      document.querySelector('.' + selectedDeliverMethod).classList.remove('visually-hidden');
      deliverCourier.classList.add('visually-hidden');
      setDisabledInputs(deliverStore, false);
      setDisabledInputs(deliverCourier, true);
      setRequiredInputs(deliverStore, true);
    } else if (selectedDeliverMethod === 'deliver__courier') {
      document.querySelector('.' + selectedDeliverMethod).classList.remove('visually-hidden');
      deliverStore.classList.add('visually-hidden');
      setDisabledInputs(deliverStore, true);
      setDisabledInputs(deliverCourier, false);
      setRequiredInputs(deliverCourier, true);
    }
  }

  // Деактивируем input у скрытых полей формы
  function setDisabledInputs(el, bool) {
    var blockInputs = el.querySelectorAll('input');

    blockInputs.forEach(function (input, index) {
      blockInputs[index].disabled = bool;
    });
  }

  // Устанавливаем обязательные поля у выбранных вариантов доставки и оплаты
  function setRequiredInputs(el, bool) {
    var blockInputs = el.querySelectorAll('input');

    if (bool) {
      blockInputs.forEach(function (input, index) {
        if (blockInputs[index].id !== 'deliver__floor') {
          blockInputs[index].setAttribute('required', '');
        }
      });
    } else {
      blockInputs.forEach(function (input, index) {
        blockInputs[index].removeAttribute('required');
      });
    }
  }

  // Проверка номера банковской карты по алгоритму Луна
  function checkPaymentCard(num) {
    if (selectedPaymentMethod !== 'payment__card' || num === null && typeof num === 'undefined' && num.trim() === '') {
      return false;
    }

    // Разделяет строку на отдельные символы
    var newArrNumber = num.split('').map(function (element, index) {
      // Преобразуем каждую строку в число
      var mapElement = parseInt(element, 10);
      // Производим операцию с каждым нечётным числом - начинается с 0, значит индексы 0,2,4... - нечётные
      if (index % 2 === 0) {
        mapElement = mapElement * 2 > 9 ? (mapElement * 2) - 9 : mapElement * 2;
      }
      return mapElement;
    });
    // Суммируем каждый элемент друг с другом

    var result = newArrNumber.reduce(function (previous, current) {
      return previous + current;
    });

    // Если результат больше 10 и кратен 10 то возвращаем истину
    return !!(result >= 10 && result % 10 === 0);
  }

  function getCustomErrors(el, obj) {
    if (el.validity.tooShort) {
      el.setCustomValidity(obj.tooShort);
    } else if (el.validity.tooLong) {
      el.setCustomValidity(obj.toLong);
    } else if (el.validity.patternMismatch) {
      el.setCustomValidity(obj.patternMismatch);
    } else if (el.validity.valueMissing) {
      el.setCustomValidity(obj.valueMissing);
    } else if (el === paymentCardNumber && !checkPaymentCard(paymentCardNumber.value)) {
      el.setCustomValidity(obj.customError);
    } else {
      el.setCustomValidity('');
    }
  }

  // Обработчик событий на форме
  var form = document.querySelector('form:nth-child(2)');
  var contactDataName = form.querySelector('#contact-data__name');
  var contactDataTel = form.querySelector('#contact-data__tel');
  var paymentCardNumber = form.querySelector('#payment__card-number');
  var paymentCardDate = form.querySelector('#payment__card-date');
  var paymentCardCVC = form.querySelector('#payment__card-cvc');
  var paymentCardholder = form.querySelector('#payment__cardholder');
  var paymentCardStatus = document.querySelector('.payment__card-status');
  var deliverStreet = form.querySelector('#deliver_street');
  var deliverHouse = form.querySelector('#deliver_house');
  var deliverFloor = form.querySelector('#deliver__floor');
  var deliverRoom = form.querySelector('#deliver__room');

  form.addEventListener('change', function (evt) {
    var target = evt.target;

    switch (target) {
      case contactDataName:
        getCustomErrors(contactDataName, window.utils.MESSAGE_ERRORS['contactDataName']);
        break;
      case contactDataTel:
        getCustomErrors(contactDataTel, window.utils.MESSAGE_ERRORS['contactDataTel']);
        break;
      case paymentCardNumber:
        getCustomErrors(paymentCardNumber, window.utils.MESSAGE_ERRORS['paymentCardNumber']);
        break;
      case paymentCardDate:
        getCustomErrors(paymentCardDate, window.utils.MESSAGE_ERRORS['paymentCardDate']);
        break;
      case paymentCardCVC:
        getCustomErrors(paymentCardCVC, window.utils.MESSAGE_ERRORS['paymentCardCVC']);
        break;
      case paymentCardholder:
        getCustomErrors(paymentCardholder, window.utils.MESSAGE_ERRORS['paymentCardholder']);
        break;
      case deliverStreet:
        getCustomErrors(deliverStreet, window.utils.MESSAGE_ERRORS['deliverStreet']);
        break;
      case deliverHouse:
        getCustomErrors(deliverHouse, window.utils.MESSAGE_ERRORS['deliverHouse']);
        break;
      case deliverFloor:
        getCustomErrors(deliverFloor, window.utils.MESSAGE_ERRORS['deliverFloor']);
        break;
      case deliverRoom:
        getCustomErrors(deliverRoom, window.utils.MESSAGE_ERRORS['deliverRoom']);
        break;
      default:
        break;
    }
  }, true);

  // Автодополнение символа /
  function inputKeyupHandler(evt) {
    if (evt.keyCode !== 8) {
      if (paymentCardDate.value.length === 2) {
        paymentCardDate.value += '/';
      }
    }
  }

  paymentCardDate.addEventListener('keyup', inputKeyupHandler);
  form.addEventListener('keyup', dataValiditySubmitHandler);

  // Валидация формы
  function dataValiditySubmitHandler() {
    if (paymentCardNumber.validity.valid &&
      checkPaymentCard(paymentCardNumber.value) &&
      paymentCardDate.validity.valid &&
      paymentCardCVC.validity.valid &&
      paymentCardholder.validity.valid) {
      paymentCardStatus.textContent = 'Одобрен';
    } else {
      paymentCardStatus.textContent = 'Не определён';
    }
  }

  // меняем схему проезда (карту метро) в зависимости от выбранной станции
  function deliverStoreChangeHandler() {
    deliverStoreList.forEach(function (radio) {
      if (radio.checked) {
        deliverStoreMap.src = 'img/map/' + radio.value + '.jpg';
      }
    });
  }

  // Обработчик формы оформления заказа (при клике на "Заказать")
  function onSuccessFormHandler() {
    var modalSuccess = document.querySelector('.modal--success');
    modalSuccess.classList.remove('modal--hidden');
    var modalClose = modalSuccess.querySelector('.modal__close');
    modalClose.addEventListener('click', function () {
      modalSuccess.classList.add('modal--hidden');
    });
    document.addEventListener('keydown', successModalKeydownHandler);

    function successModalKeydownHandler() {
      modalSuccess.classList.add('modal--hidden');
      document.removeEventListener('keydown', successModalKeydownHandler);
    }
  }

  var modalError = document.querySelector('.modal--error');

  function errorFormHandler(errorMessage) {
    modalError.classList.remove('modal--hidden');
    var modalMessage = modalError.querySelector('.modal__message');
    modalMessage.textContent = errorMessage;
    var modalClose = modalError.querySelector('.modal__close');

    modalClose.addEventListener('click', function () {
      modalError.classList.add('modal--hidden');
    });

    document.addEventListener('keydown', window.modal.modalKeydownHandler);
  }

  form.addEventListener('submit', function (evt) {
    window.backend.load('POST', onSuccessFormHandler, errorFormHandler, new FormData(form));
    document.querySelectorAll('input').forEach(function (inputElement) {
      inputElement.value = inputElement.defaultValue;
    });
    evt.preventDefault();
  });

  // Выставляем input-полям неактивных способов доставк и оплаты св-во disabled
  setDisabledInputs(paymentCard, false);
  setDisabledInputs(paymentCash, true);
  setDisabledInputs(deliverStore, false);
  setDisabledInputs(deliverCourier, true);

  // Выставляем input-полям активных способов доставк и оплаты св-во required
  setRequiredInputs(paymentCard, true);
  setRequiredInputs(deliverStore, true);

})();
