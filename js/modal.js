'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var modalError = document.querySelector('.modal--error');

  function modalKeydownHandler(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      modalError.classList.add('modal--hidden');
      document.removeEventListener('keydown', modalKeydownHandler);
    }
  }

  window.modal = {
    modalKeydownHandler: modalKeydownHandler
  };

})();
