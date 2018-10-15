'use strict';

(function () {
  var modalError = document.querySelector('.modal--error');

  function keyDownHandler(evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      modalError.classList.add('modal--hidden');
      document.removeEventListener('keydown', keyDownHandler);
    }
  }

  window.modal = {
    keyDownHandler: keyDownHandler
  };

})();
