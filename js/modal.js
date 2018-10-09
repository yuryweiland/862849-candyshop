'use strict';

(function () {
  var modalError = document.querySelector('.modal--error');

  function modalKeydownHandler(evt) {
    if (evt.keyCode === 27) {
      modalError.classList.add('modal--hidden');
      document.removeEventListener('keydown', modalKeydownHandler);
    }
  }

  window.modal = {
    modalKeydownHandler: modalKeydownHandler
  };

})();
