'use strict';

(function () {
  var modalError = document.querySelector('.modal--error');

  function modalKeydownHandler(evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      modalError.classList.add('modal--hidden');
      document.removeEventListener('keydown', modalKeydownHandler);
    }
  }

  window.modal = {
    keydownHandler: modalKeydownHandler
  };

})();
