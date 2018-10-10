'use strict';

(function () {
  var CALLBACK_NAME = '__jsonpCallback'; // Callback-функция (то есть возвращает ответ от сервера)
  var DATA_URL = 'https://js.dump.academy/candyshop/data'; // URL, по которому получаем данные с сервера формате JSON
  var API_URL = 'https://js.dump.academy/candyshop'; // URL, по которму отправляем данные на сервер (API)
  var HTTP_OK_CODE = 200; // Успешный код ответа сервера
  var TIMEOUT = 10000; // Таймаут сервера, мс

  window.backend = {
    CALLBACK_NAME: CALLBACK_NAME,
    DATA_URL: DATA_URL,
    load: function (requestType, onLoad, onError, data) {
      var xhr = new XMLHttpRequest();
      xhr.responceType = 'json';

      xhr.addEventListener('load', function () {
        // Если http-ответ от сервера имеет статус 200 HTTP OK
        if (xhr.status === HTTP_OK_CODE) {
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
      xhr.timeout = TIMEOUT;

      if (requestType === 'GET') {
        // Получаем даные с помощью отправки GET-запроса на сервер
        xhr.open('GET', DATA_URL, true);
        xhr.send();
      } else if (requestType === 'POST') {
        // Отправляем даные на сервер POST-запросом
        xhr.open('POST', API_URL, true);
        xhr.send(data);
      }
    }
  };
})();
