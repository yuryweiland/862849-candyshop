'use strict';

(function () {
  var CALLBACK_NAME = '__jsonpCallback'; // Callback-функция (то есть возвращает ответ от сервера)
  var DATA_URL = 'https://js.dump.academy/candyshop/data'; // URL, по которому получаем данные с сервера формате JSON
  var API_URL = 'https://js.dump.academy/candyshop'; // URL, по которму отправляем данные на сервер (API)

  // Записываем в window.load функцию
  window.load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responceType = 'json';

    xhr.addEventListener('load', function () {
      // Если http-ответ от сервера имеет статус 200 HTTP OK
      if (xhr.status === 200) {
        CALLBACK_NAME = onLoad(xhr.response);
      } else {
        // Если http-ответ от сервера имеет статус, отличный от 200, сообщаем об этом ошибкой
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    // Установим таймаут ответа от сервера (макс. время ожидания ответа)
    xhr.timeout = 10000;

    // Получаем даные с помощью отправки GET-запроса на сервер
    xhr.open('GET', DATA_URL, true);
    xhr.send();
  };

  // Отправка данных на сервер
  window.sendData = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responceType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения :(');
    });

    xhr.addEventListener('timeout', function () {
      onError('Превышено время ожидания запроса от сервера ' + xhr.timeout + 'мс :(');
    });

    // Отправляем даные на сервер POST-запросом
    xhr.open('POST', API_URL, true);
    xhr.send(data);
  };

  // Сохраняем в window параметры backend (нашей API)
  window.backend = {
    CALLBACK_NAME: CALLBACK_NAME,
    DATA_URL: DATA_URL
  };
})();
