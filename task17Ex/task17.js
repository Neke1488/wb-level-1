// Необходимо реализовать простое поле ввода адреса с функцией геокодинга: 
// пользователь вводит данные в поле с помощью одного из геоинформационных сервисов (Яндекс.Карты, ДаДата, GraphHopper), подбирается адрес. 
// Найденные данные должны отображаться в выпадающем списке, из которого можно выбрать подходящее значение.

// Реализовать дебоунсинг и защиту от троттлинга с помощью замыканий.

const elemAddress = document.querySelector('#address');
const containerSlide = document.querySelector('#container');

    // Функция ymaps.ready() будет вызвана, когда загрузятся все компоненты API, а также когда будет готово DOM-дерево.
ymaps.ready(function () {


    // создаем нижний контейнер для выдачи адреса
    function createForAddress(e) {
      const downInput = document.createElement('div');
      downInput.textContent = e;
      addForAddress(downInput);
    }

  // добавляем нижний контейнер для выдачи адреса
  function addForAddress(elem) {
    containerSlide.append(elem);
  }

  // Дебоунс, чтобы не перегружать сервер
  function observer() {
    //добавляем таймер
    let timer;
    //добавляем событие на нажатие по инпуту
    elemAddress.addEventListener('click', () => {
        // обнуляем таймер
        clearTimeout(timer);
        // делаем пустое содержимое перед новым вводом
        containerSlide.innerHTML = '';
        timer = setTimeout((value) => {
          // ставим отправку данных 2 секунды
          geocode(elemAddress.value);
        }, 2000);
    });
  }

  // далее вызываем функцию
  observer();

   // объявляем функцию поиска адресов, куда передаем адрес
   function geocode(address) {
    // с помощью функции geocode из документации ymaps обрабатываются запросы геокодирования
    ymaps.geocode(address)
      .then(function(resolve) {
        // метод GeoObjects это геообъекты карты.
        // сравниваем длину коллекции с помощью getLength и если меньше хотя бы единицы, то обозначаем, что адрес не найден
        if (resolve.geoObjects.getLength() < 1) {
          createForAddress('Адрес не найден');
          return;
        }
        // метод each перебирает все элементы коллекции, вызывая для каждого функцию-обработчик.
        // нашел в документации ymaps
        resolve.geoObjects.each((item) => {
          createForAddress(item.getAddressLine());
        })
      })
  };
});